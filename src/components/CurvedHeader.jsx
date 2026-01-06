export const CurvedHeader = ({ text }) => {
  return (
    <div className="pokedex-header-container">
      {/* width="100%" tells the SVG to fill the 40vw container */}
      <svg
        viewBox="0 0 1200 350"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="headerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="48%" stopColor="#ff0000" />
            <stop offset="50%" stopColor="#333333" />
            <stop offset="52%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        <path
          id="textPathArc"
          d="M100,280 Q600,120 1100,280"
          fill="transparent"
        />

        <text className="pokedex-curved-text">
          <textPath
            href="#textPathArc"
            startOffset="50%"
            textAnchor="middle"
            fill="url(#headerGradient)"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
