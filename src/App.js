import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ArticleDetails from './components/articles/ArticleDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateArticle from './components/articles/CreateArticle'
import CreateSpeaker from './components/speakers/CreateSpeaker'
import Speakers from './components/speakers/Speakers'
import EditArticle from './components/articles/EditArticle'
import UserArticleDashboard from './components/articles/UserArticleDashboard'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/speakers' component={Speakers} />
            <Route exact path='/article/:id' component={ArticleDetails} />
            <Route path='/article/:id/edit' component={EditArticle} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateArticle} />
            <Route path='/createspeaker' component={CreateSpeaker} />
            <Route path='/userarticles' component={UserArticleDashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
