import React from 'react';
import { Descriptions, Button, message } from 'antd';

import { getBookById } from '../services/bookService';
import { addCartItem } from '../services/cartService';

export class BookDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			detail: null,
			amount: 1,
		};
	}

	handleDetail = data => {
		this.setState({detail: data});
	};

	componentDidMount() {
		getBookById(this.props.bookId, this.handleDetail);
	}

	onChange_input = (value) => {
		console.log('value');
		this.setState({amount: value});
	};

	onAddCart = () => {
		if (this.props.inventory === 0)
			message.warn('This book has been sold out!');
		else {
			message
				.loading('Adding to cart...')
				.then(
					() => {
						console.log('addCartItem: ' + this.props.bookId);
						addCartItem(this.props.bookId, this.state.amount, 0);
					}
				)
				.then(
					() => { message.success('Successfully add to cart!'); }
				);
		}
	};

	onBuyNow = () => {

	};

	render() {

		if(this.state.detail==null)
			return null;
		console.log(this.state.detail);

		return (
            
			<div className={'content'}>
				<div className={'book-detail'}>
					<div className={'book-image'}><img alt="" src={this.state.detail.image} style={{width:'350px', height:'350px'}}/></div>
					<div className={'descriptions'}>
						<Descriptions>
							<Descriptions.Item className={'title'} span={3}>{this.state.detail.name}</Descriptions.Item>
							<Descriptions.Item label={'作者'} span={3}>{this.state.detail.author}</Descriptions.Item>
							<Descriptions.Item label={'分类'} span={3}>{this.state.detail.type}</Descriptions.Item>
							<Descriptions.Item label={'定价'} span={3}>{<span className={'price'}>{'¥' + this.state.detail.price}</span>}</Descriptions.Item>
							<Descriptions.Item label={'状态 '} span={3}>{this.state.detail.inventory !== 0? <span>有货 <span className={'inventory'}>库存{this.state.detail.inventory}件</span></span> : <span className={'status'}>无货</span>}</Descriptions.Item>
							<Descriptions.Item label={'作品简介'} span={3}>{this.state.detail.description}</Descriptions.Item>
						</Descriptions>
					</div>
				</div>
				<div className={'button-groups'}>
					<Button onClick={this.onAddCart} type="danger" icon="shopping-cart" size={'large'}>
                        加入购物车
					</Button>

					<Button onClick={this.onBuyNow} type="danger" icon="pay-circle" size={'large'} style={{marginLeft:'15%'}}ghost>
                        立即购买
					</Button>
				</div>
			</div>


		);

	}

}
