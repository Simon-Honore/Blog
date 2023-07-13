//librairies 
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import appFirebase from '../../../config/firebase';
import { getAuth, signOut } from 'firebase/auth';

//components
import NavigationItem from './NavigationItem/NavigationItem';
import { useNavigate } from 'react-router-dom';
import app from '../../../config/firebase';

function Navigation() {
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
      <NavigationItem to={routes.MANAGEARTICLE}>Créer un article</NavigationItem>
      <NavigationItem to={routes.AUTHENTICATION}>Authentification</NavigationItem>
      <button className='button' onClick={logOutClickedHandler}>Deconnexion</button>
    </ul>
  );
};

export default Navigation;