import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesManagerDashboard } from "../../redux/actions/executiceDashboardAction";

const ExecutiveDashboardCards = () => {
    const dispatch = useDispatch();
    const { dashboardData, loading, error } = useSelector((state) => state.executiveDashboard);

    useEffect(() => {
        dispatch(fetchSalesManagerDashboard());
    }, [dispatch]);

    const cardData = {
        tasks: [
            { count: dashboardData?.pendingApprovals, label: "Pending Approvals", color: "bg-danger" },
            { count: dashboardData?.completedApprovals, label: "Completed Approvals", color: "bg-primary" },
            { count: 15, label: "In Progress Tasks", color: "bg-warning" },
            { count: 5, label: "Completed Tasks", color: "bg-success" },
            { count: 5, label: "Delay Tasks", color: "bg-danger" },
            { count: 20, label: "Today Follow Ups", color: "bg-primary" },
            { count: 15, label: "Today Completed", color: "bg-warning" },
            { count: 5, label: "Today Rejected", color: "bg-success" },
        ],

    
     leads: [
        { count: 40, label: "Total Leads", color: "bg-danger" },
        { count: 20, label: "New Leads", color: "bg-primary" },
        { count: 15, label: "In Progress Leads", color: "bg-warning" },
        { count: 5, label: "Completed Leads", color: "bg-success" },
        { count: 40, label: "Total Rejected", color: "bg-danger" },
        { count: 20, label: "Today Follow Ups", color: "bg-primary" },
        { count: 15, label: "Today Completed", color: "bg-warning" },
        { count: 5, label: "Today Rejected", color: "bg-success" },
    ],
}

    const renderCards = (section) =>
        section.map((item, index) => (
            <div className="col-md-3 mb-3" key={index}>
                <div className="d-flex align-items-center bg-white border rounded px-3 py-3 h-100">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${item.color}`} style={{ width: 40, height: 40 }}>
                        <i className="bi bi-grid text-white"></i>
                    </div>
                    <div>
                        <h5 className="mb-0 fw-bold">{item?.count?.toString().padStart(2, "0")}</h5>
                        <small className="text-muted">{item?.label}</small>
                    </div>
                </div>
            </div>
        ));

    return (
        <>
            <div className="row bg-white mb-3 py-3">
                <h6 className="fw-bold mb-3"> Approvals</h6>

                {renderCards(cardData.tasks)}</div>


            <div className="row bg-white mb-3 py-3">
                <h6 className="fw-bold mb-3">Leads Status</h6>
                {renderCards(cardData.leads)}</div>
        </>
    );
};

export default ExecutiveDashboardCards;
