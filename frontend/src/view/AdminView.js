import React from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';

import {HeaderInfo} from '../components/HeaderInfo';
import {SideBarInAdmin} from '../components/AdminPage/SideBarInAdmin';
import BookManage from '../components/AdminPage/BookManage';
import WrappedBookAdd from '../components/AdminPage/BookAdd';
import WrappedBookModify from '../components/AdminPage/BookModify';
import UserManage from '../components/AdminPage/UserManage';
import OrderManage from '../components/AdminPage/OrderManage';
import UserAnls from '../components/AdminPage/UserAnls';
import BookAnls from '../components/AdminPage/BookAnls';

const { Header, Content } = Layout;

class AdminView extends React.Component {

	render() {
		let key = '1';
		const renderContent = () => {
			if (this.props.match.params.type === 'manage_books') {
				console.log(this.props.match.params.action);
				if (this.props.match.params.action === 'list') {
					return ( <BookManage></BookManage> );
				} else if (this.props.match.params.action === 'add') {
					return ( <WrappedBookAdd></WrappedBookAdd> );
				} else {
					return null;
				}
			} else if (this.props.match.params.type === 'modify_book') {
				let id = this.props.match.params.action;
				return ( <WrappedBookModify id={id}></WrappedBookModify> );
			} else if (this.props.match.params.type === 'manage_users') {
				key = '2';
				return ( <UserManage></UserManage> );
			} else if (this.props.match.params.type === 'manage_orders') {
				key = '3';
				return ( <OrderManage isadmin={'1'}></OrderManage> );
			} else if (this.props.match.params.type === 'analyze_history') {
				key = '4';
				return ( <UserAnls></UserAnls> );
			} else if (this.props.match.params.type === 'analyze_consumes') {
				key = '5';
				return ( <BookAnls isadmin={'1'}></BookAnls> );
			} else {
				key = '6';
				return null;
			}
		}
		return(
			<Layout className='layout'>
				<Header>
					<HeaderInfo></HeaderInfo>
				</Header>
				<Layout>
					<SideBarInAdmin currKey={key}></SideBarInAdmin>
					<Content style={{padding: '0 50px'}}>
						{renderContent()}
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(AdminView);
