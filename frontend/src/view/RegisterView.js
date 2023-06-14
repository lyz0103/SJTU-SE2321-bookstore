import React from 'react';
import WrappedRegisterForm from '../components/RegisterForm';
// import {withRouter} from "react-router-dom";


class RegisterView extends React.Component{


	render(){
		return(
			<div className="reg-page">
				<div className="reg-container">
					<div className="reg-box">
						<h1 className="page-title">Register</h1>
						<div className="reg-content">
							<WrappedRegisterForm />
						</div>
					</div>
				</div>
			</div>
		);

	}
}

export default RegisterView;