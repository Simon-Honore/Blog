//librairies 
import classes from './Navigation.module.css';
import routes from '../../../routes';

//components
import NavigationItem from './NavigationItem/NavigationItem';

function Navigation() {
  return (
    <ul className={classes.Navigation}>
      <NavigationItem to={routes.HOME}>Accueil</NavigationItem>
      <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
      <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
    </ul>
  );
};

export default Navigation;