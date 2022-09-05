import React, { Component } from 'react'
import "./App.css"
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import Home from "./views/Layout/Index"
import Login from "./views/Login/Index"
import { authLogin } from './utils/auth'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'

export default class App extends Component {
  render() {
    return (
      <div>
        <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>

            <Route path="/" exact render={(props)=>{
              return <Redirect to="/login"></Redirect>
            }}></Route>

            <Route path="/index" render={(props)=>{
              // 如果没有登录，就进入登录页；如果登录了，就进入主页
              if(!authLogin()){
                return <Redirect to="/login"></Redirect>
                // return <Login {...props}></Login>
              }
              return <Home {...props}></Home>
            }}></Route>

            <Route path="/login" render={(props)=>{
              // 如果登录了
              if(authLogin()){
                return <Redirect to="/index/home"></Redirect>
              }
              return <Login {...props}></Login>
            }}></Route>

          </Switch>
        </Router>
        </ConfigProvider>
      </div>
    )
  }
}

