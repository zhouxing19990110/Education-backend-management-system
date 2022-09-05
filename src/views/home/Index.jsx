import React, { Component } from 'react'
import { Card, Tabs, Col, Row } from 'antd';
import style from "./style.module.css"
import * as echarts from 'echarts';
import { Timeline } from 'antd';
import { InfoCircleOutlined,CaretUpOutlined,CaretDownOutlined} from '@ant-design/icons';

const { TabPane } = Tabs;

export default class Index extends Component {

  state = {
    xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    yData: [200, 500, 430, 440, 220, 1200, 800, 380, 200, 850, 370, 790],
    xData1: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    yData1: [200, 500, 430, 440, 220, 1200, 800, 380, 200, 850, 370, 790],
    list: [
      { cont: "王刚结算了一门课程", time: "操作时间 2022-08-08", color: "green" },
      { cont: "王刚新增了一名学员", time: "操作时间 2022-08-08", color: "green" },
      { cont: "李梦如删除了排课记录", time: "操作时间 2022-08-08", color: "red" },
      { cont: "王丽丽审批了一笔订单", time: "操作时间 2022-08-08", color: "blue" },
      { cont: "刘小浩登陆了系统", time: "操作时间 2022-08-08", color: "gray" },
      { cont: "王志登录了系统", time: "操作时间 2022-08-08", color: "gray" }
    ]
  }

  componentDidMount() {
    this.drawBar();
    this.drawPie();
  }

  // 绘制柱形图
  drawBar = () => {
    var myChart = echarts.init(this.myRef);
    myChart.setOption({
      title: {
        text: '各月销售额'
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.state.yData
        }
      ],
      color:"#75aff9"
    })
  }
  // 折线图
  drawLine = () => {
    var myChart = echarts.init(this.myRef2);
    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: this.state.xData1
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: this.state.yData1
        }
      ]
    })

  }
  // 饼图
  drawPie = () => {
    var myChart = echarts.init(this.myRef3);
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '语文' },
            { value: 735, name: '数学' },
            { value: 580, name: '英语' },
            { value: 484, name: '物理' },
            { value: 300, name: '化学' },
            { value: 400, name: '生物'}
          ]
        }
      ]
    })
  }

  callback = (activeKey) =>{
    if(activeKey === 2){

      setTimeout(()=>{
        this.drawLine()
      },0)
    }
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <div className={style.title}>
                <p>总销售额</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>¥ 1526,560</p>

              <div >
                <span>周同比 12%</span>
                <CaretUpOutlined style={{color:"red"}}/>
                <span className={style.ml}>日同比 18%</span>
                <CaretDownOutlined style={{color:"green"}}/>
              </div>

              <div className={style.day}>日销售额￥122,423</div>
            </Card>
          </Col>
          <Col span={6}>
          <Card>
              <div className={style.title}>
                <p>访问量</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>1128</p>

              <div >
                <span>周同比 12%</span>
                <CaretUpOutlined style={{color:"red"}}/>
                <span className={style.ml}>日同比 18%</span>
                <CaretDownOutlined style={{color:"green"}}/>
              </div>

              <div className={style.day}>日均访问量78</div>
            </Card>
          </Col>
          <Col span={6}>
          <Card>
              <div className={style.title}>
                <p>支付笔数</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>337</p>

              <div >
                <span>周同比 3%</span>
                <CaretUpOutlined style={{color:"red"}}/>
                <span className={style.ml}>日同比 12%</span>
                <CaretDownOutlined style={{color:"green"}}/>
              </div>

              <div className={style.day}>转化率74%</div>
          </Card>
          </Col>
          <Col span={6}>
          <Card>
              <div className={style.title}>
                <p>流失学员</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>52</p>

              <div >
                <span>周同比 4%</span>
                <CaretUpOutlined style={{color:"red"}}/>
                <span className={style.ml}>日同比 8%</span>
                <CaretUpOutlined style={{color:"red"}}/>
              </div>

              <div className={style.day}>流失最多科目：英语</div>
            </Card>
          </Col>
        </Row> 

        <Card className="mt">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="销售额" key="1">
              <Row>
                <Col span={16}>
                  <div className={style.panel} ref={a => this.myRef = a} key="11"></div>
                </Col>
                <Col span={8}></Col>
              </Row>
            </TabPane>
            <TabPane tab="访问量" key="2" forceRender={true}>
              <Row>
                <Col span={16}>
                  <div className={style.panel} ref={a => this.myRef2 = a} key="22"></div>
                </Col>
                <Col span={8}></Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>

        <Row gutter={16} className="mt">
          <Col span={12}>
            <Card title="操作动态">
              <Timeline>
                {
                  this.state.list.map((item, index) => {
                    return (
                      <Timeline.Item color={item.color} key={index}>
                        <p className={style.mb}>{item.cont}</p>
                        <p className={style.mb}>{item.time}</p>
                      </Timeline.Item>
                    )
                  })
                }
              </Timeline>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="销售额类别占比">
              <div className={style.panel} ref={a => this.myRef3 = a}></div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

