import React from "react";
import ContentLoader from "react-content-loader";

export default function PlaylistSkeleton() {
  const array = [0, 1, 2, 3, 4];

  return (
    <ContentLoader
      speed={2}
      width={1107}
      height={305}
      viewBox="0 0 1107 305"
      backgroundColor="#313131"
      foregroundColor="#ecebeb"
    >
      {array.map((num) => {
        const y1 = num * 63;
        const y2 = y1 + 16;

        return (
          <React.Fragment key={num}>
            <rect x={0} y={y1} width={51} height={51} />
            <rect x={65} y={y2} width={1107} height={19} />
          </React.Fragment>
        );
      })}
    </ContentLoader>
  );
}
