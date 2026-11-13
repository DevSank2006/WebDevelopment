import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ChatWidget from "./components/layout/ChatWidget.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import PackageDetailPage from "./pages/PackageDetailPage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CartPage from "./components/home/CartPage.jsx";
import VerificationPage from "./components/home/VerifyNow.jsx"
import MyServicesPage from "./components/layout/MyServicesPage.jsx"
import MyOrderPage from "./components/layout/MyOrderPage.jsx"
import SettingsPage from "./components/layout/SettingsPage.jsx"
import EditProfilePage from "./components/layout/EditProfilePage.jsx"
import CheckoutPage from "./components/layout/CheckoutPage.jsx"
import Thankyou from "./components/layout/Thankyour.jsx"







function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-ink text-slate-100">
      <ScrollToTop />
      <Header />
      <div className="min-h-[65vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/product/:id" element={<PackageDetailPage />} />
          <Route path="/policy/:policy" element={<PolicyPage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/verify-now" element={<VerificationPage />} />
          <Route path="/dashboard/orders" element={<MyOrderPage />} />
        
          <Route path="/dashboard/services" element={<MyServicesPage />} />
           <Route path="/dashboard/settings" element={<SettingsPage />} />
           <Route path="/dashboard/profile" element={<EditProfilePage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
           <Route path="/order-placed" element={<Thankyou />} />

          

          
        </Routes>
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
}
