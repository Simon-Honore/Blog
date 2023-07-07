// librairies
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './Contact.module.css';
import routes from '../../routes';

// components

function Contact() {
  // hooks
  const navigate = useNavigate();
  // functions
  const emailClickedHandler = () => {
    navigate(routes.EMAIL);
  };

  const phoneClickedHandler = () => {
    navigate(routes.PHONE);
  };
	
  return (
    <div>
      <h1>Contact</h1>
      <p>Par quel moyens de contact souhaitez-vous échanger ?</p>
      <button
        className={classes.button}
        onClick={emailClickedHandler}
      >
			Email
      </button>
      <button 
        className={classes.button}
        onClick={phoneClickedHandler}
      >
			Téléphone
      </button>
      <Outlet />
    </div>
  );
};

export default Contact;