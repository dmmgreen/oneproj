import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component{
    render(){
        return (
            <nav className="bar bar-tab">
                <Link to="indexList" className="tab-item" activeClassName="active">
                    <span className="icon icon-home"></span>
                    <span className="tab-label">主页</span>
                </Link>
                <Link to="create" className="tab-item" activeClassName="active">
                    <span className="icon icon-edit"></span>
                    <span className="tab-label">发表</span>
                </Link>
                <Link to="me" className="tab-item" activeClassName="active">
                    <span className="icon icon-me"></span>
                    <span className="tab-label">我</span>
                </Link>
            </nav>
        )
    }
}

export default class App extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
                <Nav />
            </div>
        )
    }
}