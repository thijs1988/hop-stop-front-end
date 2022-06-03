import React from "react";

export class LoadMore extends React.Component{
    render() {
        const {label, disabled, onClick} = this.props;
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="col-10">
                    <button id="load-more-button" className="btn btn-block btn-dark" disabled={disabled} onClick={onClick}>
                        {label}
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}