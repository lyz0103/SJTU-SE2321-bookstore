import React from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import 'antd/dist/antd.css';
import '../css/register.css';
import * as userService from '../services/userService';


class RegisterForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				userService.register(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="reg-form">
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, whitespace: false, message: 'Please input your password!' }],
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input your E-mail Address!' }],
					})(
						<Input
							prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="E-mail Address"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input your nickname!' }],
					})(
						<Input
							prefix={<Icon type="question" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Nickname"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="reg-form-button">
                        Sign in
					</Button>
                    Or <a href="../login">Back to login</a>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm);

export default WrappedRegisterForm;
