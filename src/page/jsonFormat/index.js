import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Col, Icon, Input, message, Row, Select} from "antd";
const {TextArea} = Input;

import './index.less';
import Title from "../../component/Title";
import ReactJson from 'react-json-view'
import QRCode from "qrcode.react";

class JsonFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beforeText: "",
            afterText: {},
        }
    }



    doFormat = ()=>{
        let result = "";
        try{
            result = JSON.parse(this.state.beforeText);
            console.log(result)
            this.setState({
                afterText: result
            });
        }catch (e) {
            message.error("json格式不正确")
        }

    }

    render() {
        return (
            <div className="page_json_format">
                <Title text="Json格式化"/>

                <Row className="content_layout" type="flex" align="middle" gutter={10}>
                    <Col span={10}>
                        <TextArea className="area" placeholder="骚年，亮出你的json" value={this.state.beforeText}
                                  onChange={e => {
                                      this.setState({
                                          beforeText: e.target.value
                                      });
                                  }}/>
                    </Col>

                    <Col className="operate" span={4}>
                        <Button className="btn_operate" type="primary" onClick={this.doFormat}>格式化
                            <Icon type="arrow-right"/>
                        </Button>

                        <Button className="clear" type="danger" onClick={e => {
                            this.setState({
                                beforeText: "",
                                afterText: "",
                            });
                        }}>清空 <Icon type="delete"/></Button>
                    </Col>

                    <Col span={10}>
                        <Card className="json_card"
                              >
                            <ReactJson style={{height:"350px"}}
                                       src={this.state.afterText}
                                       theme="base02"
                                       collapsed={1}
                                       name = {null}/>
                        </Card>

                    </Col>
                </Row>

            </div>
        );
    }
}

JsonFormat.propTypes = {};

export default JsonFormat;
