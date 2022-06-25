import React from "react";

function Submit({ value }) {
  return (
    <input
      type="submit"
      value={value}
      className="w-full dark:bg-white bg-secondary text-white dark:text-secondary rounded cursor-pointer p-2 hover:bg-opacity-70 text-lg font-semibold"
    />
  );
}

export default Submit;
