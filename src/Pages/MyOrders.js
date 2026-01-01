import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../App";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { userId } = useContext(MyContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/api/orders/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch((err) => console.log("Error loading orders:", err));
  }, [userId]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📦 My Orders</h3>

      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div className="card p-3 mb-3 shadow-sm" key={order._id}>
            <h5 className="fw-bold">Order ID: {order._id}</h5>
            <p><strong>Payment:</strong> {order.paymentMethod} — {order.paymentStatus}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>

            <Link to={`/order/${order._id}`}>
              <button className="btn btn-primary btn-sm">Track Order</button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">You haven't placed any orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;
