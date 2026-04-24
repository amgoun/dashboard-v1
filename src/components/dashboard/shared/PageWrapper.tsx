import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = "" }) => (
  <div className={`px-4 sm:px-8 pb-8 space-y-5 ${className}`}>
    {children}
  </div>
);

export default PageWrapper;
