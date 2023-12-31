// librairies
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './Contact.module.css';
import routes from '../../config/routes';
import { useEffect } from 'react';

// components

function Contact() {
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Contact';
  });

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
        className='button'
        onClick={emailClickedHandler}
      >
			Email
      </button>
      <button 
        className='button'
        onClick={phoneClickedHandler}
      >
			Téléphone
      </button>
      <Outlet />
    </div>
  );
};

export default Contact;