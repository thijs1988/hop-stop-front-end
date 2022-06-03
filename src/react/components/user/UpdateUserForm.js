import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../form";
import {connect} from "react-redux";
import {userProfileUpdate} from "../../actions/actions";

const mapDispatchToProps = {
    userProfileUpdate
}

class UpdateUserForm extends React.Component {
    onSubmit(values){
        const {userProfileUpdate} = this.props;
        const userId = localStorage.getItem('userId')
        userProfileUpdate(values.name, values.username, values.email, values.phoneNumber, values.street, values.place, values.postbox, values.age, userId)
    }

    render() {
        const {handleSubmit, submitting} = this.props
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div id="register-form" className="col-6 text-center">
                    <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="name" label="Name" type="text" component={renderField}/>
                        <Field name="username" label="Username" type="text" component={renderField}/>
                        <Field name="email" label="E-mail" type="email" component={renderField}/>
                        <Field name="phoneNumber" label="Phone Number" type="text" component={renderField}/>
                        <Field name="street" label="Street & Number" type="text" component={renderField}/>
                        <Field name="place" label="Place" type="text" component={renderField}/>
                        <Field name="postbox" label="Postal Code" type="text" component={renderField}/>
                        <Field name="age" label="Age" type="number" component={renderField}/>
                        <br/>
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Update</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    ...state.auth,
    initialValues: state.auth.userData,
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'UpdateUserForm'
})(UpdateUserForm));