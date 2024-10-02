import ContentLoader from "react-content-loader";

export default function SidebarSkeleton() {
  const array = [0, 1, 2];

  return (
    <ContentLoader
      speed={2}
      width={250}
      height={510}
      viewBox="0 0 250 510"
      backgroundColor="#313131"
      foregroundColor="#ecebeb"
    >
      {array.map((_, index) => (
        <rect key={index} x={0} y={index * 180} width={250} height={150} />
      ))}
    </ContentLoader>
  );
}
