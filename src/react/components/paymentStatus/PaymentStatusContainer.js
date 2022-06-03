import React from "react";
import {connect} from "react-redux";
import {fetchPaymentDetails} from "../../actions/paymentActions";
import PaymentStatus from "./PaymentStatus";
import {Spinner} from "../Spinner";

const mapStateToProps = state => ({
    ...state.payment
})

const mapDispatchToProps = {
    fetchPaymentDetails
}

class PaymentStatusContainer extends React.Component {
    componentDidMount() {
        const {fetchPaymentDetails} = this.props;
        fetchPaymentDetails(this.props.match.params.id)
    }

    render() {
        const {payment, isFetching} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        return (
            <PaymentStatus payment={payment}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatusContainer);