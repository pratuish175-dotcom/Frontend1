import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const steps = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrder(data.order);
      })
      .catch((err) => console.log("Error fetching order:", err));
  }, [id]);

  if (!order) return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <Link to="/orders" className="btn btn-secondary mb-3">⬅ Back to My Orders</Link>

      <h3 className="fw-bold">Track Order</h3>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>

      <div className="tracking-steps mt-4">
        {steps.map((step, index) => {
          const isCompleted = steps.indexOf(order.status) >= index;

          return (
            <div key={index} className={`tracking-step ${isCompleted ? "active" : ""}`}>
              <span className="circle">{index + 1}</span>
              <p className="label">{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
