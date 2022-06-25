import React from "react";

export function FormContainer({ children }) {
  return (
    <div className="dark:bg-primary fixed inset-0 -z-20 flex justify-center items-center">
      {children}
    </div>
  );
}
