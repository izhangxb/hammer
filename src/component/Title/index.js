import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './index.less';

class Title extends Component {
    render() {
        return (
            <h1 className="component_title">{this.props.text}</h1>
        );
    }
}

Title.propTypes = {
    text: PropTypes.string
};

export default Title;
