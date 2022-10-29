/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import Multiselect from 'multiselect-react-dropdown';
import AddPizza from "./AddPizza";
import { createOrder, getOrders } from "../actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
const Pizzas = (props) => {
    const { inventory } = props
    let { pizzas } = inventory
    let { stock } = inventory
    const [toggle, settoggle] = useState(false)
    const [pizzasToOrder, setpizzasToOrder] = useState([])
    const [base, setbase] = useState(null)
    const [sauce, setsauce] = useState(null)
    const [cheese, setcheese] = useState(null)
    const [meat, setmeat] = useState([])
    const [veggies, setveggies] = useState([])
    const [total, settotal] = useState(0)
    const [vegtotal, setvegtotal] = useState(0)
    const [nonvegtotal, setnonvegtotal] = useState(0)
    const [error, seterror] = useState('')
    const history = useNavigate()
    const dispatch = useDispatch()



    const addToCart = (pizza) => {
        const obj = pizzasToOrder.find(item => item.name === pizza.name)
        let temp = pizzasToOrder
        if (obj) {
            temp = pizzasToOrder.filter(item => item.name !== pizza.name)

            temp = [...temp, pizza]
        }
        else {
            temp.push(pizza)
        }
        if (pizza.quantity === 0) {
            temp = pizzasToOrder.filter(item => item.name === pizza.name)

        }
        // let temp = pizzasToOrder
        let localTotal = 0
        temp.map((a) => {
            localTotal = localTotal + a.price * a.quantity
        });

        settotal(localTotal)
        setpizzasToOrder(temp)
    }

    const cardJsx = (pizza) => {
        return (
            <AddPizza addToCart={addToCart} pizza={pizza} />
        )
    }

    const addveggies = (arr) => {
        if (arr.length > 3) {
            let total = 0
            arr.slice(3).map(item => total = total + item.price)
            setvegtotal(total)
        }
        else {
            setvegtotal(0)
        }
        setveggies(arr)
        seterror(null)

    }

    const addmeat = (arr) => {
        if (arr.length > 1) {
            let total = 0
            arr.slice(1).map(item => total = total + item.price)
            setnonvegtotal(total)
        }
        else {
            setnonvegtotal(0)
        }
        setmeat(arr)
        seterror(null)

    }

    const renderCustomPizza = () => {
        return (
            <div>
                <div class="inline fields">
                    <label>select base</label>
                    <Multiselect
                        options={stock?.base}
                        displayValue="name"
                        onSelect={(e) => {
                            setbase(e)
                            seterror(null)
                        }}
                        singleSelect={true}
                    />
                </div>
                <div class="inline fields">
                    <label>select a Sauce</label>
                    <Multiselect
                        options={stock?.sauces}
                        onSelect={(e) => {
                            setsauce(e)
                            seterror(null)
                        }}
                        displayValue="name"
                        singleSelect={true}
                    />
                </div>
                <div class="inline fields">
                    <label>select Cheese</label>
                    <Multiselect
                        onSelect={(e) => {
                            seterror(null);
                            setcheese(e)
                        }}
                        options={stock?.cheese}
                        displayValue="name"
                        singleSelect={true}
                    />
                </div>

                <div class="inline fields">
                    <label>select toppings</label>
                    <Multiselect
                        onSelect={(e) => addmeat(e)}
                        onRemove={(e) => addmeat(e)}
                        options={stock?.meat}
                        displayValue="name"
                        placeholder="Upto 1 free"
                    />
                </div>
                <div class="inline fields">
                    <label>select toppings</label>
                    <Multiselect
                        onSelect={(e) => addveggies(e)}
                        onRemove={(e) => addveggies(e)}
                        options={stock?.veggies}
                        displayValue="name"
                        placeholder="Upto 3 free"
                    />
                </div>
            </div>
        )
    }
    const submitOrder = (e) => {
        let order = {
            pizzas: pizzasToOrder,
            customPizza: null,
            price: total + nonvegtotal + vegtotal,
            orderedBy: props?.user?.email
        }
        if (toggle) {
            if (!base) seterror('please select a base')
            else if (!sauce) seterror('please select a sauce')
            else if (!cheese) seterror('please select a cheese')
            else if (meat.length === 0 && veggies.length === 0) seterror('please select atleast one topping ')
            else seterror(null)

            if (error) return

            order = {
                pizzas: pizzasToOrder,
                customPizza: {
                    base,
                    sauces: sauce,
                    cheese,
                    meat,
                    veggies
                },
                price: total + nonvegtotal + vegtotal,
                orderedBy: props?.user?.email
            }
        }
        if (total === 0) {
            seterror('please select something')
            return
        }

        createOrder(order, history)
    }


    return (
        <div style={{ padding: '30px' }}>
            <div style={{ display: 'flex' }}>
                {pizzas.map(pizza => cardJsx(pizza))}
            </div>
            <div class="ui form ui segment">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 style={{ marginRight: '20px' }}>Custom Pizza {toggle}</h1>
                    <div class="ui checkbox">
                        <input type="checkbox" name="example" onClick={(e) => {
                            if (!toggle) settotal(total + stock.basePrice)
                            else settotal(total - stock.basePrice)
                            settoggle(!toggle)
                        }} />
                        <label>Make my profile visible</label>
                    </div>
                </div>
                {toggle ? renderCustomPizza() : null}

            </div>
            <h1>{error}</h1>
            <h1>{total}Rs + {vegtotal} veg toppingsRs + {nonvegtotal}veg toppingsRs</h1>
            <button className="ui button primary" type='submit' onClick={submitOrder}>Create Order</button>
        </div>
    )
}

export default Pizzas