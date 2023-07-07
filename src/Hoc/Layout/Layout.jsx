// librairies
import './Layout.module.css';

// components
import Header from '../../Components/Header/Header';

function Layout({children}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;