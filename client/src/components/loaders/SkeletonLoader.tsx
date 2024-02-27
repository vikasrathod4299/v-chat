import { cn } from "@/lib/utils";
import React, { ComponentPropsWithRef, FC } from "react";

type SkeletonLoaderProps = ComponentPropsWithRef<"div">;

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(className, "animate-pulse")} {...props}>
      {children}
    </div>
  );
};

export default SkeletonLoader;
