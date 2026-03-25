import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import SearchResults from "./shoppingfiles/pages/SearchResults";
import Wishlist from "./shoppingfiles/pages/Wishlist";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./shoppingfiles/Redux/CartSlice";
import CartNotification from "./shoppingfiles/components/CartNotification";

import ProtectedRoute from "./shoppingfiles/RouterArea/ProtectedRoute";
import PublicRoute from "./shoppingfiles/RouterArea/PublicRoute";

function App() {
  const { isPrime, isAuthenticated } = useSelector((state) => state.auth);
  const lastAddedItem = useSelector((state) => state.cart?.lastAddedItem || null);

  const [showSplash, setShowSplash] = useState(isAuthenticated);
  const [exitSplash, setExitSplash] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowSplash(false);
      return;
    }
    
    const exitTimer = setTimeout(() => setExitSplash(true), 2200);
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [isAuthenticated]);

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
            <Route path="/" element={
              <ProtectedRoute>
                <Mainpage />
              </ProtectedRoute>
            } />
            <Route path="/men" element={
              <ProtectedRoute>
                <Men />
              </ProtectedRoute>
            } />
            <Route path="/woman" element={
              <ProtectedRoute>
                <Woman />
              </ProtectedRoute>
            } />
            <Route path="/child" element={
              <ProtectedRoute>
                <Child />
              </ProtectedRoute>
            } />
            <Route path="/beauty" element={
              <ProtectedRoute>
                <Beauty />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path="/prime" element={
              <ProtectedRoute>
                <PrimeSubscription />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } />
            <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center' }}>404 Page Not Found</div>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;