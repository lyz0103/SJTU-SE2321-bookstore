import config from 'config';
import {postRequest} from '../utils/ajax';
import {history} from '../utils/history';
import {message} from 'antd';


export const login = (data) => {
	const url = `${config.apiUrl}/login`;
	const callback = (data) => {
		if(data.status >= 0) {
			localStorage.setItem('user', JSON.stringify(data.data));
			history.push('/home');
			message.success(data.message);
		}
		else{
			message.error(data.message);
		}
	};
	postRequest(url, data, callback);
};

export const logout = () => {
	const url = `${config.apiUrl}/logout`;

	const callback = (data) => {
		if(data.status > 0) {
			localStorage.removeItem('user');
			history.push('/login');
			message.success(data.message);
		}
		else{
			history.push('/login');
			message.error(data.message);
		}
	};
	postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
	const url = `${config.apiUrl}/checkSession`;
	postRequest(url, {}, callback);
};

export function register(data) {
	const callback = data => {
		if (data.status > 0) {
			localStorage.setItem('user', JSON.stringify(data.data));
			history.push('/login');
			history.go(0);
			message.success(data.message);
		} else {
			message.error(data.message);
		}
	};
	const url = `${config.apiUrl}/register`;
	postRequest(url, data, callback);
}

export function getAllUsers(callback) {
	const url=`${config.apiUrl}/getAllUsers`;
	postRequest(url, {}, callback);
}

export async function registerCheck(username, callback) {
	const url = `${config.apiUrl}/registerCheck?username=${username}`;
	return new Promise(resolve => {postRequest(url, {}, callback)});
}

export function updateUserStatus(userId, enabled, callback) {
	const url=`${config.apiUrl}/updateUserStatus?userId=${Number(userId)}&enabled=${Boolean(enabled)}`;
	postRequest(url, {}, callback);
}
