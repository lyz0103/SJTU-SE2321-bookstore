import React from 'react';
import {Input, Button, Form, message} from 'antd';
import '../../css/bookAdd.css';
import 'antd/dist/antd.css';
import {getBookById, updateBook} from '../../services/bookService';

class BookModify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null,
            myform: null,
        };
    }

    handleBook = data => {
        this.setState({book: data});
        console.log('Before: ', data);
    }

    componentDidMount() {
        getBookById(this.props.id, this.handleBook);
        // if (this.state.myform != null && this.state.book != null) {
        //     this.state.myform.setFieldsInitialValue({
        //         name:this.state.book.name,
        //         author:this.state.book.author,
        //         price:this.state.book.price.toFixed(2),
        //         inventory:this.state.book.inventory,
        //         description:this.state.book.description,
        //         brief:this.state.book.brief,
        //         type:this.state.book.type,
        //         image:this.state.book.image,
        //         isbn:this.state.book.isbn,
        //     });
        // }
        let form = this.props.form;
        this.setState({myform: form});
    }

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('updateBook received values of form: ', values);
                let flag = true;
                for (let i in values) {
                    if (values[i] === undefined) {
                        values[i] = this.state.book[i];
                    } else {
                        flag = false;
                    }
                }
                console.log('After: ', values);
                if (flag) {
                    message.warning('No changes detected!');
                } else {
				    updateBook(values);
                    message.success('Successfully modified!');
                    window.location.href = '/admin/manage_books/list';
                }
			}
		});
	};

	onFinishFailed = (errorInfo) => {
		console.log('updateBook Failed:', errorInfo);
        message.error('Update Failed!');
	}

	// handleSubmit = (values) => {
	// 	console.log('AddBook Received values of form:', values);
	// 	addBook(values);
	// 	message.success('A new book has been added!')
	// 	// window.location.href = '/admin/manage_books/list';
	// }
    
	render() {
        if(this.state.book == null || this.state.myform == null)
			return null;
        
        const { getFieldDecorator } = this.state.myform;
        console.log(this.state.myform);
		return (
			<div className='addbook-wrapper'>
				<div className='addbook-title'>Modify Book Info</div>
				<div className="addbook-container">
					<Form
						name="addbook"
						onSubmit={this.handleSubmit}
						onFinishFailed={this.onFinishFailed}
						scrollToFirstError
						className="addbook-form"
					>
                        <Form.Item label="Book ID" hasFeedback>
							{getFieldDecorator('bookId', {
								rules: [{
									required: false,
									message: 'Please enter book name!',
									whitespace: true,
								}],
							})(
								<Input disabled='disabled' placeholder={this.state.book.bookId}/>
							)}
						</Form.Item>


						<Form.Item label="Book Name" hasFeedback>
							{getFieldDecorator('name', {
								rules: [{
									required: false,
									message: 'Please enter book name!',
									whitespace: true,
								}],
							})(
								<Input placeholder={this.state.book.name}/>
							)}
						</Form.Item>

						<Form.Item label="Author" hasFeedback>
							{getFieldDecorator('author', {
								rules: [{
									required: false,
									message: 'Please enter author name!',
									whitespace: true,
								}],
							})(
								<Input placeholder={this.state.book.author}/>
							)}
						</Form.Item>

						<Form.Item label="Price" hasFeedback>
							{getFieldDecorator('price', {
								rules: [{
									required: false,
									pattern: new RegExp(/^(([1-9]\d*)|\d)(\.\d{1,2})?$/, 'g'),
									message: 'Please enter the correct price (up to .00)!',
								}],
							})(
								<Input placeholder={this.state.book.price}/>
							)}
						</Form.Item>

						<Form.Item label="ISBN" hasFeedback>
							{getFieldDecorator('isbn', {
								rules: [{
									required: false,
									message: 'Please enter ISBN (13-digit)!',
									whitespace: true,
									pattern:new RegExp(/\d{13}$/,'g'),
								}],
							})(
								<Input placeholder={this.state.book.isbn}/>
							)}
						</Form.Item>

						<Form.Item label="Inventory" hasFeedback>
							{getFieldDecorator('inventory', {
								rules: [{
									required: false,
									message: 'Please enter a legal positive integer!',
									whitespace: true,
									pattern:new RegExp(/^[1-9]\d*$/,'g'),
								}],
							})(
								<Input placeholder={this.state.book.inventory}/>
							)}
						</Form.Item>

						<Form.Item label="Description" hasFeedback>
							{getFieldDecorator('description', {
								rules: [{
									required: false,
									message: 'Please enter book description!',
									whitespace: true,
								}],
							})(
								<Input placeholder={this.state.book.description}/>
							)}
						</Form.Item>
						
						<Form.Item label='Cover Image (Url)' hasFeedback>
							{getFieldDecorator('image', {
								rules: [{
									required: false,
									message: 'Please enter a legal Url address!',
									pattern:new RegExp(
										'^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$'),
									whitespace: true,
								}],
							})(
								<Input placeholder={this.state.book.image}/>
							)}
						</Form.Item>

						<Form.Item label='Category' hasFeedback>
							{getFieldDecorator('type', {
								rules: [{
									required: false,
									message: 'Please enter book category!',
									whitespace: true,
								}],
							})(
								<Input placeholder={this.state.book.type}/>
							)}
						</Form.Item>

						<Form.Item label='Brief Introduction' hasFeedback>
							{getFieldDecorator('brief', {
								rules: [{
									required: false,
										message: 'Please enter a brief introduction of the this.state.book!',
										whitespace: true,
								}],
							})(
								<Input placeholder={this.state.book.brief}/>
							)}
						</Form.Item>

						<Form.Item>
							<Button className='addbook-button' type="primary" block htmlType='submit'>
								Commit Changes
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
};

const WrappedBookModify = Form.create({ name: 'normal_bookModify' })(BookModify);

export default WrappedBookModify;
