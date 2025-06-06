import React, { useState } from "react";
import "./Contact.css";
import Toast from "../services/ContactToast";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
};

const MAX_MESSAGE_LENGTH = 1000;

const Contact = () => {
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState({ loading: false });
    const [toast, setToast] = useState({ message: "", type: "success" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true });

        try {
            const res = await fetch("https://api.aaditjain.in/api/v1/contact/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                setToast({ message: data.message, type: "success", gif: data.responseObject || null });
                setForm(initialState);
            } else {
                const gif = data.responseObject?.gif || null;
                const errorMsg = data.responseObject?.error || data.message || "Failed to send message.";
                setToast({ message: errorMsg, type: "error", gif });
            }
        } catch (err) {
            setToast({ message: "Network error. Please try again.", type: "error", gif: null });
        }
        setStatus({ loading: false });
        setTimeout(() => setToast({ message: "" }), 6000);
    };


    return (
        <section className="contact-section" id="contact">
            <Toast
                message={toast.message}
                type={toast.type}
                gif={toast.gif}
                onClose={() => setToast({ message: "" })}
            />
            <h2>Contact Me</h2>
            <h2>Hit me up! I promise I don't bite XD.</h2>
            <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="contact-form-columns">
                    <div className="contact-form-fields">
                        <div className="input-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={form.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="contact-form-message">
                        
                        <textarea
                            name="message"
                            placeholder="Your message..."
                            value={form.message}
                            onChange={handleChange}
                            required
                            maxLength={MAX_MESSAGE_LENGTH}
                        />
                        <div className="char-counter">
                            {form.message.length}/{MAX_MESSAGE_LENGTH}
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={status.loading}>
                    {status.loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </section>
    );
};


export default Contact;
