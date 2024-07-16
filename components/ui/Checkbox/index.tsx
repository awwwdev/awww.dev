import { useId } from "react";
import Icon from "../Icon";

export default function Checkbox({
  description,
  checked,
  value,
  onChange,
  label,
  name,
  className,
  required,
  filterGroup,
  ...props
}: {
  className?: string;
  checked: boolean;
  onChange: (checked: boolean, value?: string, filterGroup?: string) => void;
  value?: string;
  name?: string;
  label: string;
  description?: string;
  required?: boolean;
  filterGroup?: string;
}) {
  const id = useId();

  return (
    <div className="grid  ">
      <label htmlFor={id} className="flex gap-2 items-center ">
        <div
          className={`w-1.5em h-1.5em b-1 b-base4 flex justify-center items-center p-1 rd-1.5 bg-white
            focus-within:outline-brand-accent focus-within:outline-1px focus-within:outline-solid
            ${checked && "bg-accent9"}
            `}
        >
          <input
            type="checkbox"
            value={value}
            checked={checked}
            onChange={(e) => onChange(e.target.checked, value, filterGroup)}
            name={name}
            id={id}
            className={`sr-only `}
            aria-describedby={description && `${id}-description`}
            {...props}
          />
          {checked && (
            <span className="text-sm c-melow pb-1">
              <Icon name="bf-i-ph-check-bold" subdued={false} />
            </span>
          )}
        </div>

        <span className="fw-500 c-base11 capitalize input ">{label}</span>
      </label>
      {description && <p id={id + "-description"}>{description}</p>}
      <p className="min-h-2" />
    </div>
  );
}
