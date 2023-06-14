import React from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import '../css/bookDetail.css';

import {HeaderInfo} from '../components/HeaderInfo';
import {SideBar} from '../components/SideBar';
import {getBookById} from '../services/bookService';
import {BookDetail} from '../components/BookDetail';

const { Header, Content } = Layout;

class BookView extends React.Component{
    
	constructor(props) {
		super(props);
		let search=props.location.search;
		let params=new URLSearchParams(search);
		this.state={
			id: params.get('id'),
		};
		console.log('getid:',this.state.id);
	}
    
	// componentDidMount() {
	//     let user = localStorage.getItem("user");
	//     this.setState({user:user});
        
	//     const query = this.props.location.search;
	//     const arr = query.split('&');
	//     const bookId = arr[0].substr(4);
	//     this.setState({id: bookId});
	// }

	render(){
		return(
			<Layout className="layout">

				<Header>
					<HeaderInfo />
				</Header>
				<Layout>
					<SideBar />
					<Content style={{ padding: '0 50px' }}>
						<div className="home-content">
							<BookDetail bookId={this.state.id} />

							<div className={'foot-wrapper'}>
							</div>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(BookView);