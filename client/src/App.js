import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Article from './pages/article/article';
import EditArticle from './pages/editArticle/editArticle';
import NewArticle from './pages/newArticle/newArticle';
import NoMatch from './pages/noMatch/noMatch';

import './css/my_style.css';
import './css/styles.css';
import './css/markdown_styles.css';

import ListChangedContext from './context/listChangedContext';

function App() {
    const [hasChanged, setHasChanged] = useState(true);

    return (
        <Router>
            <ListChangedContext.Provider value={{ hasChanged, setHasChanged }}>
                <Header />
                <div className="container py-4 flex-fill bg-white border border-dark">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/article/:slug" component={Article} />
                        <Route exact path="/new" component={NewArticle} />
                        <Route exact path="/edit/:slug" component={EditArticle} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
                <Footer />
            </ListChangedContext.Provider>
        </Router>
    );
}

export default App;
