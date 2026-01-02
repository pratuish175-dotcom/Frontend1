import "./FunBackground.css";

const FunBackground = () => {
  return (
    <div className="fun-bg">
      {/* Balloons (reduced count for mobile) */}
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`balloon balloon-${i}`} />
      ))}

      {/* Subtle stars */}
      <div className="stars" />
    </div>
  );
};

export default FunBackground;
