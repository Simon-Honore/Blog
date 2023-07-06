// external
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// internal
import './App.css';

// components
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Containers/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/articles/' element={<Articles />} />
          <Route path='/articles/:articleId' element={<Article />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
