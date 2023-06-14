import React from 'react';
import {Table, Button, DatePicker, Divider} from 'antd';
import {SearchOutline} from '@ant-design/icons';
import {getAllOrderByTime, getOrderByTime} from "../../services/orderService";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import bigDecimal from "js-big-decimal";

const {RangePicker} = DatePicker;

class BookAnls extends React.Component {

  renderTime= date => {          //转换unix时间戳至指定格式
    let dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Book_ID',
        dataIndex: 'bookId',
        width: '20%',
        align: "center",
      },
      {
        title: 'Book_Name',
        dataIndex: 'name',
        align: "center",
        width:'40%',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        align: "center",
        width:'40%',
      },
    ];

    if(this.props.isadmin === "1") {
      this.state = {
        order:[],
        result:null,
        start_t:'0',
        end_t:'5000000000000',
        total_price:new bigDecimal(0.0),
        total_amount:0,
      };
    }
    else {
      this.state = {
        order:[],
        result:null,
        start_t:'0',
        end_t:'5000000000000',
        total_price:new bigDecimal(0.0),
        total_amount:0,
        myChart:null,
      };
    }
  }

  handleOrder = data => {
    let tmp=data;
    let len=tmp.length;
    let price=new bigDecimal(tmp[len-1].price);
    let amount=tmp[len-1].amount;

    this.setState({
      order: tmp,
      total_price:price,
      total_amount:amount,
    });

    this.onSearchByTime();
  }

  componentDidMount() {
    if(this.props.isadmin === "1")
    {
      getAllOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
    else
    {
      getOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
  }

  handleResetButton=() => {
    console.log("reset called");
    this.setState({
      start_t:'0',
      end_t:'5000000000000',
    })
    this.handle();
  }

  onChange=(data)=>{
    if(data==null || data === undefined || data.length<2) {
      return;
    }
    this.setState({
      start_t:Date.parse(data[0]._d).toString(),
      end_t:Date.parse(data[1]._d).toString(),
    })
  }

  onSearchByTime=()=>{
    if(this.state.start_t === '' || this.state.end_t === '') {
      return;
    }
    let tmp=this.state.order;
    let len=tmp.length;

    let obj=[];
    for(let i=0;i<len-1;i++) {
      obj.push({
        bookId:tmp[i].bookId,
        amount:tmp[i].amount,
        name:tmp[i].name,
      })
    }

    let result1=[];
    let tmp_len=Math.min(obj.length,10);
    for(let i=0;i<tmp_len;++i) {
      result1.push({
        value:obj[i].amount,
        name:obj[i].name,
      })
    }

    console.log("result1:");
    console.log(result1);

    this.setState({
      start_t:'',
      end_t:'',
      result:obj,
      total_price:new bigDecimal(tmp[len-1].price),
      total_amount:tmp[len-1].amount,
    })
  }

  handle=()=>{
    if(this.props.isadmin === "1") {
      getAllOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
    else {
      getOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
  }

  render() {
    console.log("want to see");
    console.log(this.state.order);
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    return (
        <div className="userorder-table">

          <div size="large" style={{marginBottom:10}}>
            <div>Order Time</div>
            <RangePicker
                // ranges={{
                //   '今天': [moment().startOf('day'), moment().endOf('day')],
                //   '本月': [moment().startOf('month'), moment().endOf('month')],
                // }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ size:'small'}}
                locale={locale}
                onChange={this.onChange}
            />
            <Button
                type="primary"
                // onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutline/>}
                style={{width: 90}}
                onClick={()=>this.handle()}
            >
              Search
            </Button>
            <Button
                onClick={this.handleResetButton}
                style={{width: 90}}
            >
              Reset
            </Button>
          </div>

          <Table
              bordered
              dataSource={this.state.result}
              columns={columns}
              rowKey="orderId"   //防止全部展开
              style={{marginTop:20}}
          />
          {/*<Divider/>*/}
          <div>
            <div style={{fontSize:16, float:"left"}}>Sold：</div>
            <div style={{fontSize:16, marginLeft:20,marginRight:20, float:"left",color:"red"}}>
              {this.state.total_amount}
            </div>
            <div style={{fontSize:16,marginLeft:10,marginTop:5}}>Book(s)</div>
          </div>
          <div style={{marginTop:16}}>
            <div style={{fontSize:16,marginTop:5,float:"left"}}>Sales：</div>
            <div style={{fontSize:16,marginTop:5,marginLeft:10,float:"left",color:"red"}}>
              ￥{this.state.total_price.round(2,bigDecimal.RoundingModes.HALF_EVEN).getValue()}
            </div>
          </div>
          <Divider style={{marginTop:20}}/>

          <div id="echart-item" style={{minHeight:500}}></div>
        </div>

    );
  }
}

export default BookAnls;

