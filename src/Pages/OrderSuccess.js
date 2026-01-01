import React from "react";
import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams(); // 👈 Get dynamic orderId

  return (
    <div className="text-center mt-5">
      <h2>🎉 Order Successfully Placed!</h2>
      <p>Your order has been confirmed.</p>
      
      <h5 className="mt-3">Order ID:</h5>
      <p className="fw-bold text-primary">{orderId}</p>

      <Link to="/orders">
        <button className="btn btn-success mt-3">View My Orders</button>
      </Link>

      <Link to="/">
        <button className="btn btn-primary mt-3 ml-3">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
