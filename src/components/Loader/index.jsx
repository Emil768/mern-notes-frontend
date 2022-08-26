import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
  if (props.isfull) {
    return (
      <ContentLoader
        speed={2}
        width={800}
        height={400}
        viewBox="0 0 800 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="12" y="20" rx="0" ry="0" width="800" height="52" />
        <rect x="15" y="90" rx="0" ry="0" width="800" height="30" />
        <rect x="16" y="160" rx="0" ry="0" width="800" height="23" />
        <rect x="16" y="200" rx="0" ry="0" width="800" height="23" />
        <rect x="16" y="240" rx="0" ry="0" width="800" height="23" />
        <rect x="16" y="280" rx="0" ry="0" width="800" height="23" />
        <rect x="16" y="320" rx="0" ry="0" width="800" height="23" />
        <rect x="16" y="360" rx="0" ry="0" width="800" height="23" />
      </ContentLoader>
    );
  }
  return (
    <ContentLoader
      speed={2}
      width={485}
      height={252}
      viewBox="0 0 485 252"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="20" ry="20" width="485" height="252" />
    </ContentLoader>
  );
};

export default Loader;
