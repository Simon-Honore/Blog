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
      label: 'Titre'
    },
    {
      id: 'content',
      elementType: 'textarea',
      elementConfig : {},
      value: '', 
      label: "Contenu de l'article"
    },
    {
      id: 'author',
      elementType: 'input',
      elementConfig : {
        type: 'text',
        placeholder: "Auteur de l'article"
      },
      value: '', 
      label: 'Auteur'
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
      label: "État de l'article"
    }
  ]);

  // fonctions
  const inputChangedHandler = (event, id) => {
    const newInputs = [...inputs];
    newInputs.find(input => input.id === id).value = event.target.value;
    setInputs(newInputs);
  };

  // variable JSX 
  const form = (
    <form className={classes.CreateArticle}>
      {inputs.map(input => (
        <Input
          key={input.id}
          id={input.id}
          value={input.value}
          label={input.label}
          config={input.elementConfig}
          elementType={input.elementType}
          changed={(event) => inputChangedHandler(event, input.id)}
        />
      ))}
      <button type='submit' className='button'>Envoyer</button>
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