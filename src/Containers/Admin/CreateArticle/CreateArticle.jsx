// librairies 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CreateArticle.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';

// composants
import Input from '../../../Components/UI/Input';

function CreateArticle() {
  // hooks
  const navigate = useNavigate();

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
      touched : false,
      errorMessage: 'Le titre est requis, il doit faire entre 5 et 85 caractères'
    },
    {
      id: 'catchphrase',
      elementType: 'textarea',
      elementConfig : {},
      value: '', 
      label: "Accroche de l'article",
      valid : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 150
      },
      touched : false,
      errorMessage: "L'accroche est requiss, elle doit faire entre 5 et 150 caractères"
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
        maxLength: 1200
      },
      touched : false,
      errorMessage: 'Le contenu est requis, il doit faire entre 10 et 1200 caractères'
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
        minLength: 2,
        maxLength: 30
      },
      touched : false,
      errorMessage: "L'auteur est requis, il doit faire entre 2 et 30 caractères"
    },
    {
      id: 'draft',
      elementType: 'select',
      elementConfig : {
        options: [
          {value: true, displayValue: 'Brouillon'},
          {value: false, displayValue: 'Publié'}
        ]
      },
      value: true, 
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
    const article = {};
    inputs.map(input => {
      const value = typeof input.value === 'string' ? input.value.trim() : input.value;
      return article[input.id] = value;
    });
    article.date = new Date().toLocaleDateString();
    axios.post('/articles.json', article)
      .then(response => {
        console.log(response);
        navigate(routes.ARTICLES, {replace: true});
      })
      .catch(error => console.log(error));
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
          errorMessage={input.errorMessage}
          changed={(event) => inputChangedHandler(event, input.id)}
        />
      ))}
      <button type='submit' className='button' disabled={!formIsValid}>Enregistrer un article</button>
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