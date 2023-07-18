// librairies
import classes from'./Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

// components
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function Layout({children}) {
  return (
    <div className={classes.Layout}>
      <Header />
      <main>
        {children}
      </main>
      <ToastContainer
        position='bottom-right'
        pauseOnHover={false}
        theme='colored'
      />
      <Footer />
    </div>
  );
};

export default Layout;