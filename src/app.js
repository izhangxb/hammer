import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';


//less
import './styles/all.less'

//pages
import Home from './page/home/index.js'
import PageWrapper from "./component/PageWrapper";
import hash from "./page/hash";
import AES_DES from "./page/aes_des";



class APP extends React.Component {
    render() {
        return (
            <HashRouter>
                <PageWrapper>

                    <Switch>
                        <Route path="/hash" component={hash} />
                        <Route path="/aes_des" component={AES_DES} />
                        <Route path="/" component={Home} />
                    </Switch>

                </PageWrapper>

            </HashRouter>
        );
    }
}


ReactDOM.render(
    <APP />,
    document.getElementById('root')
);
