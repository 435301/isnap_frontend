import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketPlaceSellers, fetchReports } from "../../redux/actions/adminProductsAction";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import "../assets/admin/css/style.css";
import PaginationComponent from "../../common/pagination";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { marketPlacesellers, reports, loading, pagination } = useSelector((state) => state.adminProducts);
  const { serviceTypes } = useSelector(state => state.serviceType);

  const [currentPage, setCurrentPage] = useState(1);
  const [marketPlaceId, setMarketPlaceId] = useState("");
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    dispatch(fetchReports({
      sellerId: sellerId,
      marketPlaceId: marketPlaceId,
      page: currentPage
    }));
    dispatch(fetchMarketPlaceSellers());
    dispatch(fetchServiceTypes("", "", "", 1, ""));
  }, [dispatch, sellerId, marketPlaceId, currentPage]);


  const handleRefresh = () => {
    setCurrentPage(1);
    setMarketPlaceId("");
    setSellerId("");
  }

  return (
    <div className="container-fluid d-flex p-0">
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
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header Card */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              {/* First Row: Title + Filters + Refresh */}
              <div className="row g-2 align-items-center mb-2">
                <div className="col-lg-12">
                  <h5 className="form-title m-0">Manage Reports</h5>
                </div>

                <div className="col-lg-8 d-flex align-items-center">
                  <select className="form-select me-2"
                    onChange={(e) => {
                      setSellerId(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={sellerId}>
                    <option value="">Select Seller</option>
                    {marketPlacesellers?.map((seller) => (
                      <option key={seller.id} value={seller.id}>{seller?.businessName}</option>
                    ))}
                  </select>

                  <select className="form-select me-2"
                    onChange={(e) => {
                      setMarketPlaceId(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={marketPlaceId}>
                    <option value="">Select Marketplace</option>
                    {serviceTypes?.map((service) => (
                      <option key={service.id} value={service.id}>{service.serviceType}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              {/* Second Row: Action Buttons */}

              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Seller</th>
                      <th>Marketplace</th>
                      <th>Active SKUs</th>
                      <th>Inactive SKUs</th>
                      <th>Total SKUs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="text-center">Loading...</td>
                      </tr>
                    ) : reports.length > 0 ? (
                      reports.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.businessName}</td>
                          <td>{item.marketPlaceName}</td>
                          <td>
                            <span
                              className="badge bg-success cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/manage-products?sellerId=${item?.sellerId}&status=1&marketPlaceId=${item?.marketPlaceId}`
                                )
                              }
                            >
                              {item.activeSkus}
                            </span>
                          </td>

                          <td>
                              <span className="badge bg-warning text-dark cursor-pointer"
                               onClick={() =>
                                navigate(
                                  `/manage-products?sellerId=${item?.sellerId}&status=0&marketPlaceId=${item?.marketPlaceId}`
                                )
                              }>
                                {item.inactiveSkus}
                              </span>
                          </td>

                          <td>
                              <span className="badge bg-primary cursor-pointer"  onClick={() =>
                                navigate(
                                  `/manage-products?sellerId=${item?.sellerId}&marketPlaceId=${item?.marketPlaceId}`
                                )
                              }>
                                {item.totalSkus}
                              </span>
                          </td>
                        </tr>
                      ))) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No reports found.
                        </td>
                      </tr>
                    )
                    }
                  </tbody>
                </table>
              </div>
            </div>
              <PaginationComponent
              currentPage={currentPage}
              totalPages={pagination?.totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
