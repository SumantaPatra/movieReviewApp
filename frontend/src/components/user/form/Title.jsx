import React from "react";

function Title({ children }) {
  return (
    <h1 className="dark:text-white text-secondary text-xl font-semibold text-center">
      {children}
    </h1>
  );
}

export default Title;
