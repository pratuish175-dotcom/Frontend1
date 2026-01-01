import React, { useContext } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(MyContext);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast.error("Removed from Wishlist 💔", { autoClose: 1200 });
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    toast.success("Moved to Cart 🛒", { autoClose: 1500 });
    navigate("/cart");
  };

  return (
    <section className="section py-4 wishlist-page">
      <div className="container">
        <h3 className="mb-4 text-center wishlist-title">My Wishlist ❤️</h3>

        {wishlist.length === 0 ? (
          <div className="text-center empty-wishlist">
            <h5>No items in your wishlist</h5>
            <p className="text-muted">Start adding your favorite products!</p>
            <Link to="/">
              <Button variant="contained" color="primary" className="rounded-pill px-4">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((item) => (
              <div className="col-lg-3 col-md-4 col-6" key={item._id}>
                <div className="card product-card">
                  <Link to={`/product/${item._id}`}>
                    <div className="wishlist-img">
                      <img
                        src={`http://localhost:8080${item.images[0]}`}
                        alt={item.name}
                      />
                    </div>
                  </Link>

                  <div className="card-body text-center">
                    <h6 className="fw-bold">{item.name}</h6>

                    <Rating
                      name="read-only"
                      value={item.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />

                    <p className="text-danger fw-bold mt-2">Rs {item.price}</p>

                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        className="rounded-pill"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <IoMdCart /> &nbsp; Add
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        className="rounded-pill"
                        onClick={() => handleRemove(item._id)}
                      >
                        <IoMdClose />
                      </Button>
                    </div>
                  </div>

                  {/* heart floating animation effect */}
                  <span className="wishlist-heart">❤️</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
