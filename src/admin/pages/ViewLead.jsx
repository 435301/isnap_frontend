import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BASE_URL from '../../config/config';
import getAuthHeaders from '../../utils/auth';

const LeadView = () => {
    const { id } = useParams(); 
    const [lead, setLead] = useState(null);
    console.log('lead', lead)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth >= 992) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await fetch(`${BASE_URL}/lead/${id}`, getAuthHeaders());
                const data = await response.json();
                setLead(data);
            } catch (error) {
                console.error("Failed to fetch lead:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchLead();
    }, [id]);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div
                className="content flex-grow-1"
                style={{
                    marginLeft:
                        windowWidth >= 992
                            ? isSidebarOpen
                                ? 259
                                : 95
                            : isSidebarOpen
                                ? 220
                                : 0,
                    transition: 'margin-left 0.3s ease',
                }}
            >
                <Navbar onToggleSidebar={handleToggleSidebar} />

                <div className="container-fluid px-4 pt-3">
                    {/* Lead Details Section in Table Format */}
                    <div className="bg-white rounded shadow-sm mb-4">
                        <div className="p-2" style={{ backgroundColor: "#d6d6f5" }}>
                            <h6 className="mb-0 fw-bold">Lead Details</h6>
                        </div>
                        <div className="p-3">
                            <table className="table table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="fw-bold">Customer Name:</span> {lead?.data?.customerName}
                                        </td>
                                        <td><span className="fw-bold">Customer Mobile Number:</span> {lead?.data?.customerMobile}</td>
                                    </tr>
                                    <tr>
                                        <td><span className="fw-bold">Business Type:</span> {lead?.data?.businessTypeName}</td>
                                        <td><span className="fw-bold">Email ID:</span> {lead?.data?.emailId}</td>
                                    </tr>
                                    <tr>
                                        <td><span className="fw-bold">Team:</span>{lead?.data?.teamName}</td>
                                        <td>
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={
                                                    lead?.data.leadStatusTitle === "New"
                                                        ? "text-primary"
                                                        : lead?.data.leadStatusTitle === "Contacted"
                                                            ? "text-warning"
                                                            : lead?.data.leadStatusTitle === "Closed"
                                                                ? "text-danger"
                                                                : "text-success"
                                                }
                                            >
                                                {lead?.data.leadStatusTitle}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td><span className="fw-bold">Follow up Date:</span> {lead?.data.followUpDate
                                            ? new Date(lead.data.followUpDate).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "-"}</td>
                                    </tr>
                                    <tr>
                                        <td><span className="fw-bold">Follow up Time:</span>  {lead?.data.followUpTime
                                            ? new Date(`1970-01-01T${lead.data.followUpTime}`).toLocaleTimeString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })
                                            : "-"}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <span className="fw-bold">Lead Details:</span> {lead?.data.leadDetails}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>


                    {/* Latest Updates */}
                    <div className="bg-white p-3 rounded shadow-sm mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="mb-0">Latest Updates</h5>
                            {/* <select className="form-select form-select-sm w-auto">
                                <option>Sort by date</option>
                            </select> */}
                        </div>

                        <div className="mb-3 p-2 border rounded d-flex align-items-start ">
                            <div
                                className="d-flex align-items-center justify-content-center me-3 rounded"
                                style={{ width: "40px", height: "40px", backgroundColor: "rgb(59, 130, 246)" }}
                            >
                                <i className="bi bi-person-fill text-white"></i>
                            </div>                            <div>
                                <p className="mb-1">You sent 1 Message to the contact.</p>
                                <small className="text-muted">10 Jan 2024, 10:00 am</small>
                            </div>
                        </div>

                        <div className="mb-3 p-2 border rounded d-flex align-items-start ">
                            <div
                                className="d-flex align-items-center justify-content-center me-3 rounded"
                                style={{ width: "40px", height: "40px", backgroundColor: "#3EA92D" }}
                            >
                                <i className="bi bi-person-fill text-white"></i>
                            </div>                            <div>
                                <p className="mb-1">You sent 1 Message to the contact.</p>
                                <small className="text-muted">10 Jan 2024, 10:00 am</small>
                            </div>
                        </div>
                        <div className="mb-3 p-2 border rounded d-flex align-items-start ">
                            <div
                                className="d-flex align-items-center justify-content-center me-3 rounded"
                                style={{ width: "40px", height: "40px", backgroundColor: "#ED4343" }}
                            >
                                <i className="bi bi-person-fill text-white"></i>
                            </div>                            <div>
                                <p className="mb-1">You sent 1 Message to the contact.</p>
                                <small className="text-muted">10 Jan 2024, 10:00 am</small>
                            </div>
                        </div>
                    </div>


                </div> {/* container-fluid */}
            </div> {/* content */}
        </div>
    );
};

export default LeadView;
