import React from 'react';
import {Row, Col, Divider, Layout, InputNumber, Button} from 'antd';
import '../css/home.css';
import SearchResult from '../components/SearchResult';
import { HeaderInfo } from '../components/HeaderInfo';
import { SideBar } from '../components/SideBar';

const {Header, Content} = Layout;

class SearchView extends React.Component {
	constructor(props) {
		super(props);
		let search=props.location.search;
		let params=new URLSearchParams(search);
		this.state={
			name: params.get('name'),
		};
		console.log('get name:',this.state.name);
	}

	render() {
		return (
			<Layout className="layout">
				<Header>
					<HeaderInfo></HeaderInfo>
				</Header>
				<Layout>
					<SideBar></SideBar>
					<Content style={{padding: '0 50px'}}>
						<SearchResult className="searchResult-container" name={this.state.name}/>
					</Content>
				</Layout>
            
            
			</Layout>
		);
	}
}

export default SearchView;