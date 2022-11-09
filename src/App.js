import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About';
import NoteState from './context/notes/noteState';
import Login from './components/login';
import Signup from './components/signup';
import Contact from './components/Contact';
import { useState } from 'react';
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router >
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container" >
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              {/* <Route exact path="/about">
                <About />
              </Route> */}
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/contact">
                <Contact showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
