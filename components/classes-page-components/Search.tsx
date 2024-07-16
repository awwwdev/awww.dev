import { InputDebaounced } from '@/components/Table/Filter';
import Icon from '@/components/ui/Icon';


export default function Search({  value, onChange, placeholder }){
  return (
    <div className="px-2 py-1.5 rd-lg  b-1 b-sand5 bg-sand1  w-full fw-400 min-w-40 max-w-80 flex-1 text-base flex items-center gap-2 focus-within:outline-brand-accent focus-within:outline-1px focus-within:outline-solid">
      <Icon name="bf-i-ph-magnifying-glass c-sand11"/>
      <label className="flex gap-2 items-center grow">
        <span className="sr-only">Search</span>
        <div className="grid grow">
          <InputDebaounced
            value={value ?? ""}
            onChange={onChange}
            className="focus:outline-none bg-transparent "
            placeholder={placeholder ?? "Search all columns..."}
          />
        </div>
      </label>
    </div>
  );
};