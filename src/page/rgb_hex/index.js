import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import './index.less'
import {Button, Col, Icon, Input, message, Row} from "antd";
import {copyLink} from "../../common/utils";

class Rgb2Hex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            R: "",
            G: "",
            B: "",
            hexText: "",

        }
    }

    rgb2hex = () => {
        let R = this.state.R || 0;
        let G = this.state.G || 0;
        let B = this.state.B || 0;

        let hex = "#"
        if (typeof R === "number" && typeof G === "number" && typeof B === "number") {
            hex = hex + this.doHex(R) + this.doHex(G) + this.doHex(B)
        } else {
            message.error("格式输入不规范");
        }

        this.setState({
            hexText: hex
        });
    }

     doHex = (x)=> {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    hex2rgb = () => {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

        let sColor = this.state.hexText.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }

            this.setState({
                R: sColorChange[0],
                G: sColorChange[1],
                B: sColorChange[2],
            });
        } else {
            return sColor;
        }

    }

    render() {
        return (
            <div className="page_camel">
                <Title text="RGB与HEX转化"/>

                <div className="convert_layout">

                    <Row>
                        <Col span={16}>
                            <Row type="flex" align="middle" gutter={10}>

                                <Col span={6}>
                                    <Input
                                        addonBefore="R"
                                        maxLength={3}
                                        value={this.state.R}
                                        allowClear={true}
                                        onChange={
                                            e => this.setState({R: e.target.value})
                                        }/>

                                </Col>
                                <Col span={6}>
                                    <Input
                                        addonBefore="G"
                                        value={this.state.G}
                                        maxLength={3}
                                        allowClear={true}
                                        onChange={
                                            e => this.setState({G: e.target.value})
                                        }/>

                                </Col>

                                <Col span={6}>
                                    <Input
                                        addonBefore="B"
                                        maxLength={3}
                                        value={this.state.B}
                                        allowClear={true}
                                        onChange={
                                            e => this.setState({B: e.target.value})
                                        }/>

                                </Col>


                                <Button type="link" onClick={e => {
                                    copyLink(`rgb(${this.state.R},${this.state.G},${this.state.B})`)
                                }}>复制</Button>


                            </Row>

                            <Row style={{marginTop: "20px"}} align="middle" gutter={40}>
                                <Col span={12}>
                                    <Input
                                        addonBefore="HEX"
                                        value={this.state.hexText}
                                        allowClear={true}
                                        placeholder="#cccccc"
                                        onChange={
                                            e => this.setState({hexText: e.target.value})
                                        }/>
                                </Col>

                                <Button type="link" onClick={e => {
                                    copyLink(this.state.hexText)
                                }}>复制</Button>

                            </Row>

                        </Col>

                        <Col span={8}>
                            <i className="color_demo" style={{background: this.state.hexText}}/>
                        </Col>

                    </Row>


                    <Row style={{marginTop: "20px"}}>
                        <Button type="primary" onClick={this.rgb2hex}>RGB <Icon type="arrow-right"/>HEX</Button>
                        <Button style={{marginLeft: "20px"}} onClick={this.hex2rgb}>HEX <Icon
                            type="arrow-right"/>RGB</Button>
                    </Row>

                </div>
            </div>
        );
    }
}

Rgb2Hex.propTypes = {};

export default Rgb2Hex;
