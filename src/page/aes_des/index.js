import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Col, Icon, Input, message, Row, Select} from "antd";

const {TextArea} = Input;
import copy from 'copy-to-clipboard'

import './index.less'

const CryptoJS = require("crypto-js");

const MODE = ["AES", "DES"];

class AES_DES extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beforeText: "",
            afterText: "",
            currentMode: "AES",

            pri_key: "",
        }


    }

    copyLink = (link) => {
        copy(link);
        message.success('复制成功');
    };


    handleChange = (value) => {
        this.setState({
            currentMode: value,
            beforeText: "",
            afterText: "",
        });
    }

    /**
     * 加密
     */
    encry = () => {
        if (!this.state.pri_key) {
            message.error("请先输入密钥");
            return;
        }

        if (this.state.beforeText) {
            switch (this.state.currentMode) {
                case "AES":
                    this.setState({
                        afterText: CryptoJS.AES.encrypt(this.state.beforeText, this.state.pri_key).toString(),
                    });
                    break;
                case "DES":
                    this.setState({
                        afterText: CryptoJS.DES.encrypt(this.state.beforeText, this.state.pri_key).toString(),
                    });
                    break;
            }
        }
    }

    /**
     * 解密
     */
    deEncry = () => {
        if (!this.state.pri_key) {
            message.error("请先输入密钥");
            return;
        }

        if (this.state.afterText) {
            switch (this.state.currentMode) {
                case "AES":
                    this.setState({
                        beforeText: CryptoJS.AES.decrypt(this.state.afterText, this.state.pri_key).toString(CryptoJS.enc.Utf8),
                    });
                    break;
                case "DES":
                    this.setState({
                        beforeText: CryptoJS.DES.decrypt(this.state.afterText, this.state.pri_key).toString(CryptoJS.enc.Utf8),
                    });
                    break;
            }
        }
    }

    render() {
        return (

            <div className="page_aes_des">
                <Title text="对称加解密"/>

                <Row>
                    <Select defaultValue={this.state.currentMode} style={{width: 150}} onChange={this.handleChange}>
                        {
                            MODE.map(one =>
                                <Select.Option value={one} key={one}>{one}</Select.Option>
                            )
                        }
                    </Select>
                </Row>

                <Row className="pri_key">
                    <Input allowClear={true} addonBefore={"密钥"}
                           onChange={event => this.setState({
                               pri_key: event.target.value
                           })}/>
                </Row>

                <Row className="content_layout" type="flex" align="middle" gutter={10}>
                    <Col span={10}>
                        <TextArea className="area" placeholder="加密前" value={this.state.beforeText}
                                  onChange={e => {
                                      this.setState({
                                          beforeText: e.target.value
                                      });
                                  }}/>
                        <Button className="copy" type="link" onClick={e => {
                            this.copyLink(this.state.beforeText)
                        }}>复制</Button>
                    </Col>

                    <Col className="operate" span={4}>
                        <Button className="btn_operate" type="primary" onClick={this.encry}>加密
                            <Icon type="arrow-right"/>
                        </Button>
                        <Button className="btn_operate" onClick={this.deEncry}>解密
                            <Icon type="arrow-left"/>
                        </Button>

                        <Button className="copy" type="danger" onClick={e => {
                            this.setState({
                                beforeText: "",
                                afterText: "",
                            });
                        }}>清空 <Icon type="delete"/></Button>
                    </Col>

                    <Col span={10}>
                        <TextArea className="area" placeholder="加密后" value={this.state.afterText}
                                  onChange={e => {
                                      this.setState({
                                          afterText: e.target.value
                                      });
                                  }}/>
                        <Button className="copy" type="link" onClick={e => {
                            this.copyLink(this.state.afterText)
                        }}>复制</Button>
                    </Col>

                </Row>


            </div>

        );


    }
}

AES_DES.propTypes = {};

export default AES_DES;
