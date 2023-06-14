import React from 'react';
import { Menu, Layout, Icon} from 'antd';
import {history} from '../utils/history';

const { Sider } = Layout;

export class SideBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
		};
	}

	onCollapse = collapsed => {
		// if(collapsed){

		// }
		console.log(collapsed);
		this.setState({ collapsed });
	};

	bookOnClick = () => {
		history.push('/home');
	};

	cartOnClick = () => {
		history.push('/cart');
	};

	orderOnClick = () => {
		history.push('/order');
	};

	historyOnClick = () => {
		history.push('/history');
	};

	adminOnClick = () => {
		history.push('/admin/manage_books/list');
	};

	render() {
		return (
			<div style={{width:this.state.collapsed? '80px':'180px', maxWidth:this.state.collapsed? '80px':'180px', minWidth:this.state.collapsed? '80px':'180px' }}>
				<div className="mySider">
					<Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse} className="sider" style={{ background: '#fff'}}>
						<Menu defaultSelectedKeys={[this.props.currKey]} mode="inline">
							<Menu.Item key="1" onClick={this.bookOnClick}>
								<Icon type="home" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>Home</span>
							</Menu.Item>
							<Menu.Item key="2" onClick={this.cartOnClick}>
								<Icon type="shopping-cart" style={{ fontSize: '18px'}} />
								<span style={{ fontSize: '16px'}}>My Cart</span>
							</Menu.Item>
							<Menu.Item key="3" onClick={this.orderOnClick}>
								<Icon type="check"  style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>Confirm Order</span>
							</Menu.Item>
							<Menu.Item key="4" onClick={this.historyOnClick}>
								<Icon type="read" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>History Orders</span>
							</Menu.Item>
							<Menu.Item key="5" onClick={this.adminOnClick}>
								<Icon type="user" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>Admin Mode</span>
							</Menu.Item>
						</Menu>
					</Sider>
				</div>
			</div>

		);
	}
}
