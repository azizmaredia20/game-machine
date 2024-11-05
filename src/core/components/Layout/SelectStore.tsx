import Select, { selectedValueType, Option } from "@core/components/Form/Select";
import useAppContext from "@hooks/useAppContext";

function SelectStore(_: SelectStoreProps) {
  const { appState, dispatch } = useAppContext();

  const handleStroeChange = ({
    value,
  }: {
    name?: string;
    value: selectedValueType;
  }) => {
    const selectedStore = appState?.userGameRoom?.find((store) => store?.value === value);
    dispatch({ type: "APPCONTEXT=>selectedGameRoom", value: selectedStore })
  };

  return (
    <div className="shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] z-50">
      <Select
        className="max-w-sm m-auto"
        options={appState?.userGameRoom as Option[]}
        defaultValue={appState?.selectedGameRoom?.value}
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
