import React from "react";

const CurrencyField = props => {
    const getPrice = (value) => {
        props.getSwapPrice(value)
    }

    return (
        <div className="currency-container">
            <p className = "text-left pl-3">{ props.tokenName === "ETH" ? "I have": "I Want"}</p>
            <div className="row currencyInput">
                <div className="col-md-6 numberContainer">
                    {props.loading ? (
                        <div className="spinnerContainer">
                            <props.spinner />
                        </div>
                    ) : (
                        <input
                            className="currencyInputField"
                            placeholder="0.0"
                            value={props.value}
                            onBlur={(e) => (props.field === "input" ? getPrice(e.target.value) : null)}
                        />
                    )}
                </div>
                <div className="col-md-6 tokenContainer">
                    <span className="tokenName">{props.tokenName}</span>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-between w-100 px-3">
                    <div className="pull-left">Balance: </div>
                    <div className="pull-right">{props.balance?.toFixed(3)}</div>
                </div>
            </div>
        </div>
    )
}

export default CurrencyField;