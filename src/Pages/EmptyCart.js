// EmptyCart.jsx
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-5">
      <h3>Your cart is empty 🛒</h3>
      <p className="text-muted">Looks like you haven't added anything yet.</p>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/')}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default EmptyCart;
