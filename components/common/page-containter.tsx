import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  container,
}: {
  children: React.ReactNode;
  container?: string;
}) => {
  return (
    <section
      className={cn(
        "mih-h-screen mt-5",
        container === "fluid" ? "mx-3" : "mx-5 p-4 "
      )}
    >
      {children}
    </section>
  );
};

export default Container;
