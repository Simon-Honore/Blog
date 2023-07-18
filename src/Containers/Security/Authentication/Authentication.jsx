// librairies
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkValidity } from '../../../shared/utility';
import classes from './Authentication.module.css';
import appFirebase from '../../../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

// components
import Input from '../../../Components/UI/Input';
import routes from '../../../config/routes';

function Authentication() {
  // hooks
  const navigate = useNavigate();

  // auth firebase 
  const auth = getAuth(appFirebase);

  // states 
  const [inputs, setInputs] = useState([
    {
      id: 'email',
      elementType: 'input',
      elementConfig : {
        type: 'email',
        placeholder: "Email"
      },
      value: '', 
      label: 'Adresse email',
      valid : false,
      validation: {
        required: true,
        email: true
      },
      touched : false,
      errorMessage: "L'adresse email n'est pas valide."
    },
    {
      id: 'password',
      elementType: 'input',
      elementConfig : {
        type: 'password',
        placeholder: "Mot de passe"
      },
      value: '', 
      label: 'Mot de passe',
      valid : false,
      validation: {
        required: true,
        minLength: 6
      },
      touched : false,
      errorMessage: "Le mot de passe doit faire au moins 6 caractères."
    },
  ]);

  const [ formIsValid, setFormIsValid ] = useState(false);
  const [ logError, setLogError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  // functions
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

  const registerClickedHandler = () => {
    const user = {
      email: inputs.find(input => input.id === 'email').value,
      password: inputs.find(input => input.id === 'password').value
    };

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(response => {
        toast.success('Bienvenue.');
        navigate(routes.HOME);
      })
      .catch((error) => {
        switch(error.code) {
        case 'auth/email-already-in-use':
          setLogError(true);
          setErrorMessage("L'adresse email est déjà utilisée.");
          break;
        default:
        }
      });
  };

  const loginClickedHandler = () => {
    const user = {
      email: inputs.find(input => input.id === 'email').value,
      password: inputs.find(input => input.id === 'password').value
    };
    
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(response => {
        toast.success('Ravi de vous revoir.');
        navigate(routes.HOME);
      })
      .catch(error => {
        setLogError(true);
        setErrorMessage("Adresse email et/ou mot de passe invalide");
      });
  };

  const formHandler = (event) => {
    event.preventDefault();
  };

  // variable JSX 
  const alertJSX = (alertContent) => (
    <div className={classes.alert}>{alertContent}</div>
  );
		
  const formJSX = (
    <form className={classes.Authentication} onSubmit={(event) => formHandler(event)}>
      { logError ? alertJSX(errorMessage) : null}
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
      
      <button onClick={(event) => loginClickedHandler(event)} className='button' disabled={!formIsValid}>
        Connexion
      </button>
      <button onClick={(event) => registerClickedHandler(event)} className='button' disabled={!formIsValid}>
        Inscription
      </button>
    </form>
  );



  return (
    <div>
      <h1>Authentification</h1>
      
      {formJSX}
    </div>
  );
};

export default Authentication;