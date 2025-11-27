import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import PaginationComponent from "../../common/pagination";
import SellerNavbar from "../components/TeamNavbar";
import TeamSidebar from "../components/TeamSidebar";
import { fetchDigitalMarketingSellerList, fetchMarketPlaceExecutivesSellerList, fetchMarketPlaceManagerSellerList, fetchPhotographySellerList } from "../../redux/actions/TeamSellerAction";

const ManageSellersTeam = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const subDeptName = storedUser.subDepartmentName
  const roleName = storedUser.roleName
  const dispatch = useDispatch();
  const { MarketManagerSellerList = [], loading , totalPages = 1, } = useSelector((state) => state.teamSeller || {});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


 useEffect(() => {
  const params = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm.trim(),
    showStatus: statusFilter === "" ? "" : Number(statusFilter),
  };

  const paramsMPExec = {
 ...params,
    source: subDeptName, // Correct source value
  };

  if (roleName === "Marketplace Manager") {
    dispatch(fetchMarketPlaceManagerSellerList(params));
  } 
  else if (
    roleName === "Executive" &&
    (
      subDeptName === "Business Launch" ||
      subDeptName === "Catalog Listing" ||
      subDeptName === "Key Account Management"
    )
  ) {
    dispatch(fetchMarketPlaceExecutivesSellerList(paramsMPExec));
  }
  else if (
    roleName === "Digital Marketing Manager" ||
    roleName === "Digital Marketing Executive"
  ) {
    dispatch(fetchDigitalMarketingSellerList(params));
  }
  else if (
    roleName === "Photography Manager" ||
    roleName === "Photography Executive"
  ) {
    dispatch(fetchPhotographySellerList(params));
  }

}, [dispatch, roleName, subDeptName, currentPage, searchTerm, statusFilter]);


  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

 const handleRefresh = () => {
  setSearchTerm("");
  setStatusFilter("");
  setCurrentPage(1);

  // const params = {
  //   page: 1,
  //   limit: itemsPerPage,
  //   search: "",
  //   showStatus: "",
  // };

  // dispatch(fetchMarketPlaceManagerSellerList(params));
};

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <TeamSidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <SellerNavbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Sellers</h5>
                </div>

              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Business Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) =>  setStatusFilter(e.target.value === "" ? "" : Number(e.target.value))}
                  >
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button
                    className="btn btn-success text-white me-3"
                    onClick={() => setCurrentPage(1)}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border-1" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="table">
                {loading ? (
                  <p>Loading sellers...</p>
                ) :!MarketManagerSellerList || MarketManagerSellerList?.length === 0 ? (
                  <p>No sellers found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Business Name</th>
                        <th>Seller Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MarketManagerSellerList.map((seller, index) => (
                        <tr key={seller?.id || index}>
                          <td>{index + 1}</td>
                          <td>{seller?.businessName || "-"}</td>
                          <td>{seller?.sellerName || "-"}</td>
                          <td>{seller?.regdEmail || "-"}</td>
                          <td>{seller?.regdMobile || "-"}</td>
                          <td>
                            <span
                              className={`badge ${seller?.status === 1
                                ? "bg-success-light text-success"
                                : "bg-danger-light text-danger"
                                }`}
                            >
                              {seller?.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2 align-items-center">
                              <Link
                                to={`/team/view-seller/${seller?.id}`}
                                className="btn btn-icon btn-view"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>


                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageSellersTeam;
