import React, { Component, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { getInfo } from "../../api/index";
import { filterMenu } from "../../utils/menuFilter";
import { asyncRouterMap } from "../../common/routerMap";
import { loginAction, menuAction } from "../../redux/actions/login";
import { Route,NavLink } from "react-router-dom"
import { Layout, Menu } from 'antd';
import Headers from "@/components/header/Index"
import { LoadingOutlined} from '@ant-design/icons';
import style from "./style.module.css"

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


class Index extends Component {

  state = {
    menuTree: []
  }
  // 创建异步路由
  renderRoute = (menu) => {
    let routerList = [];
    const asyncRoute = (data) => {
      data.forEach((item) => {
        if (item.children) {
          asyncRoute(item.children)
        } else {
          routerList.push(
            <Route path={`/index${item.path}`} component={lazy(() => import(`@/views${item.path}/Index.jsx`))} key={item.path}></Route>
          )
        }
      })
    }
    asyncRoute(menu);
    return routerList
  }

  componentDidMount() {
    // 首次加载
    if (this.props.res.menuReducer.length) {
      const menuTree = this.renderMenu(this.props.res.menuReducer)
      this.setState({
        menuTree
      })
    } else {
      // 刷新
      getInfo().then(res => {
        const { loginAction, menuAction } = this.props;
        // 重新设置用户名和权限
        loginAction({ role: res.data.role, nickname: res.data.nickname })
        // 存储菜单数据，根据权限过滤菜单
        menuAction(filterMenu(asyncRouterMap, res.data.role));
        const menuTree = this.renderMenu(this.props.res.menuReducer);
        this.setState({
          menuTree
        })
      })
    }
  }

  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <SubMenu title={item.meta.title} key={item.path} icon={item.meta.icon}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path} icon={item.meta.icon}>
        <NavLink to={"/index"+item.path}>
          {item.meta.title}
        </NavLink>
        </Menu.Item>
    })
  }

  render() {
    const { menuReducer } = this.props.res
    return (
      <div>
        <Layout style={{ height: '100vh' }}>

          <Sider style={{ background: '#001529',height:"100vh"}}>
            <h1 className={style.title}>好学教育后台管理系统</h1>
            <Menu theme="dark">
              {this.state.menuTree}
            </Menu>;
          </Sider>

          <Layout style={{background:"f4f4f4",height:"100vh",overflow:"auto"}}>
            <Header style={{ color: '#fff' ,background:"#fff", textAlign:"right"}}>
              <Headers history={this.props.history}></Headers>
            </Header>
            <Suspense fallback={<div><LoadingOutlined />Loading...</div>}>
              <Content style={{padding:"20px"}}>
                {this.renderRoute(menuReducer)}
              </Content>
            </Suspense>
          </Layout>

        </Layout>
      </div>
    )
  }
}

export default connect(
  state => ({
    res: state
  }), {
  loginAction,
  menuAction
}
)(Index)

