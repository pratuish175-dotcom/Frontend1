import { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Rating } from '@mui/material';
import { MdClose, MdOutlineCompareArrows } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";

import QuantityBox from '../QuantityBox';
import ProductZoom from '../ProductZoom';
import { MyContext } from "../../App";
import { createCart } from "../../utils/api";

const ProductModal = ({ data: product, closeProductModal }) => {
  const { currentUser } = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const [activeRam, setActiveRam] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeWeight, setActiveWeight] = useState(null);
  const [cartError, setCartError] = useState("");

  if (!product) return null;

  const backendUrl = "http://localhost:8080";
  const images = product?.images?.map(img => img.startsWith("http") ? img : `${backendUrl}${img}`) || [];

  const choices = (arr) => Array.isArray(arr) ? arr : JSON.parse(arr || "[]");
  const rams = choices(product.productRAMS);
  const sizes = choices(product.productSize);
  const weights = choices(product.productWeight);

  const handleAddToCart = async () => {
    const userId = currentUser?._id || localStorage.getItem("userId");

    if (!userId || userId.length !== 24) {
      setCartError("Please login to add items to your cart.");
      return;
    }

    const selectedRam = rams[activeRam] || "";
    const selectedSize = sizes[activeSize] || "";
    const selectedWeight = weights[activeWeight] || "";

    const cartData = {
      productTitle: product.name,
      images: [product.images?.[0]],
      rating: product.rating,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
      productId: product._id,
      userId,
      ram: selectedRam,
      size: selectedSize,
      weight: selectedWeight,
    };

    try {
      await createCart(cartData);
      console.log("✅ Product added to cart:", cartData);
      closeProductModal();
    } catch (err) {
      console.error("❌ Failed to add to cart:", err);
      setCartError("Something went wrong while adding to cart.");
    }
  };

  return (
    <Dialog open={true} className="productModal" onClose={closeProductModal}>
      <Button className="close_" onClick={closeProductModal}>
        <MdClose />
      </Button>

      <h4 className="mb-1 font-weight-bold">{product.name}</h4>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brand:</span>
          <span className="ml-2"><b>{product.brand}</b></span>
        </div>
        <Rating name="product-rating" value={product.rating || 0} size="small" precision={0.5} readOnly />
      </div>

      <hr />

      <div className="row mt-2 productDetailModal">
        <div className="col-md-5">
          <ProductZoom images={images} discount={product.discount} />
        </div>
        <div className="col-md-7">
          <div className="d-flex info align-items-center mb-3">
            {product.oldPrice && (
              <span className="oldPrice lg mr-2">Rs {product.oldPrice}</span>
            )}
            <span className="netPrice text-danger lg">Rs {product.price}</span>
          </div>

          <span className={`badge ${product.countInStock > 0 ? "bg-success" : "bg-danger"}`}>
            {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </span>

          <p className="mt-3">{product.description || "No description available."}</p>

          {/* Variant Options */}
          {rams.length > 0 && (
            <div className="productSize d-flex align-items-center mt-2">
              <span className="mr-2">RAM:</span>
              {rams.map((ram, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${activeRam === i ? "btn-dark" : "btn-outline-secondary"} mr-2`}
                  onClick={() => setActiveRam(i)}
                >
                  {ram}
                </button>
              ))}
            </div>
          )}
          {sizes.length > 0 && (
            <div className="productSize d-flex align-items-center mt-2">
              <span className="mr-2">Size:</span>
              {sizes.map((sz, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${activeSize === i ? "btn-dark" : "btn-outline-secondary"} mr-2`}
                  onClick={() => setActiveSize(i)}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}
          {weights.length > 0 && (
            <div className="productSize d-flex align-items-center mt-2">
              <span className="mr-2">Weight:</span>
              {weights.map((w, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${activeWeight === i ? "btn-dark" : "btn-outline-secondary"} mr-2`}
                  onClick={() => setActiveWeight(i)}
                >
                  {w}
                </button>
              ))}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="d-flex align-items-center mt-3">
            <QuantityBox quantity={quantity} setQuantity={setQuantity} />
            <Button
              className="btn-blue btn-lg btn-round ml-3"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </div>
          {cartError && <div className="text-danger mt-2">{cartError}</div>}

          {/* Wishlist + Compare */}
          <div className="d-flex align-items-center mt-4 actions">
            <Button className="btn-round btn-sml" variant="outlined">
              <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
            </Button>
            <Button className="btn-round btn-sml ml-3" variant="outlined">
              <MdOutlineCompareArrows /> &nbsp; COMPARE
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
