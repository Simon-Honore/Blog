// librairies
import classes from'./Layout.module.css';

// components
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Layout({children}) {
  return (
    <div className={classes.Layout}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;