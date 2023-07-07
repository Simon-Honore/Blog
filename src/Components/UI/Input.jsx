// librairies
import classes from './Input.module.css';

// composants

function Input({
  value,
  label,
  config,
  elementType}) {

  //variables JSX
  let inputElement;
  switch(elementType) {
  case 'input':
    inputElement = (
      <input
        {...config}
        value={value}
      />
    );
    break;
  case 'textarea':
    inputElement = (
      <textarea value={value}></textarea>
    );
    break;
  case 'select':
    inputElement = (
      <select value={value}>
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
      <label>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;