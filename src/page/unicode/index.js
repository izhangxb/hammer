import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from "../../component/Title";
import {Button, Col, Icon, Input, message, Row, Select} from "antd";

const {TextArea} = Input;
import copy from 'copy-to-clipboard'

import './index.less'


class Unicode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beforeText: "",
            afterText: "",
        }
    }

    copyLink = (link) => {
        copy(link);
        message.success('复制成功');
    };

    /**
     * 编码
     */
    encode = () => {
        if (this.state.beforeText) {
            this.setState({
                afterText: this.Str_Unicode(this.state.beforeText),
            });
        }
    }

    /**
     * 解码
     */
    decode = () => {
        if (this.state.afterText) {
            this.setState({
                beforeText: this.Unicode_Str(this.state.afterText),
            });
        }
    }

    Str_Unicode = (str)=>{
        let unid='\\u';
        for(let i=0,len=str.length;i<len;i++){
            if(i<len-1){
                unid+=str.charCodeAt(i).toString(16)+'\\u';
            }else if(i===len-1){
                unid+=str.charCodeAt(i).toString(16);
            }
        }
        return unid;
    }

    Unicode_Str=(unicode)=>{

        let result=[];

        let strArr=unicode.split('\\u');

        for(let i=0,len=strArr.length;i<len;i++){
            if(strArr[i]){
                result.push(string.fromCharCode(parseInt(strArr[i],16)))
            }
        }
        return result.join('');
    }

    render() {
        return (

            <div className="page_unicode">
                <Title text="中英文unicode转换"/>

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
                        <Button className="btn_operate" type="primary" onClick={this.encode}>编码
                            <Icon type="arrow-right"/>
                        </Button>
                        <Button className="btn_operate" onClick={this.decode}>解码
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

Unicode.propTypes = {};

export default Unicode;
