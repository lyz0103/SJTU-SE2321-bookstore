import React from 'react';
import {Table, Button} from 'antd';
import {
	getCartItems,
	deleteCartItem,
	setCartItem
} from '../services/cartService';
import '../css/cartTable.css';

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
	{
		title: 'Operation',
		dataIndex: 'operation'
	}
];


class CartTable extends React.Component {
	state = {
		selectedRowKeys: [],
		loading: false,
		cart:[],
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

	handleDelete(data, event) {
		console.log(data);
		deleteCartItem(data);
		this.setState({data: data});
		window.location.reload();
	}

	handleCartItems = data => {
		console.log('handleCartItems:');
		console.log(data);
		let tmp=[];
		for(let i in data)
		{
			tmp.push(
				{
					id: i,
					name: data[i].book.name,
					price: data[i].book.price.toFixed(2),
					number: data[i].amount,
					total: (data[i].book.price*data[i].amount).toFixed(2),
					operation: <a onClick={this.handleDelete.bind(this,data[i].bookId)}>Delete</a>,
					bookId: data[i].bookId,
				}
			);
		}
		this.setState({
			cart:tmp,
		});
	};


	onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({selectedRowKeys});
        
	};

	handleClick = (e) => {
		for(let i in this.state.cart) {
			if(this.state.selectedRowKeys.includes(i))
			{
				console.log('setCartItem: '+this.state.cart[i].bookId+' 1');
				setCartItem(this.state.cart[i].bookId,1);
			}
			else
			{
				console.log('setCartItem: '+this.state.cart[i].bookId+' 0');
				setCartItem(this.state.cart[i].bookId,0);
			}
		}
		window.location.href='/order';
	};

	componentDidMount() {
		getCartItems(this.handleCartItems);
	}


	render() {
		const {loading, selectedRowKeys} = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;
		console.log('cart=',this.state.cart);
		return (
			<div className="carttable-container">
				<Table rowSelection={rowSelection} columns={columns} rowKey={record=>record.id} dataSource={this.state.cart}>
				</Table>
				<div className="cartfoot-container" style={{marginBottom: 16}}>
					<span style={{marginLeft: 8}} className="cartspan-container">
						{hasSelected ?
							(<span>
                        Selected
								<span className="cart-totalcount"> {selectedRowKeys.length}</span>
                        items
							</span>)
							: ''}
					</span>
					<Button
						type="primary"
						className="cartbutton-container"
						onClick={this.handleClick}
						disabled={!hasSelected}
						loading={loading}
					>
                		Checkout
					</Button>
				</div>
			</div>
		);
	}
}

export default CartTable;