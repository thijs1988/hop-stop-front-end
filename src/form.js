import React from "react";
import classNames from "classnames";

export const renderField = ({input, max, min, step, label, classname, placeholder, type, meta: {error}}) => {
    const classes = classNames(
        'form-control',
        {
            'is-invalid': error
        }
    );

    return (
        <div className="form-group">
            {label !== null && label !== '' && <label>{label}</label>}
            {classname === 'validate' && <input {...input} type={type} step={step} placeholder={placeholder} max={max} min={min} className={classname}/>}
            {classname === 'search-input' && <input {...input} type={type} placeholder={placeholder} max={max} min={min} className={classname}/>}
            {type === 'number' && classname == null && <input {...input} type={type} max={max} min={min} className={classes}/>}
            {type !== 'textarea' && type !== 'number' && classname == null && <input {...input} type={type} className={classes}/>}
            {type === 'textarea' && <textarea {...input} className={classes}/>}
            {error && <small className="form-text text-danger">{error}</small>}
        </div>
    )
}