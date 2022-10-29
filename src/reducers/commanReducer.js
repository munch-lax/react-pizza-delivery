export const commanReducer = (state = {}, action) => {

    if (action.type === 'REGISTER') {

        return { ...state, user: action.payload }
    }
    else if (action.type === 'SETUSER') {

        return { ...state, user: action.payload }

    }
    else if (action.type === 'SETSTOCK') {

        return { ...state, inventory: action.payload }

    }
    else if (action.type === 'SETORDERS') {
        return { ...state, orders: action.payload }

    }
    else if (action.type === 'ERROR') {
        return { ...state, status: action.payload }

    }
    else {
        return state
    }
}