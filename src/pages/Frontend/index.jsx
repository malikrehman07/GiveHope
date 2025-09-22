import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import NoPage from '../Misc/NoPage'
import About from './About'
import Contact from './Contact'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AllCompaigns from './AllCompaigns'
import CompaignPage from './CompaignPage'
import Checkout from './Checkout'
import ThankYou from './ThankYou'
import CheckoutPrivateRoute from '../../components/CheckoutPrivateRoute'

const Frontend = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/compaigns' element={<AllCompaigns />} />
                    <Route path='/compaign/:id' element={<CompaignPage />} />
                    <Route path='/checkout' element={<CheckoutPrivateRoute Component={Checkout} />} />
                    <Route path='/thank-you' element={<ThankYou />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default Frontend