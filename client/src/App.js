import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Article from './pages/article/article';
import EditArticle from './pages/editArticle/editArticle';
import NewArticle from './pages/newArticle/newArticle';
import NoMatch from './pages/noMatch/noMatch';
import Login from './pages/login/login';
import ProtectedRoute from './components/protectedRoute/protectedRoute';

import './css/my_style.css';
import './css/styles.css';
import './css/markdown_styles.css';

import ListChangedContext from './context/listChangedContext';
import UserContext from './context/userContext';

function App() {
    const [user, setUser] = useState(null);
    const [hasChanged, setHasChanged] = useState(true);

    useEffect(() => {
        axios.get('/api/auth/status')
            .then(response => {
                // if the user is logged in, set the user object to state
                // if the user is not logged in, set the user object to null
                response.status === 200 ? setUser(response.data.user) : setUser(null);
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
            });
    }, []);

    return (
        <Router>
            <UserContext.Provider value={[user, setUser]}>
                <ListChangedContext.Provider value={{ hasChanged, setHasChanged }}>
                    <Header />
                    <div className="container py-4 flex-fill bg-white border border-dark">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/article/:slug" component={Article} />
                            <ProtectedRoute exact path="/new" component={NewArticle} user={user} />
                            <ProtectedRoute exact path="/edit/:slug" component={EditArticle} user={user} />
                            <Route exact path="/login">
                                {user ? <Redirect to="/" /> : <Login />}
                            </Route>
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                    <Footer />
                </ListChangedContext.Provider>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
