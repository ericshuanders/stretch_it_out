import React from 'react';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AnonHomePage } from './pages/anon-home-page';
import StretchCategory from './pages/StretchCategory';
import IndividualStretch from './pages/IndividualStretch';
import PrivateRoute from './components/PrivateRoute';
import { Profile } from './pages/profile';
import { Benefits } from './pages/benefits';
import { Welcome } from './pages/quiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/benefits" component={Benefits} />
          <Route exact path="/" component={AnonHomePage} />
          <Route exact path="/body-area" component={StretchCategory} />
          <Route exact path="/stretch/:id" component={IndividualStretch} />
          <Route exact path="/sign-up" component={Welcome} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
