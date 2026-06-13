import React from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";

function RTESkeleton() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <SkeletonTheme
      baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
      highlightColor={theme === "dark" ? "#4B5563" : "#f3f4f6"}
    >
      <div className="w-full">
        <Skeleton width={120} height={24} className="mb-3" />

        {/* Toolbar */}
        <Skeleton height={48} borderRadius={8} className="mb-2" />

        {/* Editor area */}
        <Skeleton height={350} borderRadius={8} />
      </div>
    </SkeletonTheme>
  );
}

export default RTESkeleton;
