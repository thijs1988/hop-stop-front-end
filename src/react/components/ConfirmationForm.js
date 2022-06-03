import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../form";
import {connect} from "react-redux";
import {userConfirm} from "../actions/actions";
import {Message} from "./Message";

const mapDispatchToProps = {
    userConfirm
};

class ConfirmationForm extends React.Component {
    onSubmit(values){
        return this.props.userConfirm(values.confirmationToken)
            .then(() => {
                this.props.reset();
            })
    }
    render() {
        const {handleSubmit, submitting, error} = this.props;
        return (
            <div className="container confirmation-form">
                <div className="d-flex justify-content-center">
                    <div id="register-form" className="col-6 text-center">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="confirmationToken" label="Please confirm your account with token you received in e-mail, Confirmation token:"
                               type="text" component={renderField}/>

                        <button type="submit" className="btn btn-block"
                                disabled={submitting}>
                            Confirm your account!
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'ConfirmationForm'
})(connect(null, mapDispatchToProps)(ConfirmationForm));