import React from 'react';
import { Menu, Layout, Icon } from 'antd';
import { history } from '../../utils/history';

const { Sider } = Layout;

export class SideBarInAdmin extends React.Component {

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
		history.push('/admin/manage_books/list');
	};

	userOnClick = () => {
		history.push('/admin/manage_users/list');
	};

	orderOnClick = () => {
		history.push('/admin/manage_orders/list');
	};

	historyOnClick = () => {
		history.push('/admin/analyze_history/list');
	};

	consumeOnClick = () => {
		history.push('/admin/analyze_consumes/list');
	};

    quitOnClick = () => {
        window.location.href = '/home';
    }

	render() {
		return (
			<div style={{width:this.state.collapsed? '80px':'180px', maxWidth:this.state.collapsed? '80px':'180px', minWidth:this.state.collapsed? '80px':'180px' }}>
				<div className="mySider">
					<Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse} className="sider" style={{ background: '#fff'}}>
						<Menu defaultSelectedKeys={[this.props.currKey]} mode="inline">
							<Menu.Item key="1" onClick={this.bookOnClick}>
								<Icon type="read" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>Book Manage</span>
							</Menu.Item>
							<Menu.Item key="2" onClick={this.userOnClick}>
								<Icon type="user" style={{ fontSize: '18px'}} />
								<span style={{ fontSize: '16px'}}>User Manage</span>
							</Menu.Item>
							<Menu.Item key="3" onClick={this.orderOnClick}>
								<Icon type="check"  style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>Order Manage</span>
							</Menu.Item>
							<Menu.Item key="4" onClick={this.historyOnClick}>
								<Icon type="file-text" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>History ANLS</span>
							</Menu.Item>
							<Menu.Item key="5" onClick={this.consumeOnClick}>
								<Icon type="account-book" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>Consume ANLS</span>
							</Menu.Item>
                            <Menu.Item key="6" onClick={this.quitOnClick}>
								<Icon type="export" style={{ fontSize: '18px'}}/>
								<span style={{ fontSize: '16px'}}>User Mode</span>
							</Menu.Item>
						</Menu>
					</Sider>
				</div>
			</div>

		);
	}
}
