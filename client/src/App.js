import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/header/header';
import AdminNav from './components/adminNav/adminNav';
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
import CurrentSlugContext from './context/currentSlugContext';
import Loading from './components/loading/loading';

function App() {
    const [user, setUser] = useState(null);
    const [hasChanged, setHasChanged] = useState(true);
    const [hasStatusLoaded, setHasStatusLoaded] = useState(false);
    const [currentSlug, setCurrentSlug] = useState(null);

    useEffect(() => {
        axios.get('/api/auth/status')
            .then(response => {
                setUser(response.data.user);
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
            })
            .finally(() => setHasStatusLoaded(true));
    }, []);

    if (!hasStatusLoaded) {
        return (
            <div className="m-5">
                <Loading />
            </div>
        );
    }

    return (
        <div id="app-wrapper">
            <Router>
                <UserContext.Provider value={{ user, setUser }}>
                    <CurrentSlugContext.Provider value={{ currentSlug, setCurrentSlug }}>
                        <ListChangedContext.Provider value={{ hasChanged, setHasChanged }}>
                            <Header />
                            <AdminNav />
                            <main className="container py-4 flex-fill bg-white main-container">
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/article/:slug" component={Article} />
                                    <ProtectedRoute exact path="/new" user={user} component={NewArticle} />
                                    <ProtectedRoute exact path="/edit/:slug" user={user} component={EditArticle} />
                                    <Route exact path="/login">
                                        {user ? <Redirect to="/" /> : <Login />}
                                    </Route>
                                    <Route exact path="/admin">
                                        {user ? <Redirect to="/" /> : <Login />}
                                    </Route>
                                    <Route component={NoMatch} />
                                </Switch>
                            </main>
                            <Footer />
                        </ListChangedContext.Provider>
                    </CurrentSlugContext.Provider>
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;
