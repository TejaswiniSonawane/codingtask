import React 				from 'react';
import './App.css';
import axios from 'axios';

import Layout from './Layout/Layout.js';

const url = 'http://dummy.restapiexample.com/api/v1/';
axios.defaults.baseURL = url;
axios.defaults.headers.post['Content-Type'] = 'application/json';


function App() {
  return (
    <div className="App">
       <Layout />
    </div>
  );
}

export default App;
