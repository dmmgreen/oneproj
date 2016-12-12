import React from 'react';
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router';

import App from './app';
import IndexList from './indexList';
import Create from './create';
import Login from './login';
import Me from './me'
import MyArticle from './me/myArticle';
import ArticleDetail from './articleDetail';


export default class RouteConfig extends React.Component{
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={IndexList}/>
                    <Route path='/indexList' component={IndexList}/>
                    <Route path='/create' component={Create}/>
                    <Route path='/login' component={Login} />
                    <Route path='/me' component={Me} />
                    <Route path='/myArticle' component={MyArticle} />
                    <Route path='/create/:id' component={Create} />
                    <Route path='/indexList/:id' component={ArticleDetail}/>
                </Route>
            </Router>
        )
    }
}