// librairies
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// components
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Containers/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import NotFound from './Containers/NotFound/NotFound';
import Email from './Containers/Contact/Email/Email';
import Phone from './Containers/Contact/Phone/Phone';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} >
            <Route path='email' element={<Email />} />
            <Route path='phone' element={<Phone />} /> 
          </Route>
          <Route path='/articles/' element={<Articles />} />
          <Route path='/articles/:articleId' element={<Article />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
