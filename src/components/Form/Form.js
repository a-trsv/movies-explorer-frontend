import React from 'react';
import AuthFooter from '../AuthFooter/AuthFooter';
import './Form.css'

function Form(props) {
    const authFooter = (
        <>
        <AuthFooter />
        </>
    )

    const saveButtonType = `${ props.formIsValid ? '' : 'form__save-button_disabled'}`
    return (
        <section className="form__section">
            <form
                name={props.name}
                className={`form form_type_${props.name}`}
                 onSubmit={props.onSubmit}
            >
                {props.children}
                <button type="submit"className={`form__save-button ${saveButtonType}`} >{props.saveButton}</button>
            </form>
            {authFooter}
        </section>
    )
}

export default Form;