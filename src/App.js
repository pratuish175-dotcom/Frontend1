import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify"; // ⬅ Add this at top
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Listing from "./Pages/Listing";
import Footer from "./Components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { getSubcategories, getProducts } from "./utils/api";
import ProductModal from "./Components/ProductModal";
import EmptyCart from "./Pages/EmptyCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Pages/Checkout";
import Wishlist from "./Pages/Wishlist";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrders from "./Pages/MyOrders";
import OrderTracking from "./Pages/OrderTracking";


const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectCountry, setselectedCountry] = useState("");
  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id: "",
    open: false,
  });
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [productData, setproductdata] = useState(null);
  const [subCategoryData, setsubcategoryData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // ---------- Wishlist Methods ----------
  const addToWishlist = (product) => {
  setWishlist(prev => {
    const exists = prev.find(item => item._id === product._id);
    if (!exists) {
      const updated = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      
      toast.success("Added to Wishlist ❤️", { autoClose: 1200 }); // ✨
      return updated;
    }

    toast.info("Already in Wishlist!", { autoClose: 1200 }); // ✨
    return prev;
  });
};

const removeFromWishlist = (id) => {
  const updated = wishlist.filter(item => item._id !== id);
  setWishlist(updated);
  localStorage.setItem("wishlist", JSON.stringify(updated));

  toast.error("Removed from Wishlist ❌", { autoClose: 1200 }); // ✨
};
  // ---------- Fetch Country & Subcategories ----------
  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/").then((res) => {
      setCountryList(res.data.data);
    });

    getSubcategories("/api/subcategories").then((res) => {
      setsubcategoryData(res || []);
    });

    // ❇ Load Wishlist from storage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    // ❇ Load Login from Local Storage
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");

    if (storedLogin === "true") {
      setIsLogin(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
    }
  }, []);

  // ---------- Product Modal ----------
  useEffect(() => {
    if (isOpenProductModal.open && isOpenProductModal.id) {
      getProducts(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setproductdata(res);
      });
    }
  }, [isOpenProductModal]);

  // ---------- Cart Total Calculation ----------
  useEffect(() => {
    const total = cartData.reduce((acc, item) => acc + item.subtotal, 0);
    setCartTotal(total);
  }, [cartData]);

  const addToCart = (product) => {
    setCartData((prev) => [...prev, product]);
  };

  const values = {
    countryList,
    selectCountry,
    setselectedCountry,
    isOpenProductModal,
    setIsOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setIsLogin,
    username,
    setUsername,
    userId,
    setUserId,
    subCategoryData,
    addToCart,
    cartData,
    setCartData,
    cartTotal,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHeaderFooterShow && <Header />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cate/:id" element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/empty-cart" element={<EmptyCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/order/:id" element={<OrderTracking />} />


<Route path="/orders" element={<MyOrders />} />
        </Routes>
        
        

        {isOpenProductModal.open && productData && (
          <ProductModal
            data={productData}
            closeProductModal={() =>
              setIsOpenProductModal({ id: "", open: false })
            }
          />
        )}

        <ToastContainer />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
