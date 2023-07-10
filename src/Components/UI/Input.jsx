// librairies
import classes from './Input.module.css';

// composants

function Input({
  id,
  value,
  label,
  config,
  elementType,
  valid,
  touched,
  errorMessage,
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
        className={!valid && touched ? classes.invalid : undefined}
      />
    );
    break;
  case 'textarea':
    inputElement = (
      <textarea 
        value={value} 
        onChange={changed} 
        id={id}
        className={!valid && touched ? classes.invalid : undefined}>
      </textarea>
    );
    break;
  case 'select':
    inputElement = (
      <select value={value} onChange={changed} id={id}>
        {config.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
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
      {!valid && touched ? <p>{errorMessage}</p> : undefined}
    </div>
  );
};

export default Input;