import { HTMLProps, StateSetter } from '@/types';
import { useId, useState } from 'react';
import Icon from '@/components/ui/Icon';

export type InputNumProps =  {
  size?: number;
  unit?: string;
  name?: string;
  label?: string;
  step?: number;
  value: number;
  setValue: StateSetter<number>;
  description?: string;
  required?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
} & HTMLProps<'input'>

export default function InputNum({
  description,
  id,
  label,
  name,
  className,
  unit,
  required,
  step = 1,
  value,
  setValue,
  min,
  max,
  disabled = false,
  size,
  ...props
}:InputNumProps) {
  const created_id = useId();
  const _id = id ?? created_id;

  return (
    <div className={`grid  text-sm ${disabled ? 'c-base10': 'c-base11'} `}>
      {label && (
        <label htmlFor={_id}>
          <span className='font-display  c-base11 text-sm'>{label}</span>
          {required && <span>*</span>}
        </label>
      )}
      {description && <p id={_id + '-description'}>{description}</p>}
      <div className='flex items-center '>
        <div className='rd-l-2 bg-base3 b-1 b-base6 focus-within:b-base7  grid grid-auto-flow-col focus-within:outline-2 focus-within:outline-accent11 focus-within:outline-solid'>
          <input
            // type='number'
            value={String(value)}
            onChange={(e) => {
              const userInput = e.target.value;
              if (isNumeric(userInput)) {
                setValue(clamp(Number(userInput), min, max));
              } else {
                setValue(clamp(Number(value), min, max));
              }
            }}
            name={name}
            id={id}
            min={min}
            max={max}
            step={step}
            className={`rd-l-2 px-0.25em  py-0.25em bg-transparent
             focus:outline-none
              ${className}`}
            aria-describedby={description && `${id}-description`}
            aria-disabled={disabled}
            {...props}
            size={size ?? 1}
          />
          {unit && (
            <span className='flex items-center c-base11  '>
              <abbr
                title={unit}
                className='no-underline text-xs text-decoration-none  flex justify-center items-baseline rd-1'
              >
                {unit}
              </abbr>
            </span>
          )}
        </div>
        <button
          className='icon-btn py-0.25em px-0.5em rd-0'
          onClick={() => {
            setValue(clamp(value + step, min, max));
          }}
          disabled={disabled}
        >
          <Icon name='bf-i-ph-plus' />
          <span className='sr-only'>Add 1</span>
        </button>
        <button
          className='icon-btn py-0.25em px-0.5em rd-0 rd-r-2'
          onClick={() => {
            setValue(clamp(value - step, min, max));
          }}
          disabled={disabled}
        >
          <Icon name='bf-i-ph-minus' />
          <span className='sr-only'>Subtract 1</span>
        </button>
      </div>
      {/* <p>error message</p> */}
      <p className='min-h-2'></p>
    </div>
  );
}


function clamp(number: number, min?: number, max?: number) {
  if (min != null && number < min) return min;
  if (max != null && number > max) return max;
  return number;
}

function isNumeric(str: string) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
