import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { DownOutlined, UserOutlined, HomeOutlined,BellOutlined} from '@ant-design/icons';
import { loginAction, menuAction } from '../../redux/actions/login';
import { Badge } from 'antd';

class Index extends Component {
    logOut = () => {
        // 清除token
        sessionStorage.clear();
        // 清除个人信息
        this.props.loginAction({ role: "", nickname: "" });
        // 清除菜单数据
        this.props.menuAction([]);
        // 跳转
        this.props.history.push("/login")
    }
    render() {
        const { nickname } = this.props.res.loginReducer;

        const menu = (
            <Menu>
                <Menu.Item icon={<UserOutlined />} key="a">
                    <NavLink to="/index/personal" >
                        个人中心
                    </NavLink>
                </Menu.Item>
                <Menu.Item icon={<HomeOutlined />} onClick={this.logOut}>
                    退出登录
                </Menu.Item>
            </Menu>
        );


        return (
            <div>
                <Badge count={5} >
                    <BellOutlined style={{fontSize:"30px"}}/>
                </Badge>

                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link' onClick={e => e.preventDefault()} style={{margin:"0 0 0 10px"}}>
                        欢迎你，{nickname} <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        )
    }
}

export default connect(
    state => ({
        res: state
    }),
    {
        loginAction,
        menuAction
    }
)(Index)
