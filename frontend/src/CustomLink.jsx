import React from "react";
import { Link } from "react-router-dom";
function CustomLink({ path, children }) {
  return (
    <>
      <Link
        to={path}
        className="dark:text-dark-subtle dark:hover:text-white hover:text-light-subtle text-sm font-semibold"
      >
        {children}
      </Link>
    </>
  );
}

export default CustomLink;
