import React, { Component } from 'react'
import { Card, Col, Row, Calendar, Badge, Avatar, List } from 'antd';
import style from "./style.module.css"
import { connect } from 'react-redux'

 class Index extends Component {

  getListData = (value) => {
    let listData;

    switch (value.date()) {
      case 8:
        listData = [
          {
            type: 'warning',
            content: '王皓的妈妈约回访',
          },
          {
            type: 'success',
            content: '刘立签合同',
          },
        ];
        break;

      case 10:
        listData = [
          {
            type: 'warning',
            content: '写月度总结',
          },
          {
            type: 'success',
            content: '发工资',
          },
          {
            type: 'error',
            content: '例会',
          },
        ];
        break;

      case 15:
        listData = [
          {
            type: 'warning',
            content: '还房贷',
          },
          {
            type: 'success',
            content: '下午去北京出差',
          },
          {
            type: 'error',
            content: '去财务报销发票',
          },
          {
            type: 'error',
            content: '招聘，新人培训',
          },
          {
            type: 'error',
            content: '技术部的例会',
          },
          {
            type: 'error',
            content: '销售部例会',
          },
        ];
        break;

      default:
    }

    return listData || [];
  };

  getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  dateCellRender = (value) => {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  time=()=>{
    const date = new Date();
    const h = date.getHours();
    if (h <= 11) {
      return "上午好";
    } else if (h <= 13) {
      return "中午好";
    } else if (h <= 18) {
      return "下午好";
    } else {
      return "晚上好";
    }
  }

  render() {
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];

    const { nickname } = this.props.res.loginReducer;

    return (
      <div>
        <Card>
          <Row>
            <Col span={8}>
              <p className={style.welcome}>{this.time()}，{nickname}，欢迎进入个人中心</p>
              <p>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>
            </Col>
            <Col span={8} offset={8} className={style.todo}>
              <div>
                <span className={style.items}>转化学员数</span>
                <p className={style.count}>56</p>
              </div>
              <div>
                <span className={style.items}>团队排名</span>
                <p className={style.count}>5/23</p>
              </div>
              <div style={{border:"none"}}>
                <span className={style.items}>本月目标</span>
                <p className={style.count}>2,345</p>
              </div>
            </Col>
          </Row>
        </Card>

        <Card className="mt">
          <div className={style.contents}>
            <div className={style.info}>
              <span className={style.info_span}>我的代办</span>
              <p className={style.info_p}>8个任务</p>
            </div>
            <div className={style.info}>
              <span className={style.info_span}>本周任务平均处理时间</span>
              <p className={style.info_p}>30分钟</p>
            </div>
            <div className={style.info}>
              <span className={style.info_span}>本周对接学员数</span>
              <p className={style.info_p}>33个</p>
            </div>
          </div>
        </Card>

        <Row gutter={16} className="mt">
          <Col span={18}>
            <Card>
              <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="操作面板">
              <Card.Grid className={style.gridStyle}>操作一</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作二</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作三</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作四</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作五</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作六</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作七</Card.Grid>
              <Card.Grid className={style.gridStyle}>操作八</Card.Grid>
            </Card>
            <Card className="mt">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({
      res: state
  }),

)(Index)