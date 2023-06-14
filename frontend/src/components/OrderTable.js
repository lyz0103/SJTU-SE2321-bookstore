import React from 'react';
import {Table, Button, message} from 'antd';
import {history} from '../utils/history';
import {getRealCartItems, submitCart} from '../services/cartService';
import '../css/orderTable.css';

const columns = [
	{
		title: 'Book',
		dataIndex: 'name',
	},
	{
		title: 'Price',
		dataIndex: 'price',
	},
	{
		title: 'Quantity',
		dataIndex: 'number',
	},
	{
		title: 'Total',
		dataIndex: 'total'
	},
];

class OrderTable extends React.Component {
	state = {
		selectedRowKeys: [],
		loading: false,
		item: [],
		amount: 0,
		items: 0,
	};

	start = () => {
		this.setState({loading: true});
		setTimeout(() => {
			this.setState({
				selectedRowKeys: [],
				loading: false,
			});
		}, 1000);
	};

	handleSubmit = () => {
		// console.log('handleSubmit Order');
		// submitCart();
		// message.success('Successfully checkout!');
		// window.location.href='/home';
		message
			.loading('Processing Order...')
			.then(
				() => {
					submitCart();
				}
			)
			.then(
				() => {
					message.success('Order Complete!');
					history.push('/home');
				}
			);
	};

	handleCartItems = data => {
		console.log('handleCartItems:');
		console.log(data);
		let tmp=[];
		for(let i in data) {
			tmp.push({
				id: i,
				name: data[i].book.name,
				price: data[i].book.price.toFixed(2),
				number: data[i].amount,
				total: (data[i].book.price*data[i].amount).toFixed(2),
				bookId: data[i].bookId,
			});
			this.setState({
				amount: this.state.amount + Number(data[i].book.price.toFixed(2)),
				items: this.state.items + data[i].amount
			});
		}
		this.setState({item: tmp});
	};
	componentDidMount() {
		getRealCartItems(this.handleCartItems);
	}

	render() {

		return (
			<div className="ordertable-container">
				<Table columns={columns} dataSource={this.state.item}/>
				<div className="orderfoot-container" style={{marginBottom: 16}}>
					<span className="ordertotal-container">
                        Total: ￥
						<span className="order-totalcount"> {this.state.amount} </span>
					</span>
					{this.state.item.length ?
						(<span className="orderspan-container">
							All
							<span className="order-totalcount"> {this.state.items} </span>
                            items
						</span>) :
						''}
					<Button type="primary" className="orderbutton-container" onClick={this.handleSubmit}> 
                        Pay the Bill
					</Button>
				</div>
			</div>
		);
	}
}

export default OrderTable;