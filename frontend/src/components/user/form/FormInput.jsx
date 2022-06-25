import React from "react";

function FormInput({ name, label, placeholder, children, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        type="text"
        id={name}
        name={name}
        className="rounded outline-none p-1 bg-transparent border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary w-full text-lg dark:text-white peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={label}
        className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white transition self-start"
      >
        {children}
      </label>
    </div>
  );
}

export default FormInput;
