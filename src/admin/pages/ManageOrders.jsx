import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketPlaceSellers } from "../../redux/actions/adminProductsAction";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { fetchOrders } from "../../redux/actions/orderActions";
import PaginationComponent from "../../common/pagination";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth] = useState(window.innerWidth);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { marketPlacesellers } = useSelector((state) => state.adminProducts);
  const { serviceTypes } = useSelector(state => state.serviceType);
  const { orders, loading, pagination } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [marketPlaceId, setMarketPlaceId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sellerIdFromUrl = searchParams.get("sellerId");
    const orderIdFromUrl = searchParams.get("orderId");
    const marketPlaceIdFromUrl = searchParams.get("marketPlaceId");
    if (sellerIdFromUrl) setSellerId(Number(sellerIdFromUrl));
    if (orderIdFromUrl !== null) setSelectedOrders(orderIdFromUrl);
    if (marketPlaceIdFromUrl) setMarketPlaceId(marketPlaceIdFromUrl);
    setCurrentPage(1);
    setIsInitialized(true);
  }, [searchParams]);

  useEffect(() => {
    if (!isInitialized) return;
    dispatch(fetchMarketPlaceSellers());
    dispatch(fetchServiceTypes("", "", "", 1, ""));
    dispatch(fetchOrders({ page: currentPage, search: searchTerm, marketPlaceId, sellerId, fromDate: fromDate, toDate: toDate }));
  }, [dispatch, currentPage, searchTerm, marketPlaceId, sellerId, fromDate, toDate, isInitialized]);

  const handleRefresh = () => {
    setCurrentPage(1);
    setMarketPlaceId("");
    setSearchTerm("");
    setSellerId("");
    setSelectedOrders([]);
    setFromDate("");
    setToDate("");
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
        <Navbar />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          {/* Header Card */}
          <div className="row mb-2">
            <div className="bg-white p-2 rounded shadow-sm card-header mb-2">
              <div className="row  g-2 align-items-center">
                {/* Title */}
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Orders</h5>
                </div>
                <div className="col-lg-6 text-end">
                  {" "}
                  <Link to="/add-orders" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add orders
                    Listing
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row  g-2 align-items-center">
                {/* Title */}
                {/* <div className="col-lg-2">
                  <h5 className="form-title m-0">Manage Orders</h5>
                </div> */}
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by customer name , mobile no and orderId"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Marketplace */}
                <div className="col-lg-2">
                  <select className="form-select me-2"
                    value={marketPlaceId}
                    onChange={(e) => {
                      setMarketPlaceId(e.target.value);
                      setCurrentPage(1);
                    }}>
                    <option value="">Select Marketplace</option>
                    {serviceTypes?.map((marketplace) => (
                      <option key={marketplace?.id} value={marketplace?.id}>{marketplace?.serviceType}</option>
                    ))}
                  </select>
                </div>

                {/* Seller */}
                <div className="col-lg-2">
                  <select className="form-select me-2"
                    onChange={(e) => {
                      setSellerId(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={sellerId}>
                    <option value="" >Select Seller</option>
                    {marketPlacesellers?.map((seller) => (
                      <option key={seller?.id} value={seller?.id}>{seller?.businessName}</option>
                    ))}
                  </select>
                </div>

                {/* From Date */}
                <div className="col-lg-2">
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    selectsStart
                    startDate={fromDate}
                    endDate={toDate}
                    placeholderText="From Date"
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                {/* To Date */}
                <div className="col-lg-2">
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    selectsEnd
                    startDate={fromDate}
                    endDate={toDate}
                    minDate={fromDate}
                    placeholderText="To Date"
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                {/* Actions */}
                <div className="col-lg-2 ">
                  <button className="btn btn-success me-2">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Order ID</th>
                      <th>Seller Name</th>
                      <th>Marketplace</th>
                      <th>Order Date</th>
                      <th>Order By</th>
                      <th>Qty</th>
                      <th>Total Amount</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="text-center">Loading...</td>
                      </tr>
                    ) : orders?.length > 0 ? (orders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.orderId}</td>
                        <td>{order.businessName}</td>
                        <td>{order.marketPlaceName}</td>
                        <td>{order.orderDate}</td>
                        <td>
                          <span className="">
                            {" "}
                            <strong>{order.customerName}</strong>
                          </span>
                          <br />
                          <small className="text-muted">
                            {order.customerMobile}
                          </small>
                        </td>
                        <td>{order?.qty}</td>
                        <td>₹{order.totalAmount}</td>
                        {/* <td>
                        <button className="btn btn-sm btn-light me-1">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-light">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td> */}
                      </tr>
                    )))
                      : (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No orders  found.
                          </td>
                        </tr>
                      )}
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

export default ManageOrders;
