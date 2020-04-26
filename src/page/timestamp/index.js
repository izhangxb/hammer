import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Card, Col, Input, Row, Select} from "antd";

import {copyLink} from "../../common/utils";

import './index.less';

/**
 * 时间戳转换
 */


class TimeStamp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: "",
            currentTimeStamp: "",

            timeStamp1: "",
            time1: "",
            mode1: "S",


            timeStamp2: "",
            time2: "",
            mode2: "S",
        }

        this.timer = "";

        this.selectBefore1 = (
            <Select defaultValue="S" style={{width: 90}}
                    onSelect={
                        value => this.setState({
                            mode1: value
                        })
                    }>
                <Select.Option value="S">S</Select.Option>
                <Select.Option value="MS">MS</Select.Option>
            </Select>
        );

        this.selectBefore2 = (
            <Select defaultValue="S" style={{width: 90}}
                    onSelect={
                        value => this.setState({
                            mode2: value
                        })
                    }>
                <Select.Option value="S">S</Select.Option>
                <Select.Option value="MS">MS</Select.Option>
            </Select>
        );
    }

    componentDidMount() {
        this.getCurrentTime();
    }

    getCurrentTime = () => {
        this.timer = setInterval(() => {
            let date = new Date();
            this.setState({
                currentTime: date.toLocaleString(),
                currentTimeStamp: parseInt(date.getTime() / 1000),
            });
        }, 1000)
    }


    componentWillUnmount() {
        this.timer = "";
    }

    stamp2time = () => {
        let date = new Date(this.state.mode1 === "S" ? parseInt(this.state.timeStamp1) * 1000 : parseInt(this.state.timeStamp1));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        let result = Y + M + D + h + m + s;
        this.setState({
            time1: result
        });
    }

    time2stamp = () => {
        let date = new Date(this.state.time2);
        this.setState({
            timeStamp2: this.state.mode2==="S" ? parseInt(date.getTime()/1000) : date.getTime()
        });
    }

    render() {
        return (
            <div className="page_timestamp">
                <Title text="时间戳"/>
                <Row className="content_layout" type="flex" align="middle" gutter={10}>

                    <Col span={10}>
                        <Card title={"当前时间："}>
                            <div>
                                <span>{this.state.currentTime}</span>
                                <Button type="link" onClick={e => copyLink(this.state.currentTime)}>copy</Button>
                            </div>

                            <div>
                                <span>{this.state.currentTimeStamp}</span>
                                <Button type="link" onClick={e => copyLink(this.state.currentTimeStamp)}>copy</Button>
                            </div>
                        </Card>

                    </Col>
                </Row>


                <div className="convert_layout">

                    <p className="title">时间戳 to Time</p>

                    <Row >

                        <Col span={8}>
                            <Input addonBefore={this.selectBefore1} value={this.state.timeStamp1}
                                   allowClear={true}
                                   onChange={
                                       e => this.setState({timeStamp1: e.target.value})
                                   }/>
                        </Col>

                        <Col span={3} style={{textAlign: "center"}}>
                            <Button type="primary" onClick={this.stamp2time}>转换</Button>
                        </Col>

                        <Col span={8}>
                            <Input value={this.state.time1}
                                   placeholder={"YYYY-MM-dd HH:MM:SS"}
                                   allowClear={true}
                                   onChange={
                                       e => this.setState({time1: e.target.value})
                                   }/>
                        </Col>

                    </Row>

                    <p className="title">Time to 时间戳</p>

                    <Row >
                        <Col span={8}>
                            <Input value={this.state.time2}
                                   placeholder={"YYYY-MM-dd HH:MM:SS"}
                                   allowClear={true}
                                   onChange={
                                       e => this.setState({time2: e.target.value})
                                   }/>
                        </Col>

                        <Col span={3} style={{textAlign: "center"}}>
                            <Button type="primary" onClick={this.time2stamp}>转换</Button>
                        </Col>

                        <Col span={8}>
                            <Input addonBefore={this.selectBefore2}
                                   value={this.state.timeStamp2}
                                   allowClear={true}
                                   onChange={
                                       e => this.setState({timeStamp2: e.target.value})
                                   }
                            />
                        </Col>

                    </Row>

                </div>

            </div>
        );
    }
}

TimeStamp.propTypes = {};

export default TimeStamp;
