// librairies 
import { useState } from 'react';
import classes from './CreateArticle.module.css';

// composants
import Input from '../../../Components/UI/Input';

function CreateArticle() {
  // states 
  const [inputs, setInputs] = useState([
    {
      id: 'title',
      elementType: 'input',
      elementConfig : {
        type: 'text',
        placeholder: "Titre de l'article"
      },
      value: '', 
      label: 'Titre',
      valid : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 85
      },
      touched : false
    },
    {
      id: 'content',
      elementType: 'textarea',
      elementConfig : {},
      value: '', 
      label: "Contenu de l'article",
      valid : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 300
      },
      touched : false
    },
    {
      id: 'author',
      elementType: 'input',
      elementConfig : {
        type: 'text',
        placeholder: "Auteur de l'article"
      },
      value: '', 
      label: 'Auteur',
      valid : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 30
      },
      touched : false
    },
    {
      id: 'etat',
      elementType: 'select',
      elementConfig : {
        options: [
          {value: 'Brouillon'},
          {value: 'Publié'}
        ]
      },
      value: '', 
      label: "État de l'article",
      valid: true,
      validation: {},
      touched : false
    },
  ]);

  const [ formIsValid, setFormIsValid ] = useState(false);

  // fonctions
  const chekValidity = (value, rules) => {
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    // change value
    const newInputs = [...inputs];
    const targetInput = newInputs.find(input => input.id === id);
    targetInput.value = event.target.value;

    // changed touched value
    targetInput.touched = true;

    // check value 
    targetInput.valid = chekValidity(event.target.value, targetInput.validation);

    setInputs(newInputs);

    // check form
    let validForm = true; 
    for (let input in newInputs) {
      validForm = newInputs[input].valid && validForm;
    };
    setFormIsValid(validForm);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log('sending');
  };

  // variable JSX 
  const form = (
    <form className={classes.CreateArticle} onSubmit={(event) => formSubmitHandler(event)}>
      {inputs.map(input => (
        <Input
          key={input.id}
          id={input.id}
          value={input.value}
          label={input.label}
          config={input.elementConfig}
          elementType={input.elementType}
          valid={input.valid}
          touched={input.touched}
          changed={(event) => inputChangedHandler(event, input.id)}
        />
      ))}
      <button type='submit' className='button' disabled={!formIsValid}>Envoyer</button>
    </form>
  );

  return (
    <div className='container'>
      <h1>Créer un article</h1>
      {form}
    </div>
  );
};

export default CreateArticle;