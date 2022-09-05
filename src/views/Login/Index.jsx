import React, { Component } from 'react'
import style from "./index.module.css"
import { Card, Tabs, Form, Input, Button } from 'antd';
import {login} from '../../api/index'
import {connect} from "react-redux"
import {loginAction,menuAction} from "../../redux/actions/login"
import {asyncRouterMap} from "../../common/routerMap";
import {filterMenu} from "../../utils/menuFilter"

const { TabPane } = Tabs;

class Index extends Component {
    login=()=>{
        const {loginAction,menuAction,history} = this.props;
        this.formRef.validateFields().then(res=>{
            // 表单校验通过
            login(res).then((res)=>{
                // 存储token
                sessionStorage.setItem("token",res.token)
                // 用户的权限和昵称
                loginAction({
                    role:res.role,
                    nickname:res.nickname
                })
                // 直接筛选出每个角色所对应的菜单项，并且加入redux
                menuAction(filterMenu(asyncRouterMap,res.role))
                
                history.push("/index/home")

                // 跳转功能
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            // 表单校验不通过
            console.log(err)
        })
    }

    render() {
        return (
            <div className={style.wrap}>
                <Card title="周兴教育后台管理系统"
                    headStyle={{ textAlign: "center" }}
                    style={{ width: 500 }}
                    bordered={false}>

                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="手机号密码登录" key="1">
                            <Form
                                ref={(a)=>this.formRef=a}
                                name="basic"
                                labelCol={{span: 0}}
                                wrapperCol={{ span: 24 }}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: '用户名不能为空' },
                                        {pattern:/^\w{4,8}$|^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,message:"请输入的正确的手机号"},
                                    ]}
                                >
                                    <Input placeholder='请输入您的账号'/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: '密码不能为空' },
                                    ]}
                                >
                                    <Input.Password placeholder='请输入您的密码'/>
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit" style={{width:"100%"}} onClick={this.login}>
                                        立即登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="新用户注册" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>

                </Card>
            </div>
        )
    }
}

export default connect(
    state=>({
        res:state
    }),
    {
        loginAction,
        menuAction
    }
)(Index)
