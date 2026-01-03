import "./FunBackground.css";

const FunBackground = () => {
  return (
    <div className="fun-bg">
      {/* 🎈 Balloons */}
      {[...Array(6)].map((_, i) => (
        <span key={`b-${i}`} className={`balloon balloon-${i}`} />
      ))}

      {/* ⭐ Stars (THIS IS WHERE IT GOES) */}
      {[...Array(20)].map((_, i) => (
  <svg
    key={`s-${i}`}
    className="star"
    viewBox="0 0 24 24"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
    }}
  >
    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
  </svg>
))}


      {/* 🎀 Ribbons */}
      {[...Array(4)].map((_, i) => (
        <span key={`r-${i}`} className={`ribbon ribbon-${i}`} />
      ))}
    </div>
  );
};

export default FunBackground;
