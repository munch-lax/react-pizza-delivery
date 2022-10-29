import { useState } from "react"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { createUser } from "../actions"
const Register = (props) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        createUser({ name, email, password }, dispatch)
    }
    return (

        <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>

            <div className="ui raised segment" style={{ width: "400px" }}>
                <form class="ui form" onSubmit={onSubmit}>

                    <div class="field">
                        <label>Name</label>
                        <div class="ui input">
                            <input value={name} required onChange={(e) => setname(e.target.value)} type="text" minLength='3' />
                        </div>
                    </div>

                    <div class="field">
                        <label>Email</label>
                        <div class="ui input">
                            <input type="email" required value={email} onChange={(e) => setemail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                        </div>
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <div class="ui input">
                            <input type="password" required value={password} onChange={(e) => setpassword(e.target.value)} placeholder="min 8 characters" minLength="8" />
                        </div>
                    </div>

                    <button class="ui black button" type="submit">Submit</button>

                </form>
                <br></br>
                <Link to='/login'><h4>Already have a account ? SignIn</h4></Link>
            </div>

        </div>
    )
}

export default Register