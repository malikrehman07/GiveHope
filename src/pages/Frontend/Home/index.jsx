import React from 'react'
import Hero from './Hero'
import Companies from './Companies'
import Donate from './Donate'
import Help from './Help'
import Compaigns from './Compaigns'
import NewsLetter from './Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <Companies />
      <Compaigns />
      <Help />
      <Donate />
      <NewsLetter/>
    </>
  )
}

export default Home