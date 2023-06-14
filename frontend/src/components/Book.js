import React from 'react';
import { Card } from 'antd';

import {Link} from 'react-router-dom';

// import { history } from '../utils/history';

const { Meta } = Card;

export class Book extends React.Component{


	render() {

		const {info} = this.props;

		return (
			<Link to={{
				pathname: '/bookDetails',
				search: '?id=' + info.bookId}}
			target="_blank"
			>
				<Card
					hoverable
					style={{width: 181}}
					cover={<img alt="" src={info.image} className={'bookImg'}/>}
					// onClick={history.push("/bookDetails?id=" + info.bookId)}
				>
					<Meta title={info.name} description={'¥' + info.price}/>
				</Card>
			</Link>
		);
	}

}

