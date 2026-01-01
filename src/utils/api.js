import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;





// ===============================
// ✅ CATEGORY API FUNCTIONS
// ===============================

// ✅ Fetch all categories
export const getCategories = async () => {
    try {
      // Make sure BASE_URL doesn't have a trailing slash, then append '/api/categories'
      const response = await fetch(`${BASE_URL}/api/categories`);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  
      const data = await response.json();
      console.log("✅ Categories fetched:", data);
      return data || [];
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      return [];
    }
  };
  
  

// ✅ Fetch single category by ID
export const getCategoryById = async (id) => {
  try {
    console.log(`📡 Fetching category ID: ${id}`);

    const response = await fetch(`${BASE_URL}/api/categories/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    const data = await response.json();
    console.log("✅ Category fetched:", data);
    return data || null;
  } catch (error) {
    console.error("❌ Error fetching category:", error);
    return null;
  }
};

// ✅ Create a new category
export const createCategory = async (categoryData) => {
  try {
    console.log("📡 Creating category:", categoryData);

    const response = await fetch(`${BASE_URL}/api/categories/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    return await response.json();
  } catch (error) {
    console.error("❌ Error creating category:", error);
    throw error;
  }
};

// ✅ Update a category
export const updateCategory = async (id, updatedData) => {
  try {
    console.log(`📡 Updating category ${id}...`);

    const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    return await response.json();
  } catch (error) {
    console.error("❌ Error updating category:", error);
    throw error;
  }
};

// ✅ Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    console.log(`🗑️ Deleting category ID: ${categoryId}`);

    const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete category");

    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return { success: false };
  }
};
// ✅ Fetch all subcategories
export const getSubcategories = async () => {
  try {
    console.log("📡 Fetching subcategories...");

    const response = await fetch(`${BASE_URL}/api/subcategories`);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    const data = await response.json();
    console.log("✅ Subcategories fetched:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error fetching subcategories:", error);
    return [];
  }
};

// ✅ Fetch single subcategory by ID


// ✅ Create a new subcategory
export const createSubcategory = async (subcategoryData) => {
  try {
    console.log("📡 Creating subcategory:", subcategoryData);

    const response = await fetch(`${BASE_URL}/api/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subcategoryData),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    return await response.json();
  } catch (error) {
    console.error("❌ Error creating subcategory:", error);
    throw error;
  }
};

// ✅ Update a subcategory
export const getSubcategoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/subcategories/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching subcategory:", error);
    return null;
  }
};

// Update subcategory
export const updateSubcategory = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/subcategories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error updating subcategory:", error);
    throw error;
  }
};

// ✅ Delete a subcategory
export const deleteSubcategory = async (subcategoryId) => {
  try {
    console.log(`🗑️ Deleting subcategory ID: ${subcategoryId}`);

    const response = await fetch(`${BASE_URL}/api/subcategories/${subcategoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete subcategory");

    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting subcategory:", error);
    return { success: false };
  }
};

// ===============================
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ===============================
// ✅ PRODUCT API FUNCTIONS
// ===============================

// ✅ Fetch all products
export const getProducts = async (path = "/api/products") => {
  try {
    console.log("📡 Fetching:", `${BASE_URL}${path}`);

    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    const data = await response.json();
    console.log("✅ Fetched data:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return [];
  }
};
// ✅ Fetch all featured products
export const getFeaturedProducts = async () => {
  try {
    console.log("📡 Fetching featured products...");

    const response = await fetch(`${BASE_URL}/api/products/featured`);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

    const data = await response.json();
    console.log("✅ Featured products fetched:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error fetching featured products:", error);
    return [];
  }
};

// ✅ Fetch a single product by ID
export const getProductById = async (id) => {
  try {
    console.log(`📡 Full URL: ${BASE_URL}/api/products/${id}`);
    console.log(`📡 Fetching product with ID: ${id}...`);
    
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    
    if (!response.ok) {
      const errorMessage = await response.text(); // get the error text returned by the server
      console.error(`❌ Error fetching product ${id}: HTTP ${response.status} - ${errorMessage}`);
      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("✅ Product fetched:", data);

    return data || null;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error);
    return null;
  }
};



// ✅ Create a new product
export const createProduct = async (productData) => {
  try {
    console.log("📡 Creating product:", productData);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("oldPrice", productData.oldPrice);
    formData.append("category", productData.category);
    formData.append("subcategory", productData.subcategory);
    formData.append("countInStock", productData.countInStock);
    formData.append("brand", productData.brand);
    formData.append("rating", productData.rating);
    formData.append("isFeatured", productData.isFeatured);

    // ✅ Handle images properly
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await fetch(`${BASE_URL}/api/products/create`, {
      method: "POST",
      body: formData,
    });

    console.log("Response Status:", response.status);
    const responseData = await response.json(); // ✅ Log full error details
    console.log("Response Data:", responseData);

    if (!response.ok) {
      throw new Error(`Server Error: ${responseData.message || "Unknown error"}`);
    }

    return responseData;
  } catch (error) {
    console.error("❌ Error creating product:", error);
    throw error;
  }
};

// ✅ Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    console.log(`🗑️ Deleting product ID: ${productId}`);

    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Failed to delete product: ${await response.text()}`);

    console.log("✅ Product deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return { success: false };
  }
};
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/signup`, userData);
    return response.data; // Returns the response data from the server
  } catch (error) {
    console.error('Error during sign-up', error.response ? error.response.data : error);
    throw error; // Throw the error so the calling function can handle it
  }
};

// Sign in function
export const signin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/signin`, userData);
    return response.data; // Returns the response data from the server
  } catch (error) {
    console.error('Error during sign-in', error.response ? error.response.data : error);
    throw error; // Throw the error so the calling function can handle it
  }
};
// Fetch all cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cart`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    throw error;
  }
};
export const createCart = async (cartData) => {
  const res = await fetch("http://localhost:8080/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add to cart");
  }

  return res.json();
};




// Update the quantity of a cart item
export const updateCartItem = async (cartId, quantity, price) => {
  const response = await fetch(`http://localhost:8080/api/cart/update/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity, price }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }

  return await response.json();
};



// Remove an item from the cart
export const removeFromCart = async (itemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    throw error;
  }
};

export const getReviews = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reviews?productId=${productId}`);
    
    // Check if the response is 404 and handle gracefully
    if (response.status === 404) {
      throw new Error('No reviews found for this product');
    }
    
    // If we have reviews, parse the response as JSON
    const data = await response.json();
    
    // If there are no reviews in the data, handle it appropriately
    if (!data || data.length === 0) {
      console.warn('No reviews available for this product');
      return [];
    }
    
    return data; // Return the reviews
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return []; // Return empty array in case of error
  }
};


// Function to add a new review
export const addReview = async (reviewData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reviews/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      // If server responds with an error status (400/500)
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit review');
    }

    const data = await response.json();
    console.log('✅ Review submitted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error; // Re-throw to handle in UI if needed
  }
};
export const getReviewById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching review by id:', error);
    return null;
  }
};
// Update a review
export const updateReview = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/reviews/${id}`, updatedData); 
    return response.data; // returns the updated review data
  } catch (error) {
    console.error('Error updating review:', error);
    throw error; // throws the error for the caller to handle
  }
};

// Delete a review
export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/reviews/${id}`);
    if (response.status === 200) {
      console.log('Review deleted successfully', response.data);
      return response.data;
    } else {
      throw new Error('Failed to delete review');
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error(error.response ? error.response.data.error : 'Network error');
  }
};

