import Header from './Components/layout/header'
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {routes} from './Components/layout/routes'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
        <Header />       
          {
            routes && routes.map((r, index) => (<Route path ={r.path} component={r.component} exact={r.exact} key={index}/>))
          }
        </Router>
        {/* <img className="App-logo" alt="logo" /> 
        
        <User />
  <TaskViewer/>*/}
      </div>
    </div>
  );
}

export default App;
