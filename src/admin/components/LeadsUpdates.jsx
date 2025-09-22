import React from "react";
import img1 from '../assets/admin/images/user.png';

const updates = [
  { name: "KNS Reddy", action: "completed the General Task Overview", time: "10 Jan 2024, 10:00 am", img: img1 },
  { name: "Akeeb Shaik", action: "Responded to your appointment schedule question by call at 09:30pm.", time: "10 Jan 2024, 09:45 am", img: img1 },
  { name: "Jane Doe", action: "updated the project documentation.", time: "9 Jan 2024, 4:15 pm", img: img1 },
  { name: "John Smith", action: "commented on task #123.", time: "9 Jan 2024, 3:00 pm", img: img1 },
  { name: "Emily Clark", action: "assigned a new task to the development team.", time: "8 Jan 2024, 11:30 am", img: img1 },
  { name: "Michael Brown", action: "responded to your appointment schedule question by call at 09:30pm.", time: "8 Jan 2024, 10:00 am", img: img1 },
];

const LeadsUpdates = () => (
  <div className="card shadow-sm">
    <div className="card-body p-2 pill">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title mb-0">Lead Updates</h5>
        <a href="#" className="text-success small fw-semibold">View all</a>
      </div>

      {/* Summary Badges */}
      <div className="d-flex g-2 mb-3 flex-wrap">
        <div className="d-flex align-items-center gap-2 bg-white border rounded p-2 me-2">
          <span className="badge rounded-pill bg-danger">40</span>
          <span className="small">Total Leads</span>
        </div>
        <div className="d-flex align-items-center gap-2 bg-white border rounded p-2 me-1">
          <span className="badge rounded-pill bg-primary">12</span>
          <span className="small">New Leads</span>
        </div>
        <div className="d-flex align-items-center gap-2 bg-white border rounded p-2 me-1">
          <span className="badge rounded-pill bg-warning text-dark">06</span>
          <span className="small">In Progress <br /> Leads</span>
        </div>
        <div className="d-flex align-items-center gap-2 bg-white border rounded p-2">
          <span className="badge rounded-pill bg-success">12</span>
          <span className="small">Completed <br /> Leads</span>
        </div>
      </div>

      {/* Updates List */}
      <ul className="list-group list-group-flush">
        {updates.map((u, i) => (
          <li className="list-group-item d-flex align-items-start gap-3 border-0 px-0" key={i}>
            <img
              src={u.img}
              className="rounded-circle"
              alt={u.name}
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div>
              <div className="fw-semibold">
                {u.name} <span className="fw-normal text-dark">{u.action}</span>
              </div>
              <small className="text-muted">{u.time}</small>
            </div>
          </li>
        ))}
      </ul>

    </div>
  </div>
);

export default LeadsUpdates;
