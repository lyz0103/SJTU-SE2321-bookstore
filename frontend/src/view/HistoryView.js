import React from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';

import {HeaderInfo} from '../components/HeaderInfo';
import {SideBar} from '../components/SideBar';
import {HistoryDetail} from '../components/HistoryDetail';

const { Header, Content } = Layout;

class HistoryView extends React.Component {
	render() {
		return (
			<Layout className='layout'>
				<Header>
					<HeaderInfo></HeaderInfo>
				</Header>
				<Layout>
					<SideBar currKey={'4'}></SideBar>
					<Content style={{padding: '0 50px'}}>
						<HistoryDetail></HistoryDetail>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(HistoryView);
