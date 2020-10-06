import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './containers/Login/Login'
import Articles from './containers/Articles/Articles';
import NewArticle from './containers/Articles/NewArticle/NewArticle';
import ArticleDetail from './containers/Articles/ArticleDetail/ArticleDetail';
import ArticleEdit from './containers/Articles/ArticleEdit/ArticleEdit';
import Header from './components/Header/Header';

function App(props) {
  return (
  <ConnectedRouter history={props.history}>
    <div className="App">
      <Header />
      <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/articles' exact component={Articles} />
          <Route path='/articles/create' exact component={NewArticle} />
          <Route path='/articles/:id' exact component={ArticleDetail} />
          <Route path='/articles/:id/edit' exact component={ArticleEdit} />
          <Redirect exact from='/' to='login' />
          <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </div>
  </ConnectedRouter>
  );
}

export default App;

// Log In page (/login)
// Article list page (/articles)
// Article write(create) page (/articles/create)
// Article detail page (/articles/:id)
// Article edit page (/articles/:id/edit)
