import { FaPlus, FaMinus } from "react-icons/fa";

const QuantityBox = ({ quantity, setQuantity, loading }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="d-flex align-items-center">
      <button
        className="btn btn-sm btn-light"
        onClick={handleDecrease}
        disabled={loading}
      >
        <FaMinus />
      </button>
      <span className="mx-2">
        {loading ? (
          <div className="spinner-border spinner-border-sm" />
        ) : (
          quantity
        )}
      </span>
      <button
        className="btn btn-sm btn-light"
        onClick={handleIncrease}
        disabled={loading}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityBox;
