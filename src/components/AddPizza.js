import { useState } from "react"
import { useSelector } from 'react-redux'
const AddPizza = (props) => {
    const { pizza } = props

    const user = useSelector((state) => state?.comman?.user)
    const [count, setcount] = useState(user?.isSeller ? pizza.count : 0)
    const setCounter = (action) => {
        if (user?.isSeller) return
        if (action === 'sub' && count !== 0) {
            props.addToCart({ ...pizza, quantity: count - 1 })
            setcount(count - 1)
            onSubmit()
        }
        else if (action === 'add' && count < pizza.count) {
            props.addToCart({ ...pizza, quantity: count + 1 })
            setcount(count + 1)
            onSubmit()
        }
    }


    const onSubmit = () => {
        if (count === 0) return

    }
    return (
        <div className="ui segment" style={{ marginTop: '0px', marginRight: '30px', height: '200px' }} >
            <div className="content">
                <h5>{pizza.name}</h5>
                <p>{pizza.price}Rs</p>
                <div style={{ display: "flex", marginBottom: '30px' }} >
                    <div style={{ fontSize: '40px', marginRight: '10px' }} onClick={() => setCounter('sub')}>-</div>
                    <div style={{ fontSize: '40px', marginRight: '10px' }}>{count}</div>
                    <div style={{ fontSize: '40px', marginRight: '10px' }} onClick={() => setCounter('add')}>+</div>
                </div>
            </div>
        </div >
    )
}

export default AddPizza