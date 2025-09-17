import React from "react";
import css from '../assets/admin/css/style.css'

const cardData = [
    { title: "Total Clients", value: 2562, icon: "bi-people-fill", color: "bg-success" },
    { title: "Total Team", value: 25000, icon: "bi-grid-3x3-gap-fill", color: "bg-primary" },
    { title: "Total Task", value: 25000, icon: "bi-grid-3x3-gap-fill", color: "bg-warning" },
    { title: " Task In Progress", value: 25000, icon: "bi-grid-3x3-gap-fill", color: "bg-teal" },
    { title: " Completed Task", value: 25000, icon: "bi-grid-3x3-gap-fill", color: "bg-danger" },

    { title: "Total Invoice Amount", value: "₹3,58,000", icon: "bi-file-earmark-text-fill", color: "bg-warning" },
    { title: "Total Invoice Paid Amount", value: "₹1,58,000", icon: "bi-grid-3x3-gap-fill", color: "bg-teal" },
    { title: "Total Invoice Balance", value: "₹2,00,000", icon: "bi-grid-3x3-gap-fill", color: "bg-primary" }
];

const DashboardCards = () => (
    <div className="row g-3 dasboard mb-3 me-2">
        {cardData.map((card, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
                <div className="card px-3 py-4 pe-0 mb-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-2">{card.value}</h5>
                            <small className="text-muted pe-0">{card.title}</small>
                        </div>
                        <div className={`icon-circle ${card.color} ms-3 me-3`}>
                            <i className={`bi ${card.icon} text-white fs-4`}></i>
                        </div>
                    </div>
                </div>
            </div>

        ))}
    </div>
);

export default DashboardCards;
