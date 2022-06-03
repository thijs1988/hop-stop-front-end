import React from "react";
import {connect} from "react-redux";
import UpdatePasswordForm from "./UpdatePasswordForm";
import {userPasswordUpdate} from "../../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = {
    userPasswordUpdate
}

class UpdateUserContainer extends React.Component {
    onSubmit(values){
        const {userPasswordUpdate, reset} = this.props;
        const userId = localStorage.getItem('userId')
        userPasswordUpdate(values, userId).then(reset)
    }

    render() {
        const {error, success} = this.props;
        return (
            <div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
            <UpdatePasswordForm onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserContainer);