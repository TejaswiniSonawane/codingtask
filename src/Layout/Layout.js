import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from '../Screens/Homepage.js';
import Formpage from '../Screens/Formpage.js';

import 'bootstrap/dist/css/bootstrap.min.css'

const Layout = (props) => {
    return (
    <div>
        <Router>
            <Route path="/" exact strict component={Homepage}/>
            <Route path="/add" exact strict component={Formpage}/>
        </Router>
    </div>
    );
}
export default Layout;