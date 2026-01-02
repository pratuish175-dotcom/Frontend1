import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Rating } from "@mui/material";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

import QuantityBox from "../QuantityBox";
import ProductZoom from "../ProductZoom";
import { MyContext } from "../../App";
import { createCart } from "../../utils/api";

const ProductModal = ({ data: product, closeProductModal }) => {
  const context = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const [activeRam, setActiveRam] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeWeight, setActiveWeight] = useState(null);
  const [cartError, setCartError] = useState("");

  if (!product) return null;

  const BackendURL = process.env.REACT_APP_API_BASE_URL;

  const images = (product?.images || []).map((img) =>
    img?.startsWith("http") ? img : `${BackendURL}${img}`
  );

  const choices = (arr) => (Array.isArray(arr) ? arr : JSON.parse(arr || "[]"));
  const rams = choices(product.productRAMS);
  const sizes = choices(product.productSize);
  const weights = choices(product.productWeight);

  const handleAddToCart = async () => {
    const userId = context.userId || localStorage.getItem("userId");

    if (!userId || userId.length !== 24) {
      setCartError("Please login to add items to your cart.");
      return;
    }

    const cartData = {
      productTitle: product.name,
      images: [product.images?.[0]],
      rating: product.rating,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
      productId: product._id,
      userId,
      ram: rams[activeRam] || "",
      size: sizes[activeSize] || "",
      weight: weights[activeWeight] || "",
    };

    try {
      await createCart(cartData);

      // ✅ UPDATE HEADER CART COUNT
      context.setCartData((prev) => [...prev, cartData]);

      // ✅ SUCCESS MESSAGE
      toast.success("Item added to cart 🛒", {
        autoClose: 1200,
      });

      closeProductModal();
    } catch (err) {
      console.error(err);
      setCartError("Failed to add item to cart.");
    }
  };

  return (
    <Dialog open onClose={closeProductModal} className="productModal">
      <Button className="close_" onClick={closeProductModal}>
        <MdClose />
      </Button>

      <h4 className="mb-1 fw-bold">{product.name}</h4>

      <div className="d-flex align-items-center">
        <span className="me-3">
          Brand: <b>{product.brand}</b>
        </span>
        <Rating value={product.rating || 0} size="small" readOnly />
      </div>

      <hr />

      <div className="row productDetailModal">
        <div className="col-md-5">
          <ProductZoom images={images} discount={product.discount} />
        </div>

        <div className="col-md-7">
          <div className="d-flex align-items-center mb-3">
            {product.oldPrice && (
              <span className="oldPrice me-2">Rs {product.oldPrice}</span>
            )}
            <span className="netPrice text-danger">
              Rs {product.price}
            </span>
          </div>

          <span
            className={`badge ${
              product.countInStock > 0 ? "bg-success" : "bg-danger"
            }`}
          >
            {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </span>

          <p className="mt-3">{product.description}</p>

          {/* VARIANTS */}
          {rams.length > 0 && (
            <div className="mt-2">
              <span className="me-2">RAM:</span>
              {rams.map((ram, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    activeRam === i ? "btn-dark" : "btn-outline-secondary"
                  } me-2`}
                  onClick={() => setActiveRam(i)}
                >
                  {ram}
                </button>
              ))}
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mt-2">
              <span className="me-2">Size:</span>
              {sizes.map((sz, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    activeSize === i ? "btn-dark" : "btn-outline-secondary"
                  } me-2`}
                  onClick={() => setActiveSize(i)}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}

          {weights.length > 0 && (
            <div className="mt-2">
              <span className="me-2">Weight:</span>
              {weights.map((w, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    activeWeight === i ? "btn-dark" : "btn-outline-secondary"
                  } me-2`}
                  onClick={() => setActiveWeight(i)}
                >
                  {w}
                </button>
              ))}
            </div>
          )}

          {/* ADD TO CART */}
          <div className="d-flex align-items-center mt-4">
            <QuantityBox quantity={quantity} setQuantity={setQuantity} />
            <Button
              className="btn-blue btn-lg btn-round ms-3"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </div>

          {cartError && <div className="text-danger mt-2">{cartError}</div>}
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
