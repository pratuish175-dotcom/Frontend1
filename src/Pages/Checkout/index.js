import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import { MyContext } from "../../App";

// API to save order
const createOrder = async (orderData) => {
  const response = await fetch("http://localhost:8080/api/orders/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const context = useContext(MyContext);

  const cartItems = state?.cartItems || [];
  const subtotal = state?.total || 0;
  const userId = context.userId || localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validation
  const validateForm = () => {
    let temp = {};

    if (!formData.fullName) temp.fullName = "Full Name required";
    if (!formData.country) temp.country = "Select Country";
    if (!formData.address) temp.address = "Address required";
    if (!formData.city) temp.city = "City required";
    if (!formData.state) temp.state = "State required";
    if (!/^\d{5,6}$/.test(formData.pincode)) temp.pincode = "Valid Pincode required";
    if (!/^\d{10}$/.test(formData.phone)) temp.phone = "Valid Phone required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      temp.email = "Valid Email required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // Load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🛒 Save Order to DB
  const saveOrder = async (paymentMethod, paymentStatus, razorpayId = "") => {
    const orderData = {
      userId,
      items: cartItems,
      totalAmount: subtotal,
      paymentMethod,
      paymentStatus,
      razorpayId,
    };

    await createOrder(orderData);
    context.setCartData([]); // Empty cart after order
    navigate("/"); // Redirect to home later can build success page
  };

  // 🔥 Razorpay Payment
  const handlePayment = async () => {
    if (!validateForm()) return;

    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) return alert("Razorpay failed to load");

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Enter your Razorpay Key
      amount: subtotal * 100,
      currency: "INR",
      name: "Fashion Store",
      description: "Order Payment",
      theme: { color: "#4A148C" },
      method: { upi: true, card: true, wallet: true, netbanking: true },

      handler: async function (response) {
        alert("Payment Successful!");
        await saveOrder("ONLINE", "Paid", response.razorpay_payment_id);
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🆕 COD Order
  const handleCOD = async () => {
    if (!validateForm()) return;

    alert("Order Placed (Cash On Delivery)");
    await saveOrder("COD", "Pending", "");
  };

  return (
    <section className="section">
      <div className="container">
        <div className="row mt-3">

          {/* Billing Form */}
          <div className="col-md-8">
            <h2>BILLING DETAILS</h2>

            <TextField label="Full Name" name="fullName" fullWidth size="small"
              className="mt-3" value={formData.fullName} onChange={handleChange}
              error={!!errors.fullName} helperText={errors.fullName} />

            <FormControl fullWidth size="small" className="mt-3" error={!!errors.country}>
              <InputLabel>Country</InputLabel>
              <Select name="country" value={formData.country} onChange={handleChange}>
                {context.countryList?.map((item, i) => (
                  <MenuItem key={i} value={item.country}>{item.country}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Address" name="address" fullWidth size="small"
              className="mt-3" value={formData.address} onChange={handleChange}
              error={!!errors.address} helperText={errors.address} />

            <div className="row">
              <div className="col-md-6">
                <TextField label="City" name="city" fullWidth size="small"
                  className="mt-3" value={formData.city} onChange={handleChange}
                  error={!!errors.city} helperText={errors.city} />
              </div>
              <div className="col-md-6">
                <TextField label="State" name="state" fullWidth size="small"
                  className="mt-3" value={formData.state} onChange={handleChange}
                  error={!!errors.state} helperText={errors.state} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TextField label="Pin Code" name="pincode" fullWidth size="small"
                  className="mt-3" value={formData.pincode} onChange={handleChange}
                  error={!!errors.pincode} helperText={errors.pincode} />
              </div>
              <div className="col-md-6">
                <TextField label="Phone" name="phone" fullWidth size="small"
                  className="mt-3" value={formData.phone} onChange={handleChange}
                  error={!!errors.phone} helperText={errors.phone} />
              </div>
            </div>

            <TextField label="Email" name="email" fullWidth size="small"
              className="mt-3" value={formData.email} onChange={handleChange}
              error={!!errors.email} helperText={errors.email} />
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h4>Your Order</h4>

              <table className="table table-bordered mt-3">
                <tbody>
  {cartItems.map((item) => (
    <tr key={item._id}>
      <td className="d-flex align-items-center">
        <img
          src={
            item.images?.[0]?.startsWith("http")
              ? item.images[0]
              : `http://localhost:8080${item.images[0]}`
          }
          alt="Product"
          style={{
            width: "55px",
            height: "55px",
            objectFit: "cover",
            borderRadius: "6px",
            marginRight: "8px"
          }}
        />
        <span className="small fw-bold">{item.productTitle}</span>
      </td>
      <td>x {item.quantity}</td>
      <td className="fw-bold">₹ {item.subtotal}</td>
    </tr>
  ))}

  <tr className="fw-bold bg-light">
    <td>Total</td>
    <td colSpan="2" className="text-danger">₹ {subtotal}</td>
  </tr>
</tbody>

              </table>

              <Button variant="contained" color="primary"
                className="w-100 mt-3" onClick={handlePayment}>
                Pay Securely (UPI / Card)
              </Button>

              <Button variant="outlined" color="success"
                className="w-100 mt-3" onClick={handleCOD}>
                Cash On Delivery (COD)
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
