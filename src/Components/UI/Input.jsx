// librairies
import classes from './Input.module.css';

// composants

function Input({
  id,
  value,
  label,
  config,
  elementType,
  changed}) {

  //variables JSX
  let inputElement;
  switch(elementType) {
  case 'input':
    inputElement = (
      <input
        {...config}
        value={value}
        onChange={changed}
        id={id}
      />
    );
    break;
  case 'textarea':
    inputElement = (
      <textarea value={value} onChange={changed} id={id}></textarea>
    );
    break;
  case 'select':
    inputElement = (
      <select value={value} onChange={changed} id={id}>
        {config.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
    break;
  default:
  }

  return (
    <div className={classes.Input}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;