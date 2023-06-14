import React from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';

import {HeaderInfo} from '../components/HeaderInfo';
import {SideBar} from '../components/SideBar';
import CartTable from '../components/CartTable';

const { Header, Content } = Layout;

class CartView extends React.Component {
	render() {
		return (
			<Layout className='layout'>
				<Header>
					<HeaderInfo></HeaderInfo>
				</Header>
				<Layout>
					<SideBar currKey={'2'}></SideBar>
					<Content style={{padding: '0 50px'}}>
						<CartTable></CartTable>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(CartView);
