import React, { useEffect, useState } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteSubOrder, fetchOrders, fetchSubOrders } from "../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketPlaceSellers } from "../../redux/actions/adminProductsAction";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import PaginationComponent from "../../common/pagination";
import { formatDate, safeFormat } from "../../common/formatDate";
import DeleteConfirmationModal from "../../admin/components/Modal/DeleteConfirmationModal";
import { deleteSellerSubOrder, fetchSellerOrders, fetchSellerSubOrders } from "../../redux/actions/sellerOrderAction";

const SellerManageSubOrders = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [marketPlaceId, setMarketPlaceId] = useState(0);
  const [sellerId, setSellerId] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { serviceTypes } = useSelector(state => state.serviceType);
  const { orders, suborders, loading, pagination, subOrderById } = useSelector((state) => state.sellerOrders);

  useEffect(() => {
    dispatch(fetchServiceTypes("", "", "", 1, ""));
    dispatch(fetchSellerOrders({
      page: "", marketPlaceId: "", fromDate: "", toDate: "", search: ""
    }));
    dispatch(fetchSellerSubOrders({ page: currentPage, search: searchTerm,  marketPlaceId: marketPlaceId, orderId: orderId, fromDate: formatDate(fromDate), toDate: formatDate(toDate) }))
  }, [dispatch, currentPage, searchTerm, marketPlaceId, orderId, fromDate, toDate])

  const handleRefresh = () => {
    setCurrentPage(1);
    setMarketPlaceId(0);
    setOrderId(0);
    setSearchTerm("");
    setFromDate("");
    setToDate("");
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSellerSubOrder(deleteId));
    dispatch(
      fetchSellerSubOrders({ page: currentPage, search: searchTerm, marketPlaceId: marketPlaceId, orderId: orderId, fromDate: formatDate(fromDate), toDate: formatDate(toDate) })
    );
    setDeleteId(null);
    setShowDeleteModal(false);
  }

  const handleEdit = (id) => (
    navigate(`/seller/edit-sub-order/${id}`)
  );

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
          <div className="row mb-2">
            <div className="bg-white p-2 rounded shadow-sm card-header">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Sub Orders</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/seller/add-sub-order" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Sub Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                {/* Search By */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by sub order ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Order ID */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select"
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                      setCurrentPage(1);
                    }}>
                    <option value="">Select Order ID</option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>{order.orderId}</option>
                    ))}
                  </select>
                </div>

                {/* Marketplace */}
                <div className="col-lg-2 col-md-4 col-sm-6">
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

                {/* Date Range */}
                <div className="col-lg-2 col-md-6 col-sm-12">
                  <div className="d-flex gap-1">
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
                </div>

                {/* Actions */}
                <div className="col-lg-2 col-md-6 col-sm-12 d-flex">

                  <button className="btn btn-light border " onClick={handleRefresh}>
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
                      <th>Sub Order ID</th>
                      <th>Order ID</th>
                      <th>Order Date</th>
                      <th>Product</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Qty</th>
                      <th>Marketplace</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="text-center">Loading...</td>
                      </tr>
                    ) : suborders?.length > 0 ? suborders.map((order, index) => (
                      <tr key={order.id}>
                        {/* <td>
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleCheckboxChange(order.id)}
                          />
                        </td> */}
                        <td>{index + 1}</td>
                        <td>{order.subOrderId}</td>
                        <td>{order.orderIdNum}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.productName}</td>
                        <td>₹{order.mrp}</td>
                        <td>₹{order.sellingPrice}</td>
                        <td>
                           <span className="badge bg-primary cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/seller/manage-orders?&marketPlaceId=${order?.marketPlaceId}&orderId=${order.orderId}`
                            )
                          }
                        >
                          {order.qty}</span></td>
                        <td>{order.marketPlaceName}</td>
                        <td><span className={`badge ${order.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>{order.status === 1 ? "Active " : "Inactive"} </span></td>
                        {/* Actions */}
                        <td>
                          <button className="btn btn-icon btn-edit me-1" onClick={() => handleEdit(order?.id)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-icon btn-delete" onClick={() => handleDeleteClick(order?.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No sub orders found.
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
            {showDeleteModal && (
              <DeleteConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerManageSubOrders;
