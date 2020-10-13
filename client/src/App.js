import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Article from './pages/article/article';
import EditArticle from './pages/editArticle/editArticle';
import NoMatch from './pages/noMatch/noMatch';

import './css/my_style.css';
import './css/styles.css';
import './css/markdown_styles.css';

function App() {
    return (
        <Router>
            <Header />
            <div className="container flex-fill bg-white border border-dark">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/article/:slug" component={Article} />
                    <Route exact path="/edit/:slug" component={EditArticle} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
