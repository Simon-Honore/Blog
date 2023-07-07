// librairies
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './Contact.module.css';

// components

function Contact() {
  // hooks
  const navigate = useNavigate();
  // functions
  const emailClickedHandler = () => {
    navigate('email');
  };

  const phoneClickedHandler = () => {
    navigate('phone');
  };
	
  return (
    <div>
      <h1>Contact</h1>
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