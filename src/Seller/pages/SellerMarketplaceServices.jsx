import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerServices } from "../../redux/actions/adminProductsAction";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {sellerServices} = useSelector((state)=> state.adminProducts);
  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  /* Handle window resize */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(()=>{
    dispatch(fetchSellerServices());
  },[dispatch]);
  
  /* ✅ New Static Marketplace Report Data */
  const reportData = [
    {
      id: 1,
      sellerName: "John Traders",
      services: "Product Listing",
      marketplace: "Amazon",
      status: "Active",
    },
    {
      id: 2,
      sellerName: "RK Enterprises",
      services: "Inventory Sync",
      marketplace: "Flipkart",
      status: "Inactive",
    },
    {
      id: 3,
      sellerName: "Tech World",
      services: "Order Management",
      marketplace: "Snapdeal",
      status: "Active",
    },
  ];

  return (
    <div className="container-fluid d-flex p-0 bg-light">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 250 : 95) : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm mb-3">
            <h5 className="m-0"> Services Report</h5>
          </div>

          {/* Filters */}
          {/* <div className="bg-white p-3 rounded shadow-sm mb-3">
            <div className="row g-2 align-items-center">
              <div className="col-lg-3">
                <select className="form-select">
                  <option value="">Select Marketplace</option>
                  <option>Amazon</option>
                  <option>Flipkart</option>
                  <option>Snapdeal</option>
                </select>
              </div>

              <div className="col-lg-3">
                <select className="form-select">
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-lg-2 d-flex">
                <button className="btn btn-success me-2">
                  <i className="bi bi-search"></i>
                </button>
                <button className="btn btn-light border">
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>
          </div> */}

          {/* Table */}
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover  table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Sl No</th>
                    <th>Services</th>
                    <th>Source</th>
                    <th>Work Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerServices?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.serviceTypeName || item.activityName || "-"}</td>
                      <td>{item?.source || "-"}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === 1
                              ? "bg-primary" : item.status === 2 ? "bg-danger" : item.status === 3 ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {item.status === 1 ? "To Do" : item.status === 2 ? "In Progress" : item.status === 3 ? "Completed" : "To Do"}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {reportData.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
