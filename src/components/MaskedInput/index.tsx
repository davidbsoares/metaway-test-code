import { InputHTMLAttributes } from "react";
import Input from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask: "tel" | "cpf" | "cep" | "date";
}

const thisYear = new Date().getFullYear();

const autoCorrectedDatePipe = createAutoCorrectedDatePipe("yyyy-mm-dd", {
  minYear: 1,
  maxYear: thisYear,
});

const MaskedInput = ({ label, mask, ...props }: Props) => {
  const masks = {
    tel: [
      "(",
      /[1-9]/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    cpf: [
      /\d/,
      /\d/,
      /\d/,
      ".",
      /\d/,
      /\d/,
      /\d/,
      ".",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
    ],
    cep: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
    date: [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/],
  };
  return (
    <fieldset>
      <label
        htmlFor={label}
        className="text-xs font-medium text-gray-700 dark:text-gray-400"
      >
        {label}
      </label>
      <Input
        mask={masks[mask]}
        pipe={mask === "date" && autoCorrectedDatePipe}
        id={label}
        type="text"
        className="mt-1 block w-full rounded-md border border-gray-400 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus-visible:border-transparent focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600"
        {...props}
      />
    </fieldset>
  );
};
export default MaskedInput;
