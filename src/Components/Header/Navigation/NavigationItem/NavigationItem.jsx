// external
import { NavLink } from 'react-router-dom';

// internal
import classes from './NavigationItem.module.css';

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