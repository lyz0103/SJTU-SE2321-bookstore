import React from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Button, message} from 'antd';
import '../css/orderTable.css';
import { HeaderInfo } from '../components/HeaderInfo';
import OrderTable from '../components/OrderTable';
import {submitCart} from '../services/cartService';
import {SideBar} from '../components/SideBar';

const { Header, Content } = Layout;

class OrderView extends React.Component {

	render() {
		return (
			<div className="layout">
				<Header>
					<HeaderInfo></HeaderInfo>
				</Header>
				<Content>
					{/*<Divider style={{marginTop: 40}}/>*/}
					<Layout className="bookview-layout">
						<SideBar currKey={'3'}/>
						<div className="ordercontent-container">
							<div className="order-title">Confirm Your Order</div>
							<div className="order-content">
								<div className="order-table">
									<OrderTable/>
                                    
								</div>
							</div>
						</div>
					</Layout>
				</Content>
			</div>
		);
	}
}

export default withRouter(OrderView);