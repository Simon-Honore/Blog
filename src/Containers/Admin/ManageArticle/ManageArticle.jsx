// librairies 
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './ManageArticle.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import { checkValidity } from '../../../shared/utility';
import appFirebase from '../../../config/firebase';
import { getAuth, getIdToken} from "firebase/auth";
import { toast } from 'react-toastify';

// composants
import Input from '../../../Components/UI/Input';

function ManageArticle() {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  // states 
  const [inputs, setInputs] = useState([
    {
      id: 'title',
      elementType: 'input',
      elementConfig : {
        type: 'text',
        placeholder: "Titre de l'article"
      },
      value: location.state && location.state.article ? location.state.article.title : '', 
      label: 'Titre',
      valid : location.state && location.state.article ? true : false,
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
      value: location.state && location.state.article ? location.state.article.catchphrase : '', 
      label: "Accroche de l'article",
      valid : location.state && location.state.article ? true : false,
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
      value: location.state && location.state.article ? location.state.article.content : '', 
      label: "Contenu de l'article",
      valid : location.state && location.state.article ? true : false,
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
      value: location.state && location.state.article ? location.state.article.author : '', 
      label: 'Auteur',
      valid : location.state && location.state.article ? true : false,
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
      value: location.state && location.state.article ? location.state.article.draft : '', 
      label: "État de l'article",
      valid: true,
      validation: {},
      touched : false
    },
  ]);

  const [ formIsValid, setFormIsValid ] = useState(location.state && location.state.article ? true : false);

  // functions

  const generateSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  const inputChangedHandler = (event, id) => {
    // change value
    const newInputs = [...inputs];
    const targetInput = newInputs.find(input => input.id === id);
    targetInput.value = event.target.value;

    // changed touched value
    targetInput.touched = true;

    // check value 
    targetInput.valid = checkValidity(event.target.value, targetInput.validation);

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

    // creating an objet of an article
    const article = {};
    inputs.map(input => {
      const value = typeof input.value === 'string' ? input.value.trim() : input.value;
      return article[input.id] = value;
    });
    article.date = Date.now();
    article.slug = generateSlug(article.title);

    // get token 
    const auth = getAuth(appFirebase);
    const { currentUser } = auth;
    if (currentUser) {
      getIdToken(currentUser, true)
        .then(token => {
				    // call API 
          if (location.state && location.state.article) {
          // put
            axios.put(`/articles/${location.state.article.id}.json?auth=${token}`, article)
              .then(response => {
                toast.success('Article modifié avec succès.');
                navigate(`${routes.ARTICLES}/${article.slug}`, {replace: true});
              })
              .catch(error => console.log(error));
          } else {
          // post
            axios.post(`/articles.json?auth=${token}`, article)
              .then(response => {
                toast.success('Article ajouté avec succès.');
                navigate(routes.ARTICLES, {replace: true});
              })
              .catch(error => console.log(error));
          };
        })
        .catch(error => console.log(error));
    }
  };

  // variable JSX 
  const formJSX = (
    <form className={classes.ManageArticle} onSubmit={(event) => formSubmitHandler(event)}>
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
      <button type='submit' className='button' disabled={!formIsValid}>
        {location.state && location.state.article ? (
          'Modifier un article'
        ) : (
          'Créer un article'
        )}
      </button>
    </form>
  );

  const pageTitleJSX = (
    location.state && location.state.article ? (
      <h1>Modifier un article</h1>
    ) : (
      <h1>Créer un article</h1>
    )
  );

  return (
    <div className='container'>
      {pageTitleJSX}
      {formJSX}
    </div>
  );
};

export default ManageArticle;