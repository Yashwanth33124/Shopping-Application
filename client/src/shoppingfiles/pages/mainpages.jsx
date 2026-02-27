import React, { useState, useEffect } from 'react'
import './mainpages.css'
import { useSelector } from 'react-redux'

import Banner from '../components/Banner'
import Collection from '../components/Collection'
import DealShowcase from '../components/DealShowcase'
import Collection2 from '../components/Collection2'
import Collection3 from '../components/Collection3'
import Collection4 from '../components/Collection4'
import AnimatedWaveFooter from '../components/footer'
import Collection5 from '../components/Collection5'
import Collection6 from '../components/Collection6'
import PrimeWelcomeNotification from '../components/PrimeWelcomeNotification'


const Mainpage = () => {
  const { isPrime, isAuthenticated, user } = useSelector((state) => state.auth);
  const [showPrimeWelcome, setShowPrimeWelcome] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Check if user is prime and hasn't seen the welcome message
    const storageKey = `hasSeenPrimeWelcome_${user.email || 'user'}`;
    const hasSeenWelcome = localStorage.getItem(storageKey);

    if (isPrime && isAuthenticated && !hasSeenWelcome) {
      // Small delay for better UX after page load
      const timer = setTimeout(() => {
        setShowPrimeWelcome(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPrime, isAuthenticated, user]);

  const handleCloseWelcome = () => {
    setShowPrimeWelcome(false);
    if (user) {
      const storageKey = `hasSeenPrimeWelcome_${user.email || 'user'}`;
      localStorage.setItem(storageKey, 'true');
    }
  };

  return (
    <div>
      <PrimeWelcomeNotification
        show={showPrimeWelcome}
        onClose={handleCloseWelcome}
      />

      <DealShowcase />
      <Collection />
      <Collection2 />
      <Collection5 />

      <Collection3 />
      <div className="main-content">
        {/* <Banner /> */}
      </div>
      <Collection6 />
      <Collection4 />

      <AnimatedWaveFooter />
    </div>
  )
}

export default Mainpage
