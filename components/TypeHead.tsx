import { ErrMsg } from './FormComps';

const TypeHead = ({ register, options, name, list, required, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="flex flex-col gap-1">
        <span className="c-sand11 fw-500 block capitalize">
          {name}{required === true ? <sup className="c-red11"> *</sup> : ""}
        </span>
      <input name={name} list={list} {...register(name)} required={required} {...rest} id={name} className="block w-full field" />
      <datalist id={list}>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </datalist>
      <ErrMsg name={name} />
      </label>
      <br />
    </div>
  );
};

export default TypeHead;