import React from 'react';
import { Avatar, Dropdown, Menu} from 'antd';
import '../css/index.css';
import * as userService from '../services/userService';
import imgUrl from '../assets/favicon.jpg';

export class UserAvatar extends React.Component {

	render() {

		const {user} = this.props;

		const menu = (
			<Menu>
				<Menu.Item>
					<a href="#" onClick={userService.logout}>
                        Log Out
					</a>
				</Menu.Item>
			</Menu>
		);

		return(
			user != null ? 
				<div id="avatar">
					<span className="name">Hi, {user.username}</span>
					<Dropdown overlay={menu} placement="bottomRight">
						<Avatar src={imgUrl} style={{cursor:'pointer'}}/>
					</Dropdown>
				</div>:
				<div id="avatar">
					<span className="name">Hi, Please <a href="/login">Login</a></span>
				</div>
		);
	}
}