import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/Auth'

const CheckoutPrivateRoute = ({Component}) => {
    const {isAuth} = useAuthContext()
    if (!isAuth) {
        return <Navigate to="/auth/login" />
    }
return <Component/>
}

export default CheckoutPrivateRoute