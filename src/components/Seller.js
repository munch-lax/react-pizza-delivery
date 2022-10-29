import { useSelector } from 'react-redux'
import AddPizza from './AddPizza'
const Seller = (props) => {
    const inventory = props.inventory
    let { pizzas } = inventory
    let { stock } = inventory
    return (
        <div style={{ padding: '30px' }}>
            <div style={{ display: 'flex' }}>
                {pizzas.map(pizza => <AddPizza pizza={pizza} />)}
            </div>
            <div className='ui segment' style={{ display: 'flex' }} >
                {Object.keys(stock).map(key => {
                    let arr = []
                    arr = Object.values(stock[key])
                    return (<div>{(arr?.map(pizza => <div><AddPizza pizza={pizza} /></div>))}</div>)
                })}
            </div>
        </div>
    )
}

export default Seller