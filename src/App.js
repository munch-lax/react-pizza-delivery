
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import NotFound from './components/Notfound';
import Pizzas from './components/Pizzas';
import Register from './components/Register';
import Seller from './components/Seller';
import Layout from './components/Layout';
import { useEffect } from 'react';
import { getOrders, getStock, getUser } from './actions';
import { useDispatch } from 'react-redux'
import CheckAuth from './components/CheckAuth';
import CheckRole from './components/CheckRole';
import { useSelector } from 'react-redux'
import CustomerOrder from './components/CustomerOrder';
import io from "socket.io-client";
import ForgotPassword from './components/ForgotPassword';
function App() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state?.comman?.user)
  const inventory = useSelector((state) => state?.comman?.inventory)
  const orders = useSelector((state) => state?.comman?.orders)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('localToken')
    const email = localStorage.getItem('localEmail')

    if (!token) {
      navigate('/login')
      return
    }



    getUser({ email }, dispatch)
    getStock(dispatch)



  }, [])

  const socket = user ? io(`http://localhost:3000/api/socket`, { query: `email=${user.email}` }) : null;
  if (socket) {
    let email = user.email
    socket.on("connection", () => {
      console.log("connected to socket")
      getOrders(email, dispatch)
    })
    socket.on("newThought", (thought) => {
      getOrders(email, dispatch)
      getStock(dispatch)
    });
  }

  return (

    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route element={<CheckAuth />}>
          <Route exact path='pizzas' element={inventory ? <Pizzas user={user} inventory={inventory} /> : <div></div>} />
          <Route exact path='orders' element={<CustomerOrder user={user} orders={orders} />} />
          <Route element={<CheckRole isSeller={user?.isSeller} />}>
            <Route path='seller' element={inventory ? <Seller inventory={inventory} /> : null} />
          </Route>
        </Route>
        <Route path='notFound' element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
