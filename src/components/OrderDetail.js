import Multiselect from "multiselect-react-dropdown"
import { useState } from "react"
import { changeOrderStatus, changeStatus } from "../actions"
import { useSelector } from 'react-redux'
const OrderDetail = (props) => {
    const order = props.order
    const customPizza = order.customPizza ? order.customPizza : null
    const options = ['confirmed', 'rejected', 'In kitchen', 'Completed']
    const user = useSelector((state) => state?.comman?.user)


    const changeOrderStatus = (e) => {
        console.log(order._id)
        changeStatus({ orderId: order._id, status: e[0] })
    }
    const returnSelectJsx = () => {
        if (user.isSeller) {
            return (
                <span><Multiselect
                    isObject={false}
                    singleSelect={true}
                    onSelect={(e) => changeOrderStatus(e)}
                    options={options}
                    placeholder="Status"
                /></span>
            )
        }
        else {
            return (order?.status)
        }
    }
    return <div className="ui segment">
        {order.pizzas?.map(pizza => {
            return (
                <div className="ui segment">
                    <h3>{pizza?.quantity}x{pizza?.name}</h3>

                </div>
            )
        })}
        {customPizza ? Object.keys(customPizza).map(key => {
            customPizza[key].map(item => {
                return (<h5>{item.name}</h5>)
            })
        }) : null}
        <h3>Total--{order.price}Rs</h3>
        <h3>Status--  {returnSelectJsx()}</h3>
    </div>
}

export default OrderDetail

