import React from 'react';
import ReactDOM from 'react-dom';
import App from './komponente/App';
import Login from './komponente/Autentifikacija/Login';
import Registracija from './komponente/Autentifikacija/Registracija';
import Spinner from './Spinner';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

//State management system - REDUX
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/indeks';
import { postaviKorisnika, ocistiKorisnika } from './akcije/indeks';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(korisnik => {
      if (korisnik) {
        this.props.postaviKorisnika(korisnik);
        this.props.history.push('/');
      }
      //setting state for when user is not found
      else {
        this.props.history.push('/login');
        this.props.ocistiKorisnika();
      }
    })
  }


  render() {
    //User spinner component to prevent user from seeing white screen while setUserAction is being executed
    return this.props.ucitavaSe ? <Spinner /> :  (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registracija} />
        </Switch>
    );
  }
}


const mapStateFromProps = state => ({
  ucitavaSe: state.korisnik.ucitavaSe
});


const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { postaviKorisnika, ocistiKorisnika }
  )(Root)
);

ReactDOM.render(
<Provider store={store}>
  <Router>
    <RootWithAuth />
  </Router>
</Provider>,
document.getElementById('root'));
registerServiceWorker();
