export const CurvedHeader = ({ text }) => {
  return (
    <div className="pokedex-header-wrapper">
      <svg viewBox="0 0 500 150" width="100%" height="auto">
        {/* The 'd' attribute defines a Quadratic Bezier curve (M=start, Q=control point, end) */}
        <path id="headerPath" d="M50,120 Q250,20 450,120" fill="transparent" />
        <text className="curved-text-style">
          <textPath
            className="pokedex-header"
            href="#headerPath"
            startOffset="50%"
            textAnchor="middle"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
