import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Col, Icon, Input, message, Row, Select, Tabs} from "antd";

const {TabPane} = Tabs;

const {TextArea} = Input;

import './index.less'

import {JSEncrypt} from 'jsencrypt';
import {copyLink} from "../../common/utils";


class RSA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pub_key: "",
            encryBeforeText: "",
            encryAfterText: "",

            pri_key: "",
            decryBeforeText: "",
            decryAfterText: "",


            currentMode: "encrypt",


        }
    }


    onSwitch = (value) => {
        this.setState({
            currentMode: value
        });
    }

    /**
     * 加密
     */
    encry = () => {
        if (!this.state.pub_key) {
            message.error("请先输入公钥");
            return;
        }

        if (this.state.encryBeforeText) {
            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.state.pub_key);
            this.setState({
                encryAfterText: encrypt.encrypt(this.state.encryBeforeText),
            });
        }
    }


    /**
     * 解密
     */
    deDecry = () => {
        if (!this.state.pri_key) {
            message.error("请先输入私钥");
            return;
        }

        if (this.state.decryBeforeText) {
            let encrypt = new JSEncrypt();
            encrypt.setPrivateKey(this.state.pri_key);
            this.setState({
                decryAfterText: encrypt.decrypt(this.state.decryBeforeText),
            });
        }
    }

    render() {
        return (

            <div className="page_rsa">
                <Title text="非对称加解密RSA"/>

                <Tabs defaultActiveKey="encrypt" onChange={this.onSwitch} tabBarGutter={10}>
                    <TabPane tab="公钥加密" key="encrypt">

                        <Row className="pri_key">
                            <Input allowClear={true} addonBefore={"公钥"}
                                   onChange={event => this.setState({
                                       pub_key: event.target.value
                                   })}/>
                        </Row>

                        <Row className="content_layout" type="flex" align="middle" gutter={10}>
                            <Col span={10}>
                                <TextArea className="area" placeholder="加密前" value={this.state.encryBeforeText}
                                          onChange={e => {
                                              this.setState({
                                                  encryBeforeText: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    copyLink(this.state.encryBeforeText)
                                }}>复制</Button>
                            </Col>

                            <Col className="operate" span={4}>
                                <Button className="btn_operate" type="primary" onClick={this.encry}>加密
                                    <Icon type="arrow-right"/>
                                </Button>
                                <Button className="copy" type="danger" onClick={e => {
                                    this.setState({
                                        encryBeforeText: "",
                                        encryAfterText: "",
                                    });
                                }}>清空 <Icon type="delete"/></Button>
                            </Col>

                            <Col span={10}>
                                <TextArea className="area" placeholder="加密后" value={this.state.encryAfterText}
                                          onChange={e => {
                                              this.setState({
                                                  encryAfterText: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    copyLink(this.state.encryAfterText)
                                }}>复制</Button>
                            </Col>

                        </Row>

                    </TabPane>


                    <TabPane tab="私钥解密" key="decrypt">

                        <Row className="pri_key">
                            <Input allowClear={true} addonBefore={"私钥"}
                                   onChange={event => this.setState({
                                       pri_key: event.target.value
                                   })}/>
                        </Row>

                        <Row className="content_layout" type="flex" align="middle" gutter={10}>
                            <Col span={10}>
                                <TextArea className="area" placeholder="解密前" value={this.state.decryBeforeText}
                                          onChange={e => {
                                              this.setState({
                                                  decryBeforeText: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    this.copyLink(this.state.decryBeforeText)
                                }}>复制</Button>
                            </Col>

                            <Col className="operate" span={4}>
                                <Button className="btn_operate" type="primary" onClick={this.deDecry}>解密
                                    <Icon type="arrow-right"/>
                                </Button>

                                <Button className="copy" type="danger" onClick={e => {
                                    this.setState({
                                        decryBeforeText: "",
                                        decryAfterText: "",
                                    });
                                }}>清空 <Icon type="delete"/></Button>
                            </Col>

                            <Col span={10}>
                                <TextArea className="area" placeholder="解密后" value={this.state.decryAfterText}
                                          onChange={e => {
                                              this.setState({
                                                  decryAfterText: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    this.copyLink(this.state.decryAfterText)
                                }}>复制</Button>
                            </Col>

                        </Row>
                    </TabPane>
                </Tabs>


            </div>

        );


    }
}

RSA.propTypes = {};

export default RSA;
