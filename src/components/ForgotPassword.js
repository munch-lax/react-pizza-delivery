//import { Outlet } from "react-router-dom"

import { useState } from "react"
import { useDispatch } from 'react-redux'
import { forgotPassword } from "../actions"
const ForgotPassword = (props) => {
    const [email, setemail] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        forgotPassword(email)
    }
    return (<div className="App" style={{ padding: '30px' }}>
        <h1>Enter email</h1>
        <input className="ui input" type="email" required value={email} onChange={(e) => setemail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
        <button className="ui button primary" onClick={onSubmit}>Submit</button>
    </div>)
}

export default ForgotPassword