import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { fetchBusinessDetailsById } from "../../redux/actions/businessActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BASE_URL from "../../config/config";

const ViewSeller = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { businessDetails, loading } = useSelector((state) => state.business);
  const sellerDetail = businessDetails[0]; // only one seller in the array

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchBusinessDetailsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!sellerDetail) return <p className="text-center mt-5">Seller not found.</p>;

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          <div className="bg-white rounded shadow-sm mb-4">
            <div className="p-2" style={{ backgroundColor: "#d6d6f5" }}>
              <h6 className="mb-0 fw-bold">Seller Details</h6>
            </div>
            <div className="p-3">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td><span className="fw-bold">Business Name:</span> {sellerDetail.businessName}</td>
                    <td><span className="fw-bold">Seller Name:</span> {sellerDetail.sellerName}</td>
                    <td><span className="fw-bold">Spoc Name:</span> {sellerDetail.spocName}</td>
                  </tr>
                  <tr>
                    <td><span className="fw-bold">Spoc Mobile:</span> {sellerDetail.spocMobile}</td>
                    <td><span className="fw-bold">Email:</span> {sellerDetail.regdEmail}</td>
                    <td><span className="fw-bold">Phone:</span> {sellerDetail.regdMobile}</td>
                  </tr>
                  <tr>
                    <td><span className="fw-bold">State:</span> {sellerDetail.stateName}</td>
                    <td><span className="fw-bold">City:</span> {sellerDetail.cityName}</td>
                    <td><span className="fw-bold">GST Number:</span> {sellerDetail.gstNumber}</td>
                  </tr>
                  <tr>
                    <td><span className="fw-bold">Referred By:</span> {sellerDetail.referredBy}</td>
                    <td><span className="fw-bold">Address:</span> {sellerDetail.address}</td>
                    <td>
                      <span className="fw-bold">Status:</span>{" "}
                      <span className={sellerDetail.status === 1 ? "text-success" : "text-danger"}>
                        {sellerDetail.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                  {/* <tr>
                    <td colSpan={3}>
                      <span className="fw-bold">Status:</span>{" "}
                      <span className={sellerDetail.status === 1 ? "text-success" : "text-danger"}>
                        {sellerDetail.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr> */}
                  {sellerDetail.businessLogo && (
                    <tr>
                      <td colSpan={3}>
                        <span className="fw-bold">Business Logo:</span>
                        <br />
                        <img
                          src={`${BASE_URL}${sellerDetail.businessLogo}`}
                          alt="Logo"
                          style={{ width: "120px", marginTop: "10px" }}
                        />
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

export default ViewSeller;
