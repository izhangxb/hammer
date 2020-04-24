import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Card, Col, Icon, Input, message, Row, Select, Tabs} from "antd";

const {TabPane} = Tabs;

const {TextArea} = Input;
import copy from 'copy-to-clipboard'
import './index.less'

const qs = require('qs');


class Url extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originUrl: "",
            encodeUrl: "",

            inputUrl: "",
            qsParam: {},
            hashParam: {}

        }
    }

    copyLink = (link) => {
        copy(link);
        message.success('复制成功');
    };

    onSwitch = (value) => {
        this.setState({
            currentMode: value
        });
    }

    encode = () => {
        this.setState({
            encodeUrl: encodeURIComponent(this.state.originUrl),
        });
    }

    decode = () => {
        this.setState({
            originUrl: decodeURIComponent(this.state.encodeUrl),
        });
    }

    getParam = () => {
        let str = this.state.inputUrl;
        let url;
        try {
            url = new URL(str);

            //query部分
            let queryStr = url.search;
            this.setState({
                qsParam: qs.parse(queryStr, {ignoreQueryPrefix: true}),
            });

            //hash部分
            let hashStr = url.hash;
            if (hashStr.indexOf('?') > -1) {
                this.setState({
                    hashParam: qs.parse(hashStr.substring(hashStr.indexOf('?') + 1))
                });
            }
        } catch (e) {
            message.error("url格式不正确")
        }

    }

    render() {
        return (
            <div className="page_url">
                <Title text="URL相关"/>

                <Tabs defaultActiveKey="encode_decode" onChange={this.onSwitch} tabBarGutter={10}>
                    <TabPane tab="url编解码" key="encode_decode">

                        <Row className="content_layout" type="flex" align="middle" gutter={10}>
                            <Col span={10}>
                                <TextArea className="area" placeholder="原始URL" value={this.state.originUrl}
                                          onChange={e => {
                                              this.setState({
                                                  originUrl: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    this.copyLink(this.state.originUrl)
                                }}>复制</Button>
                            </Col>

                            <Col className="operate" span={4}>
                                <Button className="btn_operate" type="primary" onClick={this.encode}>编码
                                    <Icon type="arrow-right"/>
                                </Button>

                                <Button className="btn_operate" onClick={this.decode}>解码
                                    <Icon type="arrow-left"/>
                                </Button>

                                <Button className="copy" type="danger" onClick={e => {
                                    this.setState({
                                        originUrl: "",
                                        encodeUrl: "",
                                    });
                                }}>清空 <Icon type="delete"/></Button>
                            </Col>

                            <Col span={10}>
                                <TextArea className="area" placeholder="encode后的URL" value={this.state.encodeUrl}
                                          onChange={e => {
                                              this.setState({
                                                  encodeUrl: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    this.copyLink(this.state.encodeUrl)
                                }}>复制</Button>
                            </Col>

                        </Row>

                    </TabPane>

                    <TabPane tab="解析url参数" key="getParam">

                        <Row className="content_layout" type="flex" align="top" gutter={10}>
                            <Col span={10}>
                                <TextArea className="area" placeholder="带解析的URL" value={this.state.inputUrl}
                                          onChange={e => {
                                              this.setState({
                                                  inputUrl: e.target.value
                                              });
                                          }}/>
                                <Button className="copy" type="link" onClick={e => {
                                    this.copyLink(this.state.inputUrl)
                                }}>复制</Button>

                                <Button className="copy" type="link" style={{color: "#ff7875"}} onClick={e => {
                                    this.setState({
                                        inputUrl: "",
                                    });
                                }}>清空</Button>
                            </Col>

                            <Col className="operate2" span={4}>
                                <Button className="btn_operate" type="primary" onClick={this.getParam}>获取参数
                                </Button>
                            </Col>

                            <Col span={10}>

                                <div className="qs_area">
                                    <Card title="query部分"
                                          extra={<a onClick={event => this.copyLink(JSON.stringify(this.state.qsParam))}>Copy</a>}
                                          hoverable>
                                        {
                                            Object.keys(this.state.qsParam).map(item=>
                                                <p key={item}>{item}:{this.state.qsParam[item]}</p>
                                            )
                                        }
                                    </Card>
                                </div>
                                <div className="hash_area">
                                    <Card title="hash部分"
                                          extra={<a onClick={event => this.copyLink(JSON.stringify(this.state.hashParam))}>Copy</a>}
                                          hoverable>
                                        {
                                            Object.keys(this.state.hashParam).map(item=>
                                                <p key={item}>{item}:{this.state.hashParam[item]}</p>
                                            )
                                        }
                                    </Card>
                                </div>

                            </Col>

                        </Row>
                    </TabPane>
                </Tabs>


            </div>
        );
    }
}

Url.propTypes = {};

export default Url;
