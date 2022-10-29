import OrderDetail from "./OrderDetail"

const CustomerOrder = (props) => {
    console.log(props.orders)
    return (<div className="App" style={{ padding: '50px' }}>
        <h1>Orders</h1>
        {props?.orders?.map(order => <OrderDetail user={props.user} order={order} />)}
    </div>)
}

export default CustomerOrder