import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";

const createOrder = async (orderData) => {
  const res = await fetch("http://localhost:8080/api/orders/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
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

  const validateForm = () => {
    let temp = {};

    if (!formData.fullName.trim()) temp.fullName = "Full Name Required";
    if (!formData.country.trim()) temp.country = "Select a Country";
    if (!formData.address.trim()) temp.address = "Address Required";
    if (!formData.city.trim()) temp.city = "City Required";
    if (!formData.state.trim()) temp.state = "State Required";
    if (!/^\d{5,6}$/.test(formData.pincode))
      temp.pincode = "Enter Valid 5-6 Digit Pincode";
    if (!/^\d{10}$/.test(formData.phone))
      temp.phone = "Enter Valid 10 Digit Phone Number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      temp.email = "Enter a Valid Email";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const loadRazorpay = () => {
    return new Promise((res) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => res(true);
      script.onerror = () => res(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async (method, status, razorpayId = "") => {
    const orderData = {
      userId,
      items: cartItems,
      totalAmount: subtotal,
      paymentMethod: method,
      paymentStatus: status,
      razorpayId,
      customer: formData,
    };

    const res = await createOrder(orderData);

    if (res.success) {
      context.setCartData([]);
      navigate(`/order-success/${res.orderId}`);
    } else {
      alert("⚠ Order failed! Try again later.");
    }
  };

  const handleOnlinePayment = async () => {
    if (!validateForm()) return;

    const loaded = await loadRazorpay();
    if (!loaded) return alert("Payment Gateway Failed to Load!");

    const rp = new window.Razorpay({
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: subtotal * 100,
      currency: "INR",
      name: "Fashion Store",
      description: "Order Payment",
      method: {
        upi: true,
        card: true,
        wallet: true,
        netbanking: true,
      },
      theme: { color: "#7C28F1" },
      handler: async (res) => {
        await placeOrder("ONLINE", "Paid", res.razorpay_payment_id);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      modal: {
        ondismiss: () => alert("Payment Cancelled"),
      },
    });

    rp.open();
  };

  const handleCOD = () => {
    if (!validateForm()) return;
    placeOrder("COD", "Pending");
  };

  return (
    <section className="section">
      <div className="container">
        <div className="row mt-3">
          {/* Billing Details */}
          <div className="col-md-8">
            <h3 className="mb-3 fw-bold">Billing Details</h3>

            {[
              { name: "fullName", label: "Full Name" },
              { name: "address", label: "House No. & Street" },
              { name: "city", label: "City" },
              { name: "state", label: "State" },
              { name: "pincode", label: "Pincode" },
              { name: "phone", label: "Phone" },
              { name: "email", label: "Email" },
            ].map(({ name, label }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                fullWidth
                size="small"
                className="mt-3"
                value={formData[name]}
                onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                error={!!errors[name]}
                helperText={errors[name]}
              />
            ))}

            <FormControl fullWidth size="small" className="mt-3">
              <InputLabel>Country</InputLabel>
              <Select
                name="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                error={!!errors.country}
              >
                {context.countryList?.map((item, i) => (
                  <MenuItem key={i} value={item.country}>
                    {item.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card p-3 shadow-lg border-0">
              <h4 className="fw-bold">Your Order</h4>

              <table className="table table-bordered mt-3 mb-0">
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productTitle}</td>
                      <td>x {item.quantity}</td>
                      <td>₹ {item.subtotal}</td>
                    </tr>
                  ))}
                  <tr className="bg-light fw-bold">
                    <td>Total</td>
                    <td colSpan="2" className="text-danger fw-semibold">
                      ₹ {subtotal}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Payment Buttons */}
              <Button
                variant="contained"
                color="primary"
                className="w-100 mt-3"
                style={{ backgroundColor: "#7C28F1" }}
                onClick={handleOnlinePayment}
              >
                Pay Online (UPI / Card)
              </Button>

              <Button
                variant="outlined"
                className="w-100 mt-3"
                color="success"
                onClick={handleCOD}
              >
                Cash On Delivery
              </Button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
