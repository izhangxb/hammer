import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Card, Col, Icon, Input, message, Row, Select} from "antd";
import QRCode from 'qrcode.react';

const {TextArea} = Input;

import './index.less'
import {copyLink} from "../../common/utils";

class QR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrString: ""
        }
    }


    downQRCode = ()=>{
        let canvas = document.getElementsByTagName("canvas")[0];
        if(canvas){
            let a = document.createElement("a");
            a.href = canvas.toDataURL();
            a.download = "客官，您要的二维码";
            a.click();
        }
    }


    render() {
        return (
            <div className="page_QR">
                <Title text="二维码生成"/>

                <Row className="content_layout" type="flex" align="middle" gutter={10}>
                    <Col span={10}>
                        <TextArea className="area" placeholder="加密前" value={this.state.qrString}
                                  onChange={e => {
                                      this.setState({
                                          qrString: e.target.value
                                      });
                                  }}/>
                        <Button className="copy" type="link" onClick={e => {
                            copyLink(this.state.qrString)
                        }}>复制</Button>
                    </Col>

                    <Col className="operate" span={4}>
                        <Button className="copy" type="danger" onClick={e => {
                            this.setState({
                                qrString: "",
                            });
                        }}>清空 <Icon type="delete"/></Button>
                    </Col>

                    <Col span={10}>
                        <Card title="二维码"
                              className="qr_card"
                              hoverable>
                            <QRCode value={this.state.qrString} size={200} renderAs={'canvas'}/>
                        </Card>
                        <Button className="copy" type="link" onClick={this.downQRCode}>下载</Button>
                    </Col>
                </Row>

            </div>
        );
    }
}

QR.propTypes = {};

export default QR;
