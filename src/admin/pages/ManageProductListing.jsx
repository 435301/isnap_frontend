import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditProductModal from "../components/Modal/EditProductModal";
import ViewProductModal from "../components/Modal/ViewProductModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";

import {
    fetchProducts,
    updateProduct,
    deleteProduct,
    clearProductSuccessMessage,
} from "../../redux/actions/productActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProducts = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();
    const {
        products = [],
        loading = false,
        error = null,
        successMessage = null,
        totalPages = 1,
    } = useSelector((state) => state.product || {});

    // Handle responsive sidebar
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsSidebarOpen(window.innerWidth >= 992);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch products
    useEffect(() => {
        console.log("Fetching products with:", { currentPage, searchTerm, statusFilter });
        dispatch(fetchProducts(currentPage, itemsPerPage, searchTerm, statusFilter));
    }, [dispatch, currentPage, searchTerm, statusFilter]);

    // Toast notification on success
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearProductSuccessMessage());
        }
    }, [successMessage, dispatch]);

    const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setSearchTerm("");
        setStatusFilter("");
        setCurrentPage(1);
        dispatch(fetchProducts(1, itemsPerPage, "", ""));
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteProduct(deleteId));
            setShowDeleteModal(false);
            setDeleteId(null);
            dispatch(fetchProducts(currentPage, itemsPerPage, searchTerm, statusFilter));
        } catch {
            toast.error("Failed to delete product.");
        }
    };

    const handleSaveChanges = async (updatedProduct) => {
        try {
            await dispatch(updateProduct(updatedProduct));
            setShowEditModal(false);
            setSelectedProduct(null);
        } catch (err) {
            toast.error(err.message || "Failed to update product");
        }
    };

    // Filter products on frontend (optional)
    const filteredProducts = statusFilter
        ? products.filter((product) => String(product.status) === statusFilter)
        : products;

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
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
                    {/* Header */}
                    <div className="row mb-4">
                        <div className="bg-white p-3 rounded shadow-sm card-header">
                            <div className="row g-2 align-items-center">
                                <div className="col-lg-6">
                                    <h5 className="form-title m-0">Manage Products Listing</h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/add-product-listing" className="btn btn-new-lead">
                                        <i className="bi bi-plus-circle me-1"></i> Add  Products Listing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter/Search */}
                    <div className="row mb-4">
                        <div className="bg-white p-3 rounded shadow-sm card-header">
                            <div className="row g-2 align-items-center">
                                <div className="col-md-3">
                                    <select
                                        className="form-select"
                                        value={statusFilter}
                                        onChange={handleStatusChange}
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

                    {/* Products Table */}
                    <div className="row">
                        <div className="bg-white p-3 rounded shadow-sm card-header">
                            <div className="table-responsive">
                               
                                {loading ? (
                                    <p>Loading products...</p>
                                ) : (
                                    <table className="table align-middle table-striped table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.No</th>
                                                <th>From SKU</th>
                                                <th>To SKU</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="text-center">
                                                        No products found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredProducts.map((product, index) => (
                                                    <tr key={product?.id || index}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{product?.fromQty ? `${product.fromQty} SKUs` : "-"}</td>
                                                        <td>{product?.toQty ? `${product.toQty} SKUs` : "-"}</td>
                                                        <td>{product?.price ? `₹${product.price}` : "-"}</td>
                                                        <td>
                                                            <span
                                                                className={`badge ${Number(product?.status) === 1
                                                                        ? "bg-success-light text-success"
                                                                        : "bg-danger-light text-danger"
                                                                    }`}
                                                            >
                                                                {Number(product?.status) === 1 ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <button
                                                                    className="btn btn-icon btn-view"
                                                                    onClick={() => {
                                                                        setSelectedProduct(product);
                                                                        setShowViewModal(true);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-eye"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-icon btn-edit"
                                                                    onClick={() => {
                                                                        setSelectedProduct(product);
                                                                        setShowEditModal(true);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-icon btn-delete"
                                                                    onClick={() => {
                                                                        setDeleteId(product.id);
                                                                        setShowDeleteModal(true);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-end align-items-center mt-3">
                                <nav>
                                    <ul className="pagination custom-pagination mb-0">
                                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                            >
                                                &lt;
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                                            (page) => (
                                                <li
                                                    key={page}
                                                    className={`page-item ${currentPage === page ? "active" : ""
                                                        }`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            )
                                        )}
                                        <li
                                            className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                &gt;
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            {/* Modals */}
                            <EditProductModal
                                show={showEditModal}
                                setShowEditModal={setShowEditModal}
                                selectedProduct={selectedProduct}
                                handleSaveChanges={handleSaveChanges}
                            />

                            <ViewProductModal
                                show={showViewModal}
                                handleClose={() => setShowViewModal(false)}
                                product={selectedProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={confirmDelete}
            />

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default ManageProducts;