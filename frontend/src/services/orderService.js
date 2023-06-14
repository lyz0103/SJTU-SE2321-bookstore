import config from 'config';
import {postRequest} from '../utils/ajax';

export function getOrder(callback) {
	const url=`${config.apiUrl}/getOrder`;
	postRequest(url, {}, callback);
}

export function getAllOrder(callback) {
	const url=`${config.apiUrl}/getAllOrder`;
	postRequest(url, {}, callback);
}

export function getOrderItemById(orderId, callback) {
	const url=`${config.apiUrl}/getOrderItemById?orderId=${orderId}`;
	postRequest(url, {}, callback);
}

export function getOrderByTime(t1, t2, callback) {
	const url=`${config.apiUrl}/getOrderByTime?t1=${t1}&t2=${t2}`;
	postRequest(url, {}, callback);
}

export function getAllOrderByTime(t1, t2, callback) {
	const url=`${config.apiUrl}/getAllOrderByTime?t1=${t1}&t2=${t2}`;
	postRequest(url, {}, callback);
}