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
import Cart from "./shoppingfiles/pages/Cart";
import Account from "./shoppingfiles/pages/Account";
import PrimeSubscription from "./shoppingfiles/pages/PrimeSubscription";
import Checkout from "./shoppingfiles/pages/Checkout";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./shoppingfiles/Redux/CartSlice";
import CartNotification from "./shoppingfiles/components/CartNotification";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [exitSplash, setExitSplash] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  // Defensive selector
  const { isPrime } = useSelector((state) => state.auth);
  const lastAddedItem = useSelector((state) => state.cart?.lastAddedItem || null);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExitSplash(true), 2200);
    const removeTimer = setTimeout(() => setShowSplash(false), 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Debugging log (optional, but helps if we could see it)
  // console.log("Rendering App, path:", location.pathname);

  return (
    <div className="app-main-wrapper" style={{ minHeight: '100vh', background: '#fff' }}>
      {showSplash && <SplashScreen exit={exitSplash} />}

      {!showSplash && (
        <>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "/prime" &&
            location.pathname !== "/checkout" &&
            <Header />}

          {lastAddedItem && (
            <CartNotification
              show={!!lastAddedItem}
              product={lastAddedItem}
              onClose={() => dispatch(cartActions.clearLastAddedItem())}
            />
          )}

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/prime" element={<PrimeSubscription />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center' }}>404 Page Not Found</div>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;