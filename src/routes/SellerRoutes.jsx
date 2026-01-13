import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SellerRoute } from "./RoleRoutes.jsx";

const SellerDashboard = lazy(() => import("../Seller/pages/Dashboard"));
const AddProducts = lazy(() => import("../Seller/pages/AddProducts"));
const ManageProducts = lazy(() => import("../Seller/pages/ManageProducts"));
const BusinessInformationForm = lazy(() => import("../Seller/pages/BusinessInformationForm"));
const TaskStatus = lazy(() => import("../Seller/pages/TaskStatus"));
const MouAgreement = lazy(() => import("../Seller/pages/MouAgreement"));
const MouA2 = lazy(() => import("../Seller/pages/MouA2"));
const MouA3 = lazy(() => import("../Seller/pages/MouA3"));
const SellerInvoicePage = lazy(() => import("../Seller/pages/SellerInvoicePage"));
const SellerMarketplaceServices = lazy(() => import("../Seller/pages/SellerMarketplaceServices"));

const TaskSummarySellar = lazy(() => import("../Seller/pages/TaskSummarySellar"));
const SellerAddProduct = lazy(() => import("../Seller/pages/SellerAddProduct.jsx"));
const SellerManageProduct = lazy(() => import("../Seller/pages/SellerManageProduct"));
const SellerBulkUpload = lazy(() => import("../Seller/pages/SellerBulkUpload.jsx"));
const SellerManageReports = lazy(() => import("../Seller/pages/SellerManageReports.jsx"));
const SellerMarketplace = lazy(() => import("../Seller/pages/SellerMarketplace.jsx"));

const SellerInvoiceList = lazy(() => import("../Seller/pages/sellerInvoiceList.jsx"));
const SellerServicesList = lazy(() => import("../Seller/pages/ServicesList.jsx"));
const SellerManageOrders = lazy(() => import("../Seller/pages/SellerManageOrders.jsx"));
const SellerManageSubOrders = lazy(() => import("../Seller/pages/SellerManageSubOrders.jsx"));
const SellerAddOrder = lazy(() => import("../Seller/pages/SellerAddOrder.jsx"));
const SellerAddSubOrder = lazy(() => import("../Seller/pages/SellerAddSubOrder.jsx"));
const SellerManageSupport = lazy(() => import("../Seller/pages/SellerManageSupport.jsx"));
const SellerAddSupport = lazy(() => import("../Seller/pages/SellerAddSupport.jsx"));

export const SellerRoutes = () => {
    return (
        <Routes>
            <Route
                path="/seller/dashboard"
                element={
                    <SellerRoute>
                        <SellerDashboard />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/add-products"
                element={
                    <SellerRoute>
                        <AddProducts />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/add-support"
                element={
                    <SellerRoute>
                        <SellerAddSupport />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/edit-support/:id"
                element={
                    <SellerRoute>
                        <SellerAddSupport />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/manage-support"
                element={
                    <SellerRoute>
                        <SellerManageSupport />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/manage-product"
                element={
                    <SellerRoute>
                        <SellerManageProduct />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/bulk-upload"
                element={
                    <SellerRoute>
                        <SellerBulkUpload />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/reports"
                element={
                    <SellerRoute>
                        <SellerManageReports />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/marketplace-report"
                element={
                    <SellerRoute>
                        <SellerMarketplace />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/marketplace-services"
                element={
                    <SellerRoute>
                        <SellerMarketplaceServices />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/add-product"
                element={
                    <SellerRoute>
                        <SellerAddProduct />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/mou-1"
                element={
                    <SellerRoute>
                        <MouAgreement />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/mou-2"
                element={
                    <SellerRoute>
                        <MouA2 />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/mou-3"
                element={
                    <SellerRoute>
                        <MouA3 />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/manage-products"
                element={
                    <SellerRoute>
                        <ManageProducts />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/business-information"
                element={
                    <SellerRoute>
                        <BusinessInformationForm />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/task"
                element={
                    <SellerRoute>
                        <TaskStatus />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/task-summary"
                element={
                    <SellerRoute>
                        <TaskSummarySellar />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/invoice-seller"
                element={
                    <SellerRoute>
                        <SellerInvoicePage />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/invoice-seller-list"
                element={
                    <SellerRoute>
                        <SellerInvoiceList />
                    </SellerRoute>
                }
            />
            <Route
                path="/seller/services-seller-list"
                element={
                    <SellerRoute>
                        <SellerServicesList />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/manage-orders"
                element={
                    <SellerRoute>
                        <SellerManageOrders />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/manage-sub-orders"
                element={
                    <SellerRoute>
                        <SellerManageSubOrders />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/add-order"
                element={
                    <SellerRoute>
                        <SellerAddOrder />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/edit-sub-order/:id"
                element={
                    <SellerRoute>
                        <SellerAddSubOrder />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/add-sub-order"
                element={
                    <SellerRoute>
                        <SellerAddSubOrder />
                    </SellerRoute>
                }
            />

        </Routes>
    )
}
