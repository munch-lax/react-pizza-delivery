import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../actions";
const Login = (props) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        loginUser({ email, password }, dispatch, navigate)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
            <div className="ui raised segment" style={{ width: "400px" }}>
                <form class="ui form" onSubmit={onSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <div class="ui input">
                            <input type="email" required value={email} onChange={(e) => setemail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div class="ui input">
                            <input type="password" required value={password} onChange={(e) => setpassword(e.target.value)} minlength="8" />
                        </div>
                    </div>

                    <input className="ui black button" type="submit" />
                </form>
                <br></br>
                <Link to='/register'><h4>Don't have a account ? SignUp</h4></Link>
                <br></br>
                <Link to='/forgotPassword'><h4>forgot Password</h4></Link>
            </div>

        </div>
    )
}

export default Login