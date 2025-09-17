import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChartBox = ({ title, labels, data, colors }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();

        if (chartRef.current) {
            chartInstanceRef.current = new Chart(chartRef.current, {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: colors,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `${context.label}: ${context.parsed}%`;
                                },
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstanceRef.current) chartInstanceRef.current.destroy();
        };
    }, []);

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="card-title fw-bold">{title}</h6>
                    <select className="form-select form-select-sm w-auto py-2 pe-5">
                        <option>This Month</option>
                        <option>Last Month</option>
                    </select>
                </div>

                <div className="chart-container text-center" style={{ height: "200px" }}>
                    <canvas ref={chartRef} />
                </div>

                <div className="d-flex justify-content-between mt-4 px-2">
                    {labels.map((label, idx) => (
                        <div key={idx} className="text-center" style={{ flex: 1 }}>
                            <small className="text-muted d-block">{label}</small>
                            <strong>{data[idx]}%</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TaskStatistics = () => {
    const labels = ["New", "In Progress", "Accepted", "Rejected"];
    const data = [30, 20, 50, 10];
    const colors = ["#2E8BC0", "#B1D877", "#41A332", "#888888"];

    return (
        <div className="row">
            {/* Task Status */}
            <div className="col-lg-4 col-md-6 mb-4">
                <PieChartBox
                    title="Task Status"
                    labels={labels}
                    data={data}
                    colors={colors}
                />
            </div>

            {/* Lead Status */}
            <div className="col-lg-4 col-md-6 mb-4">
                <PieChartBox
                    title="Lead Status"
                    labels={labels}
                    data={data}
                    colors={colors}
                />
            </div>

            {/* Latest Updates */}
            <div className="col-lg-4 col-md-12 mb-4">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h6 className="fw-bold mb-3">Latest Updates</h6>
                        <ul className="list-unstyled">
                            {[
                                { text: "Darlee Robertson new deal", icon: "bi-briefcase-fill", color: "bg-primary" },
                                { text: "Sharon Roy logged a call on", icon: "bi-telephone-fill", color: "bg-gd" },
                                { text: "Praveen Kumar sent a new proposal", icon: "bi-send-fill", color: "bg-success" },
                                { text: "Darlee Robertson new deal", icon: "bi-briefcase-fill", color: "bg-primary" },
                                { text: "Sharon Roy logged a call on", icon: "bi-telephone-fill", color: "bg-gd" },
                            ].map((item, idx) => (
                                <li key={idx} className="d-flex align-items-start mb-3">
                                    <div className={` text-white d-flex align-items-center justify-content-center me-3 ${item.color}`} style={{ width: 40, height: 40, borderRadius: 5, }}>
                                        <i className={`bi ${item.icon}`}></i>
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{item.text}</div>
                                        <small className="text-muted">10 Jan 2024, 10:00 am</small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="text-end">
                            <a href="#" className="text-success  text-decoration-none">View all &gt;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskStatistics;
