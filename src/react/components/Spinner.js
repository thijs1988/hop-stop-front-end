import React from "react";

export class Spinner extends React.Component {
    render () {
        return (
                <div className="spinner-container">
                    <i className="fas fa-spinner fa-spin"/>
                </div>
        );
    }
}
