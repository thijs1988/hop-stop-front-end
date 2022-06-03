import React from "react";

export class Message extends React.Component {
    render () {
        const {message} = this.props;

        return (
            <div className="container">
                <div className="d-flex justify-content-center message-container">
                    <div className="col-6 text-center message-block">
                        {message}
                    </div>
                </div>
            </div>
        );
    }
}