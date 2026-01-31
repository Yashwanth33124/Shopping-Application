import React from 'react'
import './mainpages.css'

import Header from '../components/Header'
import Banner from '../components/Banner'
import Collection from '../components/Collection'
import DealShowcase from '../components/DealShowcase'
import Collection2 from '../components/Collection2'
import Collection3 from '../components/Collection3'
import Collection4 from '../components/Collection4'
import AnimatedWaveFooter from '../components/footer'
import Collection5 from '../components/Collection5'


const Mainpage = () => {



  return (
    <div>
      <Header />

     

      <DealShowcase />
        <Collection />
      <Collection2 />
      <Collection5/>
      
      <Collection3 />
        <div className="main-content">
        <Banner />
      </div>
      <Collection4 />
      

     
      

      <AnimatedWaveFooter />
    </div>
  )
}

export default Mainpage
