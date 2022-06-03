import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../form";
import {connect} from "react-redux";
import {userRegister} from "../../actions/actions";
import {Link} from "react-router-dom";

const mapDispatchToProps = {
    userRegister
};

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {termsAccepted: false};
    }

    onSubmit(values){
        return this.props.userRegister(values.username, values.name, values.email, values.password, values.retypedPassword, parseInt(values.age), values.phoneNumber, values.postbox, values.place, values.street)
            .then(() => {
                this.props.reset();
            })
    }

    onTermsAcceptedClick(e) {
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}))
    }
    render() {
        const {handleSubmit, submitting} = this.props;

        return (
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div id="register-form" className="col-6 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field name="username" label="Username:" type="text" component={renderField}/>
                            <Field name="name" label="Name:" type="text" component={renderField}/>
                            <Field name="email" label="Email:" type="text" component={renderField}/>
                            <Field name="password" label="Password:" type="password" component={renderField}/>
                            <Field name="retypedPassword" label="Retype Password:" type="password" component={renderField}/>
                            <Field name="age" label="Age:" type="text" component={renderField}/>
                            <Field name="phoneNumber" label="Phone Number:" type="text" component={renderField}/>
                            <Field name="postbox" label="Postal Code:" type="text" component={renderField}/>
                            <Field name="place" label="Place:" type="text" component={renderField}/>
                            <Field name="street" label="Street and number:" type="text" component={renderField}/>

                            <div className="form-check form-group">
                                <input className="form-check-input" type="checkbox"
                                       value={false}
                                       onClick={this.onTermsAcceptedClick.bind(this)}
                                />
                                <label className="form-check-label">I agree to the <Link to="/terms" className="terms-link">terms & conditions</Link></label>
                            </div>

                            <button type="submit" className="btn btn-block btn-register" disabled={submitting || !this.state.termsAccepted}>Submit</button>
                        </form>
                        </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'RegisterForm'
})(connect(null, mapDispatchToProps)(RegisterForm));