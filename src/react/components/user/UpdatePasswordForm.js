import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../form";

class UpdatePasswordForm extends React.Component{
    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="container">
                <div id="login-form" className="d-flex justify-content-center">
                    <div className="col-6 text-center">
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <Field name="oldPassword" label="Old Password" type="password" component={renderField}/>
                            <Field name="newPassword" label="New Password" type="password" component={renderField}/>
                            <Field name="newRetypedPassword" label="New Retyped Password" type="password" component={renderField}/>
                            <br/>
                            <button type="submit" className="btn btn-primary btn-big btn-block">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'UpdatePasswordForm'
})(UpdatePasswordForm);