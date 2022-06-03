import React from "react";
import UpdateUserForm from "./UpdateUserForm";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.auth
})


class UpdateUserContainer extends React.Component {
    render() {
        const {error, success} = this.props;
        return (
            <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <UpdateUserForm />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(UpdateUserContainer);