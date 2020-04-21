import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Col, Icon, Input, message, Row, Select} from "antd";

const {TextArea} = Input;
import copy from 'copy-to-clipboard'

import './index.less'
const CryptoJS = require("crypto-js");

const MODE = [ "MD5","SHA1","SHA256","SHA512" ];
class Hash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beforeText:"",
            afterText: "",
            currentMode: "MD5"
        }
    }

    copyLink = (link)=>{
        copy(link);
        message.success('复制成功');
    };

    /**
     * 加密
     */
    encry = ()=>{
        if(this.state.beforeText){

            switch (this.state.currentMode) {
                case "MD5":
                    this.setState({
                        afterText: CryptoJS.MD5(this.state.beforeText)
                    });
                    break;
                case "SHA1":
                    this.setState({
                        afterText: CryptoJS.SHA1(this.state.beforeText)
                    });
                    break;
                case "SHA256":
                    this.setState({
                        afterText: CryptoJS.SHA256(this.state.beforeText)
                    });
                    break;
                case "SHA512":
                    this.setState({
                        afterText: CryptoJS.SHA512(this.state.beforeText)
                    });
                    break;
            }
        }
    }

    handleChange =(value)=>{
        this.setState({
            currentMode: value,
            afterText: "",
        });
    }

    render() {
        return (

            <div className="page_md5">
                <Title text="Hash算法"/>

                <Row>
                        <Select defaultValue={this.state.currentMode} style={{width:150}} onChange={this.handleChange}>
                            {
                                MODE.map(one=>
                                    <Select.Option value={one} key={one}>{one}</Select.Option>
                                )
                            }
                        </Select>
                </Row>

                <Row className="content_layout" type="flex" align="middle" gutter={10}>
                    <Col span={10}>
                        <TextArea className="area" placeholder="加密前" value={this.state.beforeText}
                            onChange={e=>{
                                this.setState({
                                    beforeText: e.target.value
                                });
                            }}/>
                        <Button className="copy" type="link" onClick={e=>{
                            this.copyLink(this.state.beforeText)
                        }}>复制</Button>

                    </Col>

                    <Col className="operate" span={4}>
                        <Button className="btn_operate" type="primary" onClick={this.encry}>加密
                            <Icon type="arrow-right"/>
                        </Button>

                        <Button className="copy" type="danger" onClick={e=>{
                            this.setState({
                                beforeText:"",
                                afterText: "",
                            });
                        }}>清空  <Icon type="delete"/></Button>
                    </Col>

                    <Col span={10}>
                        <TextArea className="area" placeholder="加密后" value={this.state.afterText}
                                  onChange={e=>{
                                      this.setState({
                                          afterText: e.target.value
                                      });
                                  }}/>
                        <Button className="copy" type="link" onClick={e=>{
                            this.copyLink(this.state.afterText)
                        }}>复制</Button>
                    </Col>

                </Row>


            </div>

        );


    }
}

Hash.propTypes = {};

export default Hash;
