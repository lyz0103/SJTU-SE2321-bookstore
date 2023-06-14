import React from 'react';
import {
	Input,
	Button,
	Form,
	message,
} from 'antd';
import '../../css/bookAdd.css';
import 'antd/dist/antd.css';
import {addBook} from '../../services/bookService';

class BookAdd extends React.Component {

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('AddBook received values of form: ', values);
				addBook(values);
				message.success('A new book has been created!');
				window.location.href = '/admin/manage_books/list';
			}
		});
	};

	onFinishFailed = (errorInfo) => {
		console.log('AddBook Failed:', errorInfo);
	}

	// handleSubmit = (values) => {
	// 	console.log('AddBook Received values of form:', values);
	// 	addBook(values);
	// 	message.success('A new book has been added!')
	// 	// window.location.href = '/admin/manage_books/list';
	// }

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className='addbook-wrapper'>
				<div className='addbook-title'>Add New Book</div>
				<div className="addbook-container">
					<Form
						name="addbook"
						onSubmit={this.handleSubmit}
						onFinishFailed={this.onFinishFailed}
						scrollToFirstError
						className="addbook-form"
					>

						<Form.Item label="Book Name" hasFeedback>
							{getFieldDecorator('name', {
								rules: [{
									required: true,
									message: 'Please enter book name!',
									whitespace: true,
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label="Author" hasFeedback>
							{getFieldDecorator('author', {
								rules: [{
									required: true,
									message: 'Please enter author name!',
									whitespace: true,
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label="Price" hasFeedback>
							{getFieldDecorator('price', {
								rules: [{
									required: true,
									pattern: new RegExp(/^(([1-9]\d*)|\d)(\.\d{1,2})?$/, 'g'),
									message: 'Please enter the correct price (up to .00)!',
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label="ISBN" hasFeedback>
							{getFieldDecorator('isbn', {
								rules: [{
									required: true,
									message: 'Please enter ISBN (13-digit)!',
									whitespace: true,
									pattern:new RegExp(/\d{13}$/,'g'),
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label="Inventory" hasFeedback>
							{getFieldDecorator('inventory', {
								rules: [{
									required: true,
									message: 'Please enter a legal positive integer!',
									whitespace: true,
									pattern:new RegExp(/^[1-9]\d*$/,'g'),
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label="Description" hasFeedback>
							{getFieldDecorator('description', {
								rules: [{
									required: true,
									message: 'Please enter book description!',
									whitespace: true,
								}],
							})(
								<Input/>
							)}
						</Form.Item>
						
						<Form.Item label='Cover Image (Url)' hasFeedback>
							{getFieldDecorator('image', {
								rules: [{
									required: true,
									message: 'Please enter a legal Url address!',
									pattern:new RegExp(
										'^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$'),
									whitespace: true,
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label='Category' hasFeedback>
							{getFieldDecorator('type', {
								rules: [{
									required: true,
									message: 'Please enter book category!',
									whitespace: true,
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item label='Brief Introduction' hasFeedback>
							{getFieldDecorator('brief', {
								rules: [{
									required: true,
										message: 'Please enter a brief introduction of the book!',
										whitespace: true,
								}],
							})(
								<Input/>
							)}
						</Form.Item>

						<Form.Item>
							<Button className='addbook-button' type="primary" block="true" htmlType='submit'>
								Add Book
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>

		);
	}
};

const WrappedBookAdd = Form.create({ name: 'normal_bookAdd' })(BookAdd);

export default WrappedBookAdd;
