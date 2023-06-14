import config from 'config';
import {postRequest} from '../utils/ajax';


export const getBooks = (callback) => {
	const url = `${config.apiUrl}/getBooks`;
	postRequest(url, {}, callback);
};

export const getBookById = (id, callback) => {
	const url = `${config.apiUrl}/getBookById?id=${Number(id)}`;
	postRequest(url, {}, callback);
};

export function getBookByName(name, callback) {
	const url=`${config.apiUrl}/getBookByName?name=${name}`;
	postRequest(url, {}, callback);
}

export function addBook(data, callback) {
	const url=`${config.apiUrl}/addBook`;
	postRequest(url, data, callback);
}

export function deleteBookById(id, callback) {
	const url=`${config.apiUrl}/deleteBookById?id=${id}`;
	postRequest(url, {}, callback);
}

export function updateBook(data, callback) {
	const url=`${config.apiUrl}/updateBook`;
	postRequest(url, data, callback);
}
