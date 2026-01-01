import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getProductById, getReviews, addReview, createCart, getProducts, updateReview,deleteReview } from "../../utils/api";
import Rating from "@mui/material/Rating";
import { Typography, Card, CardContent, CardActions,Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import QuantityBox from "../../Components/QuantityBox";
import Footer from "../../Components/Footer";
import RelatedProducts from "./RelatedProducts";
import { confirmAlert } from 'react-confirm-alert';
import { IoMdCart } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosGitCompare } from "react-icons/io";
import ProductZoom from "../../Components/ProductZoom";
import { MyContext } from "../../App";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import 'react-confirm-alert/src/react-confirm-alert.css';


const ProductDetails = () => {
  const { username, userId, currentUser } = useContext(MyContext);
  const context = useContext(MyContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0, name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartError, setCartError] = useState("");
  const [activeRam, setActiveRam] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeWeight, setActiveWeight] = useState(null);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [activeColor, setActiveColor] = useState(null);


  useEffect(() => {
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await getProductById(id);
      if (!data) {
        setError("Product not found");
      } else {
        setProduct(data);

        // 👇 ADD THIS LINE HERE
        console.log("🔍 Product Color Data:", data.productColor);

        const reviewsData = await getReviews(id);
        setReviews(reviewsData);


          if (userId) {
            const userHasReviewed = reviewsData.some(r => r.customerId === userId);
            setHasReviewed(userHasReviewed);
          }

          if (data.subCatId) {
            const resp = await getProducts(`/api/products?subCatId=${data.subCatId}`);
            const items = resp.products || resp;
            setRelatedProductData(items.filter((p) => p._id !== data._id));
          }
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading the product.");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchProductDetails();
  }, [id, userId]);

  const handleAddToCart = async () => {
    const localUserId = currentUser?._id || localStorage.getItem("userId");
    if (!localUserId || localUserId.length !== 24) {
      setCartError("Please login to add items to your cart.");
      return;
    }
    try {
      const cartDataToAdd = {
        productTitle: product.name,
        images: [product.images[0]],
        rating: product.rating,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
        productId: product._id,
        userId: localUserId,
        color: activeColor !== null ? product.productColor[activeColor] : null,
selectedColorHex:
  activeColor !== null && product.productColor[activeColor]
    ? product.productColor[activeColor].hexCode
    : null,

      };
      console.log('📦 Cart data being sent:', cartDataToAdd);
      await createCart(cartDataToAdd);
      console.log('✅ Successfully added to cart');

      setCartError("");
      context.setCartData(prevCart => [...prevCart, cartDataToAdd]);
    } catch (error) {
      console.error('❌ Failed to add to cart:', error);
      setCartError("Failed to add the product to your cart. Please try again.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!newReview.comment || newReview.rating === 0) {
      alert("Please add a review and rating.");
      return;
    }
  
    const reviewData = {
      productId: id,
      customerName: username || "Guest",
      customerId: userId || "guest",
      review: newReview.comment,
      customerRating: newReview.rating,
    };
  
    try {
      if (isEditing) {
        // Update review if we are editing
        const response = await updateReview(editReviewId, reviewData);
        if (response.success) {
          setReviews((prevReviews) =>
            prevReviews.map((r) =>
              r._id === editReviewId ? { ...r, ...reviewData } : r
            )
          );
          setIsEditing(false); // Reset edit mode
          setEditReviewId(null); // Clear the editReviewId
          setNewReview({ rating: 0, comment: "", name: currentUser?.name || "" }); // Reset form data
          alert("Review updated successfully!");
        } else {
          alert(response.message);
        }
      } else {
        // Submit new review
        const response = await addReview(reviewData);
        if (response.success) {
          setReviews((prevReviews) => [...prevReviews, response.review]);
          setHasReviewed(true); // Mark as reviewed
          setNewReview({ rating: 0, comment: "", name: "" });
          toast.success("Review submitted successfully!"); // Success toast notification
        } else {
          toast.error(response.message); // Error toast notification
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting your review."); // Error toast notification
    }
  };
  const handleReviewDelete = (reviewId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this review?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Call an inner async function
            (async () => {
              try {
                const response = await deleteReview(reviewId);
                if (response.success) {
                  setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
                  toast.success("Review deleted successfully!");
                } else {
                  toast.error(response.message);
                }
              } catch (error) {
                console.error("Error deleting review:", error);
                toast.error("An error occurred while deleting the review.");
              }
            })();
          }
        },
        {
          label: 'No',
          onClick: () => {} // Do nothing
        }
      ]
    });
  };
  

  const choices = (arr) => Array.isArray(arr) ? arr : JSON.parse(arr || "[]");

  if (loading) return <div className="container mt-5">Loading product...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

 // Convert data safely from backend
const rams = choices(product.productRAMS),
      sizes = choices(product.productSize),
      weights = choices(product.productWeight);

// 🎨 COLORS — SAFE PARSER
const colors = Array.isArray(product.productColor)
  ? product.productColor
  : JSON.parse(product.productColor || "[]");

  return (
    <>
      <section className="productDetails section">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <ProductZoom
                images={(product.images || []).map((img) =>
                  img.startsWith("http") ? img : `http://localhost:8080${img}`)}
                discount={product.discount > 0 ? product.discount : null}
              />
            </div>
            <div className="col-md-7">
              <h2>{product.name}</h2>
              <ul className="list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <span className="text-muted mr-2">Brand:</span> {product.brand}
                </li>
                <li className="list-inline-item ml-3">
                  <Rating value={product.rating} readOnly precision={0.5} size="small" />
                </li>
              </ul>
              <div className="d-flex align-items-center mt-2">
                {product.oldPrice && (
                  <span className="text-muted mr-2" style={{ textDecoration: "line-through" }}>
                    Rs {product.oldPrice}
                  </span>
                )}
                <span className="text-danger h5">Rs {product.price}</span>
              </div>
              <span className={`badge mt-2 ${product.countInStock > 0 ? "badge-success" : "badge-danger"}`}>
                {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
              <p className="mt-3">{product.description}</p>

              {rams.length > 0 && (
                <div className="productSize d-flex align-items-center mt-3">
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
                <div className="productSize d-flex align-items-center mt-3">
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
                <div className="productSize d-flex align-items-center mt-3">
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
              {/* 🎨 Product Colors */}
{/* Product Colors */}
{/* 🎨 Product Colors */}
{colors.length > 0 && (
  <div className="productColor d-flex align-items-center mt-3">
    <span className="mr-2">Color:</span>

    {colors.map((col, i) => (
      <button
        key={i}
        onClick={() => setActiveColor(i)}
        className={`p-2 rounded-circle border mr-2 ${
          activeColor === i ? "border-dark border-3" : "border-secondary"
        }`}
        style={{
          width: "32px",
          height: "32px",
          backgroundColor: col.hexCode,
        }}
        title={col.name}
      ></button>
    ))}
  </div>
)}






              <div className="d-flex align-items-center mt-3">
                <QuantityBox quantity={quantity} setQuantity={setQuantity} loading={false} />
                <Button className="btn-blue btn-lg btn-round ml-3" onClick={handleAddToCart}>
                  <IoMdCart /> &nbsp;Add to Cart
                </Button>
                <button className="wishlist-btn ml-2">
                  <AiOutlineHeart />
                </button>
                <button className="compare-btn ml-2">
                  <IoIosGitCompare />
                </button>
              </div>
              {cartError && <div className="text-danger mt-2">{cartError}</div>}
            </div>
          </div>

          {/* Tabs */}
          <div className="product-tabs mt-5">
            <ul className="nav nav-tabs">
              {["description", "additional", "vendor", "reviews"].map((tab) => (
                <li key={tab} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tab-content mt-3">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "additional" && (
                <ul>
                  <li>✅ Category: {product.catName}</li>
                  <li>✅ Brand: {product.brand}</li>
                  <li>✅ RAM: {rams.join(", ")}</li>
                </ul>
              )}
              {activeTab === "vendor" && (
                <div>
                  <p><strong>Vendor:</strong> Gourmet Meat Suppliers</p>
                  <p><strong>Location:</strong> Los Angeles, CA</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="reviews-container" style={{ marginTop: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  User Reviews
                </Typography>
              
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <Card
                      key={rev._id}
                      elevation={3}
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#ffffff',
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1" gutterBottom>
                          {rev.review}
                        </Typography>
                        <Rating value={rev.customerRating} readOnly precision={0.5} />
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ display: 'block', marginTop: '8px' }}
                        >
                          by {rev.customerName}
                        </Typography>
                      </CardContent>
              
                      {rev.customerId === userId && (
                        <CardActions sx={{ justifyContent: 'flex-end', paddingTop: 0 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ textTransform: 'none', mr: 1 }}
                            onClick={() => {
                              setIsEditing(true);
                              setEditReviewId(rev._id);
                              setNewReview({
                                rating: rev.customerRating,
                                comment: rev.review,
                                name: rev.customerName,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: 'none' }}
                            onClick={() => handleReviewDelete(rev._id)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    No reviews yet. Be the first to review this product!
                  </Typography>
                )}
              
                {!hasReviewed && (
                  <div className="review-form" style={{ marginTop: '2rem' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Your Name"
                          variant="outlined"
                          fullWidth
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                        />
                      </Grid>
              
                      <Grid item xs={12}>
                        <TextField
                          label="Your Review"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                        />
                      </Grid>
              
                      <Grid item xs={12}>
                        <Rating
                          value={newReview.rating}
                          onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
                          sx={{ fontSize: '1.8rem' }}
                        />
                      </Grid>
              
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleReviewSubmit}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            paddingY: 1.2,
                            fontSize: '1rem',
                            borderRadius: 2,
                          }}
                        >
                          {isEditing ? 'Update Review' : 'Submit Review'}
                        </Button>
                      </Grid>
                    </Grid>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {relatedProductData.length > 0 && (
            <RelatedProducts title="RELATED PRODUCTS" data={relatedProductData} />
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
