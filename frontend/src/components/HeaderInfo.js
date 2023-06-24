import React from 'react';
import { Row, Col } from 'antd';
import { history } from '../utils/history';
import '../css/index.css';
import logo from '../assets/logo.gif';
import logoFont from '../assets/logo-name.svg';
import { UserAvatar } from './UserAvatar';
import { Timer } from './Timer';

export class HeaderInfo extends React.Component {

	render(){

		const user = JSON.parse(localStorage.getItem('user'));


		return(
			<div id="header">
				<div id="header-content">
					<Row>
						<Col span={10}>
							<a id="logo" href={'/'}>
								<img alt="logo"  className="logo" src={logo} style={{ height:45 }}/>
								<img alt="logofont"  className="logo-font" src={logoFont} style={{ height:40 }}/>
							</a>
						</Col>
						<Col span={8}>
							<Timer moment={user !=null ? user.moment : null}/>
						</Col>
						<Col span={6}>
							<UserAvatar user={user}/>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}