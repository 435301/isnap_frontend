import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AdminRoute } from "../routes/RoleRoutes.jsx";

const AdminDashboard = lazy(() => import("../admin/pages/Dashboard"));
const AddMarketplaceType = lazy(() => import("../admin/pages/AddMarketplaceType.jsx"));
const CreateBillingCycle = lazy(() => import("../admin/pages/CreateBillingCycle"));
const ManageServices = lazy(() => import("../admin/pages/ManageServices"));
const AddService = lazy(() => import("../admin/pages/AddService"));
const LastestUpdates = lazy(() => import("../admin/pages/LastestUpdates"));
const ViewLead = lazy(() => import("../admin/pages/ViewLead"));
const AddState = lazy(() => import("../admin/pages/AddState"));
const ManageState = lazy(() => import("../admin/pages/ManageState"));
const ManageSellers = lazy(() => import("../admin/pages/ManageSellers"));
const CreateSeller = lazy(() => import("../admin/pages/CreateSeller"));
const ManageTeams = lazy(() => import("../admin/pages/ManageTeams"));
const AddTeam = lazy(() => import("../admin/pages/AddTeam"));
const ManageRoles = lazy(() => import("../admin/pages/ManageRoles"));
const Agreement = lazy(() => import("../admin/pages/Agreement"));
const ChangePassword = lazy(() => import("../admin/pages/ChangePassword"));
const Login = lazy(() => import("../admin/pages/Login"));
const ManageLeads = lazy(() => import("../admin/pages/ManageLeads"));
const CreateLead = lazy(() => import("../admin/pages/CreateLead"));
const ManageUpdates = lazy(() => import("../admin/pages/ManageUpdates"));
const Notifications = lazy(() => import("../admin/pages/Notifications"));
const RejectedTasks = lazy(() => import("../admin/pages/RejectedTasks"));
const ViewSummary = lazy(() => import("../admin/pages/ViewSummary"));
const AddRole = lazy(() => import("../admin/pages/AddRole"));
const RoleAccess = lazy(() => import("../admin/pages/RoleAccess"));
const ViewSeller = lazy(() => import("../admin/pages/ViewSeller")); // <-- add this
const CreateServicesTypes = lazy(() => import("../admin/pages/CreateServicesTypes"));
const ManageServiceTypes = lazy(() => import("../admin/pages/ManageServiceTypes"));
const CreateServicesActivities = lazy(() => import("../admin/pages/CreateServicesActivities"));
const ManageServiceActivities = lazy(() => import("../admin/pages/ManageServiceActivities"));
const ManageDigitalMarketPricing = lazy(() => import("../admin/pages/ManageDigitalMarketPricing"));
const CreateDigitalMarketPricing = lazy(() => import("../admin/pages/CreateDigitalMarketPricing"));

const MarketplaceType = lazy(() => import("../admin/pages/MarketplaceType"));
const ManageServicesType = lazy(() => import("../admin/pages/ManageServicesType"));
const ManageDepartments = lazy(() => import("../admin/pages/ManageDepartments"));
const AddServicesType = lazy(() => import("../admin/pages/AddServicesType"));
const AddDepartment = lazy(() => import("../admin/pages/AddDepartment"));
const ManageBilling = lazy(() => import("../admin/pages/ManageBilling"));
const ManageProductListing = lazy(() => import("../admin/pages/ManageProductListing"));
const AddProductListing = lazy(() => import("../admin/pages/AddProductListing"));
const ManageComissionPricing = lazy(() => import("../admin/pages/ManageComissionPricing"));
const CommissionPricing = lazy(() => import("../admin/pages/CommissionPricing"));
const EditSeller = lazy(() => import("../admin/pages/EditSeller"));
const LeadStatus = lazy(() => import("../admin/pages/LeadStatus"));
const ManageLeadsStatus = lazy(() => import("../admin/pages/ManageLeadsStatus"));
const Invoice = lazy(() => import("../admin/pages/Invoice"));
const ManageSupport = lazy(() => import("../admin/pages/ManageSupport"));
const AddSupport = lazy(() => import("../admin/pages/AddSupport"));
const ManageBusinessType = lazy(() => import("../admin/pages/ManageBusinessType.jsx"));
const AddBusinessType = lazy(() => import("../admin/pages/AddBusinessType.jsx"));
const ManageLeadSource = lazy(() => import("../admin/pages/ManageLeadSource.jsx"));
const AddLeadSource = lazy(() => import("../admin/pages/AddLeadSource.jsx"));
const EditTeamLatestUpdates = lazy(() => import("../admin/pages/EditLatestUpdates.jsx"));
const ManageWing = lazy(() => import("../admin/pages/ManageWings.jsx"));
const AddWing = lazy(() => import("../admin/pages/AddWing.jsx"));
const ManageDocCategory = lazy(() => import("../admin/pages/ManageDocumentCategory.jsx"));
const AddDocCatgeory = lazy(() => import("../admin/pages/AddDocumentCatgeory.jsx"));
const AddProduct = lazy(() => import("../admin/pages/AddProduct.jsx"));
const ManageProduct = lazy(() => import("../admin/pages/ManageProduct.jsx"));
const OrderDetails = lazy(() => import("../admin/pages/OrderDetails.jsx"));

