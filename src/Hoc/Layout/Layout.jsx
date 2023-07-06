// external

// internal
import Header from '../../Components/Header/Header';
import './Layout.module.css';

function Layout({children}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;