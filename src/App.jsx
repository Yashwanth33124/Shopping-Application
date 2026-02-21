import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./shoppingfiles/components/Header";
import SplashScreen from "./shoppingfiles/components/SplashScreen";
import ScrollToTop from "./shoppingfiles/components/ScrollToTop";

import Mainpage from "./shoppingfiles/pages/mainpages";
import Men from "./shoppingfiles/RouterArea/Men";
import Woman from "./shoppingfiles/RouterArea/Woman";
import Child from "./shoppingfiles/RouterArea/child";
import Beauty from "./shoppingfiles/RouterArea/Beauty";
import Login from "./shoppingfiles/Auth/Login";
import Register from "./shoppingfiles/Auth/Register";
import ProductDetails from "./shoppingfiles/pages/ProductDetails";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [exitSplash, setExitSplash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const exitTimer = setTimeout(() => setExitSplash(true), 2200);
    const removeTimer = setTimeout(() => setShowSplash(false), 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && <SplashScreen exit={exitSplash} />}

      {!showSplash && (
        <>
          {location.pathname !== "/login" && location.pathname !== "/register" && <Header />}
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/men" element={<Men />} />
            <Route path="/woman" element={<Woman />} />
            <Route path="/child" element={<Child />} />
            <Route path="/beauty" element={<Beauty />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;