import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import './index.less'
import {Button, Col, Icon, Input, Row} from "antd";
import {copyLink} from "../../common/utils";
class Camel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camelText:"",
            underlineText: "",
        }
    }

    camelToUnderline = ()=>{
        this.setState({
            underlineText: this.state.camelText.replace(/([A-Z])/g,"_$1").toLowerCase()
        });
    }

    underlineTocamel = ()=>{
        let underText = this.state.underlineText.replace(/\_(\w)/g, function(all, letter){
            return letter.toUpperCase();
        });
        this.setState({
            camelText: underText
        });
    }

    render() {
        return (
            <div className="page_camel">
                <Title text="驼峰下划线转换"/>

                <div className="convert_layout">

                    <Row>

                        <Col span={6}>
                            <Input
                                addonBefore="驼峰法"
                                value={this.state.camelText}
                                   allowClear={true}
                                   onChange={
                                       e => this.setState({camelText: e.target.value})
                                   }/>
                        </Col>

                        <Button type="link" onClick={e => {
                            copyLink(this.state.camelText)
                        }}>复制</Button>

                    </Row>

                    <Row style={{marginTop: "20px"}}>
                        <Col span={6}>
                            <Input
                                addonBefore="下划线"
                                value={this.state.underlineText}
                                    allowClear={true}
                                    onChange={
                                        e => this.setState({underlineText: e.target.value})
                                    }/>
                        </Col>

                        <Button type="link" onClick={e => {
                            copyLink(this.state.underlineText)
                        }}>复制</Button>

                    </Row>

                    <Row  style={{marginTop: "20px"}}>
                        <Button type="primary" onClick={this.camelToUnderline}>驼峰  <Icon type="arrow-right"/>下划线</Button>
                        <Button style={{marginLeft: "20px"}} onClick={this.underlineTocamel}>下划线  <Icon type="arrow-right"/>驼峰</Button>
                    </Row>

                </div>
            </div>
        );
    }
}

Camel.propTypes = {};

export default Camel;
