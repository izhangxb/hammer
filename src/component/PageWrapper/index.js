import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon} from "antd";

const {Header, Content, Sider} = Layout;

const {SubMenu} = Menu;

import './index.less'

class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: ""
        }
    }

    componentDidMount() {
        this.handleHashChange();

        window.onhashchange = ()=>{
            this.handleHashChange();
        }
    }

    handleHashChange = ()=>{
        let hash = window.location.hash;
        this.setState({
            currentPath: hash.slice(2, hash.length)
        });
    };


    componentWillUnmount() {
        window.onhashchange = null;
    }

    onMenuSelect = ({selectedKeys})=>{
        window.location.hash = selectedKeys[0]

        this.setState({
            currentPath:selectedKeys[0]
        });
    };

    render() {
        return (
            <Layout className="page-wrapper">
                <Header className="header">

                    <div className="logo">
                        <span className="logo-name">玩个锤子</span>
                    </div>

                </Header>
                <Layout className="main-wrapper">

                    <Sider className="side-wrapper" width={250}>

                        <Menu
                            defaultSelectedKeys={""}
                            className="menu"
                            inlineIndent={40}
                            onSelect={this.onMenuSelect}
                        >

                            <SubMenu key="1" title="编解码">
                                <Menu.Item
                                    key="hash"
                                    className="menu-item" >
                                    Hash算法(MD5/SHA1...)
                                </Menu.Item>

                                <Menu.Item
                                    key="aes_des"
                                    className="menu-item" >
                                    对称加解密(AES/DES)
                                </Menu.Item>

                                <Menu.Item
                                    key="rsa"
                                    className="menu-item" >
                                    非对称加解密(RSA)
                                </Menu.Item>

                                <Menu.Item
                                    key="unicode"
                                    className="menu-item" >
                                    unicode编解码
                                </Menu.Item>

                                <Menu.Item
                                    key="url"
                                    className="menu-item" >
                                    URL相关
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="2" title="JSON相关">
                                <Menu.Item
                                    key="json_format"
                                    className="menu-item" >
                                    JSON格式化
                                </Menu.Item>

                                <Menu.Item
                                    key="uglify"
                                    className="menu-item" >
                                    JSON压缩
                                </Menu.Item>

                                <Menu.Item
                                    key="json2java"
                                    className="menu-item" >
                                    JSON转Java类
                                </Menu.Item>

                                <Menu.Item
                                    key="json2csv"
                                    className="menu-item" >
                                    JSON转CSV
                                </Menu.Item>
                            </SubMenu>


                            <SubMenu key="3" title="时间相关">

                                <Menu.Item
                                    key="timestamp"
                                    className="menu-item" >
                                    时间戳
                                </Menu.Item>

                            </SubMenu>

                            <SubMenu key="4" title="二维码">
                                <Menu.Item
                                    key="qr"
                                    className="menu-item" >
                                    生成二维码
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="5" title="其他">
                                <Menu.Item
                                    key="camel"
                                    className="menu-item" >
                                    驼峰下划线转换
                                </Menu.Item>

                                <Menu.Item
                                    key="cap2samll"
                                    className="menu-item" >
                                    大小写转换
                                </Menu.Item>

                                <Menu.Item
                                    key="rgb2hex"
                                    className="menu-item" >
                                    RGB与HEX转换
                                </Menu.Item>
                            </SubMenu>
                        </Menu>



                    </Sider>

                    <Layout className="content-wrapper">

                        <Content
                            className="content" >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

PageWrapper.propTypes = {};

export default PageWrapper;
