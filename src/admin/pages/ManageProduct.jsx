import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts, fetchMarketPlaceSellers, fetchProducts } from "../../redux/actions/adminProductsAction";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { marketPlacesellers, products , loading , pagination} = useSelector((state) => state.adminProducts);
  const { serviceTypes } = useSelector(state => state.serviceType);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [marketPlaceId, setMarketPlaceId] = useState("");
  const [sellerId, setSellerId] = useState("")

  console.log('poo', products)
  useEffect(() => {
    dispatch(fetchMarketPlaceSellers());
    dispatch(fetchServiceTypes());
    dispatch(fetchAdminProducts({ page: currentPage, search: searchTerm, marketPlaceId, sellerId, status: statusFilter }));
  }, [dispatch, currentPage, statusFilter, searchTerm, marketPlaceId, sellerId]);

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    setMarketPlaceId("");
    setSearchTerm("");
    setSellerId("");
    setStatusFilter("");
    setSelectedProducts([]);
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
                  <h5 className="form-title m-0">Manage Products</h5>
                </div>

                <div className="col-lg-8 d-flex align-items-center">
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
                  <Link to="/add-product" className="reports mp-btn-add btn">
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
                  <button className="mp-btn mp-btn-active me-2">
                    <i className="bi bi-check-circle me-1"></i> Active
                  </button>
                  <button className="mp-btn mp-btn-inactive me-2">
                    <i className="bi bi-x-circle me-1"></i> Inactive
                  </button>
                  <button className="mp-btn mp-btn-delete me-2">
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
                            products?.length > 0 &&
                            selectedProducts.length === products.length
                          }
                          onChange={() =>
                            setSelectedProducts(
                              selectedProducts.length === products.length
                                ? []
                                : products?.map((p) => p.id)
                            )
                          }
                        />
                      </th>
                      <th>S.No</th>
                      <th>Marketplace</th>
                      <th>Seller Name</th>
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
                    ) : products?.length > 0 ? (
                      products?.map((product, index) => (
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
                          <td>{product.sellerName}</td>
                          <td>{product.productTitle}</td>
                          <td>{product.availableStock}</td>
                          <td>₹{product.mrp}</td>
                          <td>₹{product.sellingPrice}</td>
                          <td>
                            {product.status === 1 ? "Active" : "Inactive"}
                          </td>
                          <td> <button className="btn btn-icon btn-delete">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
