import React, { useEffect, useState } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bulkDelete, bulkStatusUpdate, fetchAdminProducts, fetchMarketPlaceSellers, fetchProducts } from "../../redux/actions/adminProductsAction";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import PaginationComponent from "../../common/pagination";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../admin/components/Modal/DeleteConfirmationModal";
import { bulkSellerDelete, bulkSellerStatusUpdate, deleteSellerProduct, fetchSellerProducts } from "../../redux/actions/sellerProductsAction";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const {  sellerProducts, loading, pagination } = useSelector((state) => state.sellerProducts);
  const { serviceTypes } = useSelector(state => state.serviceType);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [marketPlaceId, setMarketPlaceId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [searchParams] = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const statusFromUrl = searchParams.get("status");
    const marketPlaceIdFromUrl = searchParams.get("marketPlaceId");
    if (statusFromUrl !== null) setStatusFilter(statusFromUrl);
    if (marketPlaceIdFromUrl) setMarketPlaceId(marketPlaceIdFromUrl);
    setCurrentPage(1);
    setIsInitialized(true);
  }, [searchParams]);

  useEffect(() => {
     if (!isInitialized) return;
    dispatch(fetchServiceTypes());
    dispatch(fetchSellerProducts({ page: currentPage, search: searchTerm, marketPlaceId, status: statusFilter }));
  }, [dispatch, currentPage, statusFilter, searchTerm, marketPlaceId, isInitialized]);

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    setMarketPlaceId("");
    setSearchTerm("");
    setStatusFilter("");
    setSelectedProducts([]);
  }

const handleBulkStatusUpdate = (status) => {
  if (selectedProducts.length === 0) {
    toast.warn("Please select at least one product");
    return;
  }
  const payload = {
    ids: selectedProducts,
    status, // 1 = Active, 0 = Inactive
  };

  dispatch(bulkSellerStatusUpdate(payload)).then(() => {
    setSelectedProducts([]);
    dispatch(
      fetchSellerProducts({
        page: currentPage,
        search: searchTerm,
        marketPlaceId,
        status: statusFilter,
      })
    );
  });
};

const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = ()=>{
    dispatch(deleteSellerProduct(deleteId));
     dispatch(
      fetchSellerProducts({
        page: currentPage,
        search: searchTerm,
        marketPlaceId,
        status: statusFilter,
      })
    );
    setDeleteId(null);
    setShowDeleteModal(false);
    
  }

const handleBulkDelete = () => {
  if (selectedProducts.length === 0) {
    alert("Please select at least one product");
    return;
  }
  dispatch(bulkSellerDelete({ ids: selectedProducts })).then(() => {
    setSelectedProducts([]);
    setShowDeleteModal(false);
    dispatch(
      fetchSellerProducts({
        page: currentPage,
        search: searchTerm,
        marketPlaceId,
        status: statusFilter,
      })
    );
  });
};

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
                  {/* <h5 className="form-title m-0">Manage Products</h5> */}
                </div>

                <div className="col-lg-8 d-flex align-items-center">
                  <select className="form-select me-2"
                    value={marketPlaceId}
                    onChange={(e) => {
                      setMarketPlaceId(e.target.value);
                      setCurrentPage(1);
                    }}>
                    <option value="">Select Marketplace</option>
                    {serviceTypes?.map((marketplace) => (
                      <option key={marketplace?.id} value={marketplace?.marketPlaceId}>{marketplace?.serviceType}</option>
                    ))}
                  </select>

                  <select className="form-select me-2"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}>
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>

                  {/* Search Input */}
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border"
                    onClick={handleRefresh}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
                <div className="col-lg-2">
                  {" "}
                  <Link to="/seller/add-product" className="reports mp-btn-add btn">
                    <i className="bi bi-plus-circle me-1"></i> Add Products
                    Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              {/* Second Row: Action Buttons */}
              <div className="row g-2 align-items-center mb-3">
                <div className="col text-end">
                  <button className="mp-btn mp-btn-active me-2"  onClick={() => handleBulkStatusUpdate(1)}>
                    <i className="bi bi-check-circle me-1"></i> Active
                  </button>
                  <button className="mp-btn mp-btn-inactive me-2"  onClick={() => handleBulkStatusUpdate(0)}>
                    <i className="bi bi-x-circle me-1"></i> Inactive
                  </button>
                  <button className="mp-btn mp-btn-delete me-2" onClick={handleBulkDelete}>
                    <i className="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            sellerProducts?.length > 0 &&
                            selectedProducts.length === sellerProducts.length
                          }
                          onChange={() =>
                            setSelectedProducts(
                              selectedProducts.length === sellerProducts.length
                                ? []
                                : sellerProducts?.map((p) => p.id)
                            )
                          }
                        />
                      </th>
                      <th>S.No</th>
                      <th>Marketplace</th>
                      <th>Seller</th>
                      <th>Product Title</th>
                      <th>Available Stock</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="text-center">Loading...</td>
                      </tr>
                    ) : sellerProducts?.length > 0 ? (
                      sellerProducts?.map((product, index) => (
                        <tr key={product.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleCheckboxChange(product.id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>
                            {product.marketPlaceName}
                          </td>
                          <td>{product.businessName}</td>
                          <td>{product.productTitle}</td>
                          <td>{product.availableStock}</td>
                          <td>₹{product.mrp}</td>
                          <td>₹{product.sellingPrice}</td>
                          <td >
                            <span className={`badge ${product.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>{product.status === 1 ? "Active" : "Inactive"}</span>
                          </td>
                          <td> <button className="btn btn-icon btn-delete" onClick={()=>handleDeleteClick(product.id)}>
                            <i className="bi bi-trash"></i>
                          </button></td>
                        </tr>
                      ))) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No products found.
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

export default ManageProducts;
