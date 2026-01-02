import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuantityBox from "../../Components/QuantityBox";
import { getCartItems, updateCartItem, removeFromCart } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const cartData = await getCartItems();
        setCartItems(cartData);
      } catch (error) {
        setError("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const cartTotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(cartTotal);
  }, [cartItems]);

  const handleQuantityChange = async (cartId, newQuantity, price) => {
    setUpdatingItemId(cartId);

    const updatedCartItems = cartItems.map((item) =>
      item._id === cartId
        ? { ...item, quantity: newQuantity, subtotal: newQuantity * price }
        : item
    );
    setCartItems(updatedCartItems);

    try {
      await updateCartItem(cartId, newQuantity, price);
      toast.success("Cart updated!", { autoClose: 1000 });
    } catch (error) {
      setError("Failed to update cart item");
      toast.error("Failed to update item", { autoClose: 1500 });
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await removeFromCart(cartId);
      const updatedCartItems = cartItems.filter((item) => item._id !== cartId);
      setCartItems(updatedCartItems);

      toast.info("Item removed!", { autoClose: 1000 });

      if (updatedCartItems.length === 0) {
        setTimeout(() => {
          navigate("/empty-cart");
        }, 1000);
      }
    } catch (error) {
      setError("Failed to remove cart item");
      toast.error("Failed to remove item", { autoClose: 1500 });
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems,
        total
      }
    });
  };

  if (loading) return <div className="container mt-5">Loading cart...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <section className="section py-4">
        <div className="container">
          <div className="row">
            {/* Cart Table */}
            <div className="col-md-8">
              <div className="table-responsive shadow-sm rounded">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td className="d-flex align-items-center">
                          <Link
                            to={`/product/${item.productId}`}
                            className="d-flex align-items-center text-dark"
                          >
                            <img
  src={
    item.images?.[0]?.startsWith("http")
      ? item.images[0]
      : `${baseUrl}${item.images[0]?.startsWith("/") ? "" : "/"}${item.images[0]}`
  }
  alt="Product"
  className="img-fluid rounded me-2"
  style={{
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "6px",
  }}
/>

                            <div>
                              <span className="small fw-bold">{item.productTitle}</span>
                              <div className="d-flex">
                                {[...Array(5)].map((_, index) => (
                                  <FaStar
                                    key={index}
                                    color={index < item.rating ? "#ffc107" : "#e4e5e9"}
                                    size={14}
                                  />
                                ))}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>Rs {item.price}</td>
                        <td>
                          <QuantityBox
                            quantity={item.quantity}
                            setQuantity={(newQuantity) =>
                              handleQuantityChange(item._id, newQuantity, item.price)
                            }
                            loading={updatingItemId === item._id}
                          />
                        </td>
                        <td>Rs {item.subtotal}</td>
                        <td
                          className="text-danger text-center fs-5 cursor-pointer"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          ×
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                <h5 className="mb-3">CART TOTALS</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs {total}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Estimate for</span>
                  <span>India</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
                <button
                  className="btn btn-danger w-100"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
