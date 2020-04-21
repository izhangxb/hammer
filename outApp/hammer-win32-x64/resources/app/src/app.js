import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';


//less
// import './styles/all.less'

//pages
import Home from './page/home/index.js'



class APP extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </HashRouter>
        );
    }
}


ReactDOM.render(
    <APP />,
    document.getElementById('root')
);
