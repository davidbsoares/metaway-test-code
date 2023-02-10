import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";

type Props = {
  items?: {
    id?: number;
    name: string;
  }[];
  setPerson?: Dispatch<SetStateAction<string>>;
  defaultValue?: string;
  placeholder?: string;
  setValue?: (data: string) => void;
};

const SelectInput = ({
  items,
  setPerson,
  defaultValue,
  placeholder = "Selecione uma pessoa",
  setValue,
}: Props) => {
  function handleChange(data: string) {
    if (setPerson) {
      setPerson(data);
      return;
    }
    if (setValue) {
      setValue(data);
      return;
    }
    return;
  }
  return (
    <>
      <Select.Root
        onValueChange={(data) => handleChange(data)}
        defaultValue={defaultValue}
        disabled={!!defaultValue}
      >
        <Select.Trigger className="my-2 mx-auto inline-flex h-9 items-center justify-center gap-1 rounded border border-solid border-gray-400 bg-white px-2 text-sm leading-none text-black shadow-sm hover:bg-blue-50 focus:shadow">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="text-black">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-50 hidden rounded-md bg-white shadow-xl">
            <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-black">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              {items?.map((item) => (
                <Select.Item
                  value={item.name}
                  key={item.id}
                  className="relative flex h-6 select-none items-center py-1 pr-9 pl-6 text-sm leading-none text-black"
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-black">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};

export default SelectInput;
