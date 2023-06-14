import {postRequest} from '../utils/ajax';
import config from 'config';

export function addCartItem(bookId,amount,active,callback) {
	const url=`${config.apiUrl}/addCartItem?bookId=${Number(bookId)}&amount=${Number(amount)}&active=${Boolean(active)}`;
	postRequest(url,{},callback);
}

export function setCartItem(bookId,active,callback) {
	const url=`${config.apiUrl}/setCartItem?bookId=${Number(bookId)}&active=${Boolean(active)}`;
	postRequest(url,{},callback);
}

export function deleteCartItem(bookId,callback) {
	const url=`${config.apiUrl}/deleteCartItem?bookId=${Number(bookId)}`;
	postRequest(url,{},callback);
}

export function submitCart(callback) {
	const url=`${config.apiUrl}/submitCart`;
	postRequest(url,{},callback);
}

export function getCartItems(callback) {
	const url=`${config.apiUrl}/getCartItems`;
	postRequest(url,{},callback);
}

export function  getRealCartItems(callback) {
	const url=`${config.apiUrl}/getRealCartItems`;
	postRequest(url,{},callback);
}