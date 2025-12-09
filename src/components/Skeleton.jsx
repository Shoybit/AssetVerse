import React from "react";


const Skeleton = ({
  count = 1,
  height = "h-4",
  width = "w-full",
  rounded = "rounded-md",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-base-300 animate-pulse ${height} ${width} ${rounded}`}
        ></div>
      ))}
    </div>
  );
}
export default Skeleton;