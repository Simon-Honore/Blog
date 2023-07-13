// librairies
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './config/routes';
import appFirebase from './config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// components
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Containers/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import NotFound from './Containers/NotFound/NotFound';
import Email from './Containers/Contact/Email/Email';
import Phone from './Containers/Contact/Phone/Phone';
import ManageArticle from './Containers/Admin/ManageArticle/ManageArticle';
import Authentication from './Containers/Security/Authentication/Authentication';

function App() {
	  // State
  const [user, setUser] = useState('');

  // Life cycle
  useEffect(() => {
    authListener();
  }, []);
	
  // Function
  const authListener = () => {
    const auth = getAuth(appFirebase);
    onAuthStateChanged(auth, user => {
      if(user) {
        setUser(user);
      } else {
        setUser('');
      }
    });
  }; 

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.CONTACT} element={<Contact />} >
            <Route path={routes.EMAIL} element={<Email />} />
            <Route path={routes.PHONE} element={<Phone />} /> 
          </Route>
          <Route path={routes.ARTICLES} element={<Articles />} />
          <Route path={routes.ARTICLES + '/:slug'} element={<Article />} />
          <Route path={routes.MANAGEARTICLE} element={<ManageArticle />} />
          <Route path={routes.AUTHENTICATION} element={<Authentication />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
