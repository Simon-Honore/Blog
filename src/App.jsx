// librairies
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './config/routes';

// components
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Containers/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import NotFound from './Containers/NotFound/NotFound';
import Email from './Containers/Contact/Email/Email';
import Phone from './Containers/Contact/Phone/Phone';
import CreateArticle from './Containers/Admin/CreateArticle/CreateArticle';

function App() {
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
          <Route path={routes.CREATEARTICLE} element={<CreateArticle />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
