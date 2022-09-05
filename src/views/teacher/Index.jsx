import React, { Component } from 'react'
import { Button, Card, Form, Input, Select,Row,Col,Table, Pagination,message} from "antd"
import { getTeacherList,deletes,batchDelete } from '../../api/teacher';
import AddModal from './AddModal';
import moment from 'moment';

const { Option } = Select;

export default class Index extends Component {
  formRef = React.createRef();

  state={
    disabled:true,
    data:[],
    pageData:{
      page:1,
      pageSize:10
    },
    total:0,
    loading:false,
    visible:false,
    record:{},
    title:"",
    selectedRowKeys:[]
  }

  edit=(record)=>{
    this.setState({
      record,
      visible:true,
      title:"编辑教师"
    },function(){
      this.myRef.formRef.setFieldsValue(
        {...record,birth:moment(record.birth),date:moment(record.date)}
      )
    })
  }

  componentDidMount(){
    this.loadData()
  }

  loadData=()=>{
    this.setState({
      loading:true
    })

    const formData = this.formRef.current.getFieldsValue(true)
    getTeacherList({...this.state.pageData,...formData}).then(res=>{
      this.setState({
        data:res.data,
        loading:false,
        total:res.total
      })
    })
  }  

  search=()=>{
    const formData = this.formRef.current.getFieldsValue(true);
    this.setState({
      formData
    },function(){
      this.loadData()
    })
  }

  reset=()=>{
    // 清空表单数据
    this.formRef.current.resetFields()
    // 重置分页数据
    this.setState({
      pageData:{
        page:1,
        pageSize:10
      },
      formData:{}
    })
    // 加载数据
    this.loadData()
  }

  showModal=()=>{
    this.setState({
      visible:true,
      title:"新增教师"
    })
    this.myRef.formRef.resetFields()
  }

  changeVisible=(visible)=>{
    this.setState({
      visible
    })
  }

  pageChange=(page,pageSize)=>{
    this.setState({
      pageData:{
        page,
        pageSize
      }
    },function(){
      this.loadData()
    })
  }

  deletes=(id)=>{
    deletes({id}).then(res=>{
      if(res.code===0){
        message.success(res.msg);
        // 更新数据
        this.loadData()
      }
    })
  }

  selectChange=(selectedRowKeys)=>{
    this.setState({
      selectedRowKeys,
      disabled:selectedRowKeys.length?false:true
    })
  }

  batchDelete=()=>{
    batchDelete({ids:this.state.selectedRowKeys}).then(res=>{
      if(res.code===0){
        message.success(res.msg);
        // 更新数据
        this.loadData()
      }
    })
  }

  render() {
    const columns =[
      {
        title:"序号",
        dataIndex:"index",
        key:"index",
        align:"center",
        render:(text,record,index)=>index+1,
        width:60
      },
      {
        title:"姓名",
        dataIndex:"name",
        key:"name",
        align:"center",
        width:70
      },
      {
        title:"性别",
        dataIndex:"gender",
        key:"gender",
        align:"center",
        render:(text)=>text===1?"男":"女",
        width:70
      },
      {
        title:"级别",
        dataIndex:"level",
        key:"level",
        align:"center",
        render:(text)=>{
          if(text===1){
            return "初级教师"
          }else if(text===2){
            return "中级教师"
          }else if(text===3){
            return "高级教师"
          }else{
            return "特级教师"
          }
        }
      },
      {
        title:"年级",
        dataIndex:"grade",
        key:"grade",
        align:"center",
        width:70
      },
      {
        title:"科目",
        dataIndex:"subject",
        key:"subject",
        align:"center"
      },
      {
        title:"入职日期",
        dataIndex:"date",
        key:"date",
        align:"center"
      },
      {
        title:"类型",
        dataIndex:"type",
        key:"type",
        align:"center",
        render:(text)=>text==="1"?"全职":"兼职",
        width:70
      },
      {
        title:"手机号码",
        dataIndex:"tel",
        key:"tel",
        align:"center"
      },
      {
        title:"毕业院校",
        dataIndex:"school",
        key:"school",
        align:"center"
      },
      {
        title:"出生年月",
        dataIndex:"birth",
        key:"birth",
        align:"center"
      },
      {
        title:"家庭住址",
        dataIndex:"address",
        key:"address",
        align:"center"
      },
      {
        title:"学历",
        dataIndex:"education",
        key:"education",
        align:"center"
      },
      {
        title:"操作",
        dataIndex:"operation",
        key:"operation",
        fixed:"right",
        align:"center",
        render:(text,record)=>{
          return <div>
              <Button type="primary" size="small" onClick={()=>this.edit(record)}>编辑</Button>
              <Button type="danger" size="small" className='ml' onClick={()=>this.deletes(record.id)}>删除</Button>
          </div>
        }
      }
    ];
    const {disabled,data,loading,visible,total,record,title, selectedRowKeys}=this.state
    return (
      <div>
        <Card>
          <Form ref={this.formRef} name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="姓名" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="科目" name="subject">
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="手机号" name="tel">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button type='primary' onClick={this.search}>搜索</Button>
                <Button className='ml' onClick={this.reset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className='mt'>
          <Button type='primary' onClick={this.showModal}>新增教师</Button>
          <Button type='danger' disabled={disabled} className='ml' onClick={this.batchDelete}>批量删除</Button>
        </Card>
        <Card className='mt'>
          <Table 
            columns={columns} 
            dataSource={data} 
            scroll={{x:1200}} 
            rowKey={(record)=>record.id} 
            loading={loading} 
            pagination={false} 
            rowSelection={{
              type: "checkbox",
              selectedRowKeys:selectedRowKeys,
              onChange:this.selectChange
            }}
          />
          <Pagination size="small" total={total} showSizeChanger showQuickJumper onChange={this.pageChange}/>
        </Card>
        <AddModal
          ref={a=>this.myRef=a}
          visible={visible}
          changeVisible={this.changeVisible}
          reload={this.loadData}
          record={record}
          title={title}
        />
      </div>
    )
  }
}


