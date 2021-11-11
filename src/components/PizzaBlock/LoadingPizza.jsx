import React from "react";
import ContentLoader from "react-content-loader";

const LoadingPizza = () => {
  return (
    <ContentLoader
    className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="134" cy="112" r="112" />
      <rect x="0" y="255" rx="4" ry="4" width="280" height="28" />
      <rect x="0" y="301" rx="3" ry="3" width="280" height="76" />
      <rect x="148" y="400" rx="30" ry="30" width="129" height="33" />
      <rect x="0" y="402" rx="4" ry="4" width="92" height="28" />
    </ContentLoader>
  );
};

export default LoadingPizza;
