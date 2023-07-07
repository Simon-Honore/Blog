// librairies
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

// components

function NavigationItem({ to, children }) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={to}
        className={({isActive}) => 
          isActive ? classes.active : ''
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;