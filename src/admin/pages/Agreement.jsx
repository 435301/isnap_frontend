import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/admin/images/logo.png';

const Agreement = () => {
    const [isAccepted, setIsAccepted] = useState(false);

    const handleCheckboxChange = () => {
        setIsAccepted(!isAccepted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAccepted) {
            alert("You must accept the agreement to proceed.");
        } else {
            alert("Form submitted successfully!");
            // You can add your actual submission logic here
        }
    };

    return (
        <div>
            <div className="container-fluid bg-white">
                <div className="row">
                    <div className="col-lg-12 text-center py-3">
                        <img src={logo} alt="Logo" className="" width="150" />

                    </div>
                </div>
            </div>

            <div className="container-fluid bg-white mt-3 py-3">
                <div className="row px-4">
                    <div className="col-lg-12">
                        <h3 className="text-dark mb-4">Agreement / MOU</h3>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing softwarelike Aldus PageMaker including versions of Lorem Ipsum.</p>

                        <p>By placing an order or creating an account on this eCommerce platform, I confirm that I have carefully read, fully understood, and unconditionally agree to abide by the Terms and Conditions set forth by the company. I acknowledge that these terms govern all aspects of my interaction with the platform, including but not limited to account registration, product browsing, order placement, payment processing, delivery, returns, cancellations, and the use of promotional offers or discount codes. I understand and accept that prices, availability, and product specifications may be subject to change without prior notice, and that all transactions are subject to final verification and approval. I agree to use the platform in compliance with applicable laws and not engage in any activity that may harm the website, its services, or other users. I also consent to the collection and use of my personal data as outlined in the Privacy Policy, and I accept that any misuse of the services may lead to suspension or termination of my account. My continued use of the website shall be deemed as ongoing acceptance of any updated terms and policies.</p>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing softwarelike Aldus PageMaker including versions of Lorem Ipsum.</p>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing softwarelike Aldus PageMaker including versions of Lorem Ipsum.</p>

                        {/* Checkbox */}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="service1"
                                checked={isAccepted}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label text-dark" htmlFor="service1">
                                I Accept
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-12 text-center mt-4">
                        <button
                            type="submit"
                            className="btn btn-success px-5 me-2"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agreement;
