//librairies
import classes from './Header.module.css';
import logo from '../../Assets/logo.png';

//components 
import Navigation from './Navigation/Navigation';

function Header() {
  return (
    <header className={classes.Header}>
      <div className={["container", classes.flex].join(' ')}>
        <div className={classes.logo}>
          <img src={logo} alt="logo du blog" />
          <p><span>BLOG</span> Simon Honoré</p>
        </div>
        <nav>
          <Navigation />
        </nav>
      </div>
    </header>
  );
};

export default Header;