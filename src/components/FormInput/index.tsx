import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...props }: Props) => {
  return (
    <fieldset className="flex flex-col gap-1">
      <label
        htmlFor={label}
        className="text-xs font-medium text-gray-700 dark:text-gray-400"
      >
        {label}
      </label>
      <input
        id={label}
        type="text"
        className="block w-full rounded-md border border-gray-400 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus-visible:border-transparent focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600"
        {...props}
      />
      {error && <span className="mb-2 text-xs text-red-600">{error}</span>}
    </fieldset>
  );
};
export default Input;
