import React from "react";
import useStoreContext from "@hooks/useStoreContext";
import Select, { selectedValueType } from "@core/components/Form/Select";
import { STORES } from "@client/config";

function SelectStore(_: SelectStoreProps) {
  const { store, setStore } = useStoreContext();
  const handleStroeChange = ({
    value,
  }: {
    name?: string;
    value: selectedValueType;
  }) => {
    const selectedStore = STORES.find((store) => store?.value === value);
    selectedStore && setStore(selectedStore);
  };

  return (
    <div className="shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] z-50">
      <Select
        className="max-w-sm m-auto"
        options={STORES}
        defaultValue={store?.value}
        label="Store"
        labelClassName="hover:text-[#007bff] text-[#333] block font-semibold text-[15px mb-2"
        name="store"
        onChange={handleStroeChange}
      />
    </div>
  );
}

export interface SelectStoreProps {}

export default SelectStore;