const ManageDocType = lazy(() => import("../admin/pages/ManageDocType.jsx"));
const AddDocType = lazy(() => import("../admin/pages/AddDocType.jsx"));

const ManageSubDepartments = lazy(() => import("../admin/pages/ManageSubDepartment.jsx"));
const AddSubDepartment = lazy(() => import("../admin/pages/AddSubDepartment.jsx"));
const BulkUpload = lazy(() => import("../admin/pages/BulkUpload.jsx"));
const ManageReports = lazy(() => import("../admin/pages/ManageReports.jsx"));
const ManageOrders = lazy(() => import("../admin/pages/ManageOrders.jsx"));
const AddOrders = lazy(() => import("../admin/pages/AddOrders.jsx"));
const ManageSubOrders = lazy(() => import("../admin/pages/ManageSubOrders.jsx"));
const AddSubOrders = lazy(() => import("../admin/pages/AddSubOrders.jsx"));
const ManageIssueType = lazy(() => import("../admin/pages/ManageIssueType.jsx"));
const AddIssueType = lazy(() => import("../admin/pages/AddIssueType.jsx"));
const ManageSupportStatus = lazy(() => import("../admin/pages/ManageSupportStatus.jsx"));
const AddSupportStatus = lazy(() => import("../admin/pages/AddSupportStatus.jsx"));
export default function AdminRoutes() {
  return (
    <Routes>
       <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/add-market-type"
            element={
              <AdminRoute>
                <AddMarketplaceType />
              </AdminRoute>
            }
          />
          <Route
            path="/view-lead/:id"
            element={
              <AdminRoute>
                <ViewLead />
              </AdminRoute>
            }
          />
          <Route
            path="/view-seller/:id"
            element={
              <AdminRoute>
                <ViewSeller />
              </AdminRoute>
            }
          />
          <Route
            path="/edit-seller/:id"
            element={
              <AdminRoute>
                <EditSeller />
              </AdminRoute>
            }
          />
          <Route
            path="/latest-updates"
            element={
              <AdminRoute>
                <LastestUpdates />
              </AdminRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <AdminRoute>
                <ManageReports />
              </AdminRoute>
            }
          />
          <Route
            path="/edit-latest-updates/:id"
            element={
              <AdminRoute>
                <EditTeamLatestUpdates />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-roles-features"
            element={
              <AdminRoute>
                <RoleAccess />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-billing"
            element={
              <AdminRoute>
                <ManageBilling />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-marketplace"
            element={
              <AdminRoute>
                <ManageServicesType />
              </AdminRoute>
            }
          />
          {/* new order */}
          <Route
            path="/manage-orders"
            element={
              <AdminRoute>
                <ManageOrders />
              </AdminRoute>
            }
          />
          {/* new order */}
          <Route
            path="/support"
            element={
              <AdminRoute>
                <ManageSupport />
              </AdminRoute>
            }
          />
          <Route
            path="/add-support"
            element={
              <AdminRoute>
                <AddSupport />
              </AdminRoute>
            }
          />
          <Route
            path="/edit-support/:id"
            element={
              <AdminRoute>
                <AddSupport />
              </AdminRoute>
            }
          />
          <Route
            path="/add-orders"
            element={
              <AdminRoute>
                <AddOrders />
              </AdminRoute>
            }
          />
          <Route
            path="/order-details"
            element={
              <AdminRoute>
                <OrderDetails />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-sub-orders"
            element={
              <AdminRoute>
                <ManageSubOrders />
              </AdminRoute>
            }
          />
          <Route
            path="/add-sub-orders"
            element={
              <AdminRoute>
                <AddSubOrders />
              </AdminRoute>
            }
          />
          <Route path="/edit-sub-order/:id" element={<AddSubOrders />} />
          <Route
            path="/manage-business-type"
            element={
              <AdminRoute>
                <ManageBusinessType />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-lead-source"
            element={
              <AdminRoute>
                <ManageLeadSource />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-services"
            element={
              <AdminRoute>
                <ManageServices />
              </AdminRoute>
            }
          />
          <Route
            path="/market-place-type"
            element={
              <AdminRoute>
                <MarketplaceType />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-wings"
            element={
              <AdminRoute>
                <ManageWing />
              </AdminRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-products"
            element={
              <AdminRoute>
                <ManageProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/bulk-upload"
            element={
              <AdminRoute>
                <BulkUpload />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-departments"
            element={
              <AdminRoute>
                <ManageDepartments />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-sub-departments"
            element={
              <AdminRoute>
                <ManageSubDepartments />
              </AdminRoute>
            }
          />
          <Route
            path="/add-service"
            element={
              <AdminRoute>
                <AddService />
              </AdminRoute>
            }
          />
          <Route
            path="/create-department"
            element={
              <AdminRoute>
                <AddDepartment />
              </AdminRoute>
            }
          />
          <Route
            path="/create-sub-department"
            element={
              <AdminRoute>
                <AddSubDepartment />
              </AdminRoute>
            }
          />
          <Route
            path="/create-wing"
            element={
              <AdminRoute>
                <AddWing />
              </AdminRoute>
            }
          />
          <Route
            path="/create-billing"
            element={
              <AdminRoute>
                <CreateBillingCycle />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-product-listing"
            element={
              <AdminRoute>
                <ManageProductListing />
              </AdminRoute>
            }
          />
          <Route
            path="/add-product-listing"
            element={
              <AdminRoute>
                <AddProductListing />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-commission"
            element={
              <AdminRoute>
                <ManageComissionPricing />
              </AdminRoute>
            }
          />
          <Route
            path="/create-commission"
            m
            element={
              <AdminRoute>
                <CommissionPricing />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-digital-marketing-price"
            element={
              <AdminRoute>
                <ManageDigitalMarketPricing />
              </AdminRoute>
            }
          />
          <Route
            path="/create-digital-marketing-price"
            element={
              <AdminRoute>
                <CreateDigitalMarketPricing />
              </AdminRoute>
            }
          />
          <Route
            path="/leads-status"
            element={
              <AdminRoute>
                <LeadStatus />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-leads-status"
            element={
              <AdminRoute>
                <ManageLeadsStatus />
              </AdminRoute>
            }
          />
          <Route
            path="/add-marketplacetype"
            element={
              <AdminRoute>
                <AddServicesType />
              </AdminRoute>
            }
          />
          <Route
            path="/add-business-type"
            element={
              <AdminRoute>
                <AddBusinessType />
              </AdminRoute>
            }
          />
          <Route
            path="/add-lead-source"
            element={
              <AdminRoute>
                <AddLeadSource />
              </AdminRoute>
            }
          />
          <Route
            path="/add-state"
            element={
              <AdminRoute>
                <AddState />
              </AdminRoute>
            }
          />
          <Route
            path="/add-role"
            element={
              <AdminRoute>
                <AddRole />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-state"
            element={
              <AdminRoute>
                <ManageState />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-sellers"
            element={
              <AdminRoute>
                <ManageSellers />
              </AdminRoute>
            }
          />
          <Route
            path="/create-seller"
            element={
              <AdminRoute>
                <CreateSeller />
              </AdminRoute>
            }
          />
          <Route
            path="/add-team"
            element={
              <AdminRoute>
                <AddTeam />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-team"
            element={
              <AdminRoute>
                <ManageTeams />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-roles"
            element={
              <AdminRoute>
                <ManageRoles />
              </AdminRoute>
            }
          />
          <Route
            path="/agreement"
            element={
              <AdminRoute>
                <Agreement />
              </AdminRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <AdminRoute>
                <ChangePassword />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-leads"
            element={
              <AdminRoute>
                <ManageLeads />
              </AdminRoute>
            }
          />
          <Route
            path="/create-lead"
            element={
              <AdminRoute>
                <CreateLead />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-updates"
            element={
              <AdminRoute>
                <ManageUpdates />
              </AdminRoute>
            }
          />
          <Route
            path="/view-notifications"
            element={
              <AdminRoute>
                <Notifications />
              </AdminRoute>
            }
          />
          <Route
            path="/rejected-tasks"
            element={
              <AdminRoute>
                <RejectedTasks />
              </AdminRoute>
            }
          />
          <Route
            path="/view-summary"
            element={
              <AdminRoute>
                <ViewSummary />
              </AdminRoute>
            }
          />
          <Route
            path="/in-voice"
            element={
              <AdminRoute>
                <Invoice />
              </AdminRoute>
            }
          />

          {/* Serices Types */}
          <Route
            path="/create-service-activities"
            element={
              <AdminRoute>
                <CreateServicesActivities />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-service-types"
            element={
              <AdminRoute>
                <ManageServiceTypes />
              </AdminRoute>
            }
          />
          <Route
            path="/create-service-type"
            element={
              <AdminRoute>
                <CreateServicesTypes />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-service-activities"
            element={
              <AdminRoute>
                <ManageServiceActivities />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-document-category"
            element={
              <AdminRoute>
                <ManageDocCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/add-document-category"
            element={
              <AdminRoute>
                <AddDocCatgeory />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-document-type"
            element={
              <AdminRoute>
                <ManageDocType />
              </AdminRoute>
            }
          />
          <Route
            path="/add-document-type"
            element={
              <AdminRoute>
                <AddDocType />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-issue-type"
            element={
              <AdminRoute>
                <ManageIssueType />
              </AdminRoute>
            }
          />

          <Route
            path="/add-issue-type"
            element={
              <AdminRoute>
                <AddIssueType />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-support-status"
            element={
              <AdminRoute>
                <ManageSupportStatus />
              </AdminRoute>
            }
          />

          <Route
            path="/add-support-status"
            element={
              <AdminRoute>
                <AddSupportStatus />
              </AdminRoute>
            }
          />
    </Routes>
  );
}
