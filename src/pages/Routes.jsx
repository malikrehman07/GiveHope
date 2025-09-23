import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../context/Auth'
import PrivateRoute from '../components/PrivateRoute'
import DonorDashboard from './DonorDashboard'
import NgoDashboard from './NgoDashboard'
import ProtectedAuth from '../components/ProtectedAuth'

const Index = () => {
  const { user, isAuth } = useAuthContext()
  return (
    <Routes>
      <Route path='/*' element={<Frontend />} />
      <Route path="/auth/*" element={<ProtectedAuth authOnly={true}><Auth /></ProtectedAuth>} />
      <Route path='/donor/*' element={<PrivateRoute Component={DonorDashboard} role="Donor" />} />
      <Route path='/dashboard/*' element={<PrivateRoute Component={NgoDashboard} role="NGO" />} />
    </Routes>
  )
}

export default Index