//librairies 
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import appFirebase from '../../../config/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { CurrentUserContext } from '../../../context/currentUserContext';

//components
import NavigationItem from './NavigationItem/NavigationItem';
import { useNavigate } from 'react-router-dom';

function Navigation() {
// context 
  const { user } = useContext(CurrentUserContext);

  // hooks 
  const navigate = useNavigate();

  // firebase 
  const auth = getAuth(appFirebase);

  // functions 
  const logOutClickedHandler = () => {
    signOut(auth);
    navigate(routes.HOME);
  };
	
  return (
    <ul className={classes.Navigation}>
      <NavigationItem to={routes.HOME}>Accueil</NavigationItem>
      <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
      <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
      {user ? <NavigationItem to={routes.MANAGEARTICLE}>Créer un article</NavigationItem> : null}
      {!user ? <NavigationItem to={routes.AUTHENTICATION}>Authentification</NavigationItem> : null}
      {user ? <button className='button' onClick={logOutClickedHandler}>Deconnexion</button>: null}
    </ul>
  );
};

export default Navigation;