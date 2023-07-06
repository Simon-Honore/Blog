// external
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// internal
import './App.css';
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Containers/Contact/Contact';
import Articles from './Containers/Articles/Articles';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/articles' element={<Articles />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
