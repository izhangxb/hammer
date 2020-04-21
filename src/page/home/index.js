import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './index.less'
import {Button} from "antd";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">

                <img className="home_bg" src={require("../../images/home_bg.jpg")}/>
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;
