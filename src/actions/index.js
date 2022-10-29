

import axios from "axios"

const BASE_URL = "http://localhost:3000"
let order_Url = ''
let token = ''
const headers = {
    Authorization: 'Bearer ' + token,
}
export const createUser = async (payload, dispatch) => {
    const response = await axios.post(`${BASE_URL}/api/users/register`, payload)
    dispatch({ type: 'REGISTER', payload: response })
}

export const loginUser = async (payload, dispatch, navigate) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, payload)

    localStorage.setItem('localToken', response?.data.token)
    localStorage.setItem('localEmail', response?.data.user.email)
    token = response?.data.token

    getOrders(payload.email, dispatch)
    getStock(dispatch)
    dispatch({ type: 'SETUSER', payload: response?.data.user })
    if (response.data?.user?.isSeller) {
        navigate('/orders')
    }
    else {
        navigate('/pizzas')
    }
}

export const forgotPassword = async (email) => {
    const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`,
        { email })

}
export const getUser = async (payload, dispatch) => {
    const response = await axios.get(`${BASE_URL}/api/users/${payload.email}`, { headers: getHeaders() })
    if (response.data?.isSeller) {
        order_Url = `${BASE_URL}/api/order/allOrders`
    }
    else {
        order_Url = `${BASE_URL}/api/order/allOrders/${response.data?.email}`
    }
    getOrders(payload.email, dispatch)

    dispatch({ type: 'SETUSER', payload: response?.data })
}


export const getStock = async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/api/inventory/`, { headers: getHeaders() })

    dispatch({ type: 'SETSTOCK', payload: response?.data })
}

export const createOrder = async (payload, history) => {
    const response = await axios.post(`${BASE_URL}/api/order/createOrder`, payload, { headers: getHeaders() })
    if (response.data) { history("/orders") }
}

export const getOrders = async (email, dispatch) => {
    const response = await axios.get(order_Url, { headers: getHeaders() })
    dispatch({ type: 'SETORDERS', payload: response?.data })
}

export const changeStatus = async (payload, history) => {
    const response = await axios.post(`${BASE_URL}/api/order/status`,
        { status: payload.status, orderId: payload.orderId }, { headers: getHeaders() })

}
const getHeaders = () => {
    let token = localStorage.getItem('localToken')
    return {
        'Content-Type': 'application/json',
        'X-auth-token': token,
    }
}