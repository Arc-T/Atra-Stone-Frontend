import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  className?: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  className = "styled-input",
  ...extraAttributes
}) => {
  const inputId = `input-${name}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input id={inputId} className={className} {...extraAttributes} />
    </div>
  );
};

export default Input;
