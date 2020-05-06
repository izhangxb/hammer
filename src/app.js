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
import RSA from "./page/rsa";
import Unicode from "./page/unicode";
import Url from "./page/url";
import QRCode from "./page/QRcode";
import Timestamp from "./page/timestamp";
import JsonFormat from "./page/jsonFormat";


class APP extends React.Component {
    render() {
        return (
            <HashRouter>
                <PageWrapper>

                    <Switch>
                        <Route path="/hash" component={hash} />
                        <Route path="/aes_des" component={AES_DES} />
                        <Route path="/rsa" component={RSA} />
                        <Route path="/unicode" component={Unicode} />
                        <Route path="/url" component={Url} />
                        <Route path="/qr" component={QRCode} />
                        <Route path="/timestamp" component={Timestamp} />
                        <Route path="/json_format" component={JsonFormat} />
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
