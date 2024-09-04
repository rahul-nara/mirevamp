import React, { useState } from "react";

function ContactForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const contactFormInputHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (formErrors[name]) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    }

    const contactFormSubmitHandler = (e) => {
        e.preventDefault();
        const errors = {};
        const phoneRegex = /^\d+$/;
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone Number is required';
        } else if(!phoneRegex.test(formData.phone)){
            errors.phone = 'Phone Number should contain only numbers';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }
        if (Object.keys(errors).length === 0) {
            setShowSuccessMessage(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
            setFormErrors({});
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } else {
            setFormErrors(errors);
        }
    }

    return (
        <div className="contactform">
            <form onSubmit={contactFormSubmitHandler}>
                <div className="form-group">
                    <input type="text" id="name" name="name" value={formData.name} onChange={contactFormInputHandler} placeholder="" className="cnt-input" />
                    <label htmlFor="name">Name*</label>
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                    <input type="text" id="email" name="email" value={formData.email} onChange={contactFormInputHandler} placeholder="" className="cnt-input" />
                    <label htmlFor="email">Email ID*</label>
                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                </div>
                <div className="form-group">
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={contactFormInputHandler} placeholder="" className="cnt-input" />
                    <label htmlFor="phone">Phone*</label>
                    {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                </div>
                <div className="form-group-mess">
                    <textarea name="message" id="message" rows={4} cols={25} value={formData.message} onChange={contactFormInputHandler} className="cnt-input" />
                    <label htmlFor="message">Message</label>
                    {formErrors.message && <span className="error">{formErrors.message}</span>}
                </div>
                <div className="form-group-btn">
                    <button type="submit" className="sub-btn">Submit</button>
                </div>
                {showSuccessMessage && (
                    <div className="success-message">Form submitted successfully!</div>
                )}
            </form>
        </div>
    );
}

export default ContactForm;