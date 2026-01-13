import React , { Suspense, lazy }from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminRoute, SellerRoute, TeamRoute } from "./routes/RoleRoutes";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

// Admin Pages
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard"));
const AddMarketplaceType = lazy(() => import("./admin/pages/AddMarketplaceType.jsx"));
const CreateBillingCycle = lazy(() => import("./admin/pages/CreateBillingCycle"));
const ManageServices = lazy(() => import("./admin/pages/ManageServices"));
const AddService = lazy(() => import("./admin/pages/AddService"));
const LastestUpdates = lazy(() => import("./admin/pages/LastestUpdates"));
const ViewLead = lazy(() => import("./admin/pages/ViewLead"));
const AddState = lazy(() => import("./admin/pages/AddState"));
const ManageState = lazy(() => import("./admin/pages/ManageState"));
const ManageSellers = lazy(() => import("./admin/pages/ManageSellers"));
const CreateSeller = lazy(() => import("./admin/pages/CreateSeller"));
const ManageTeams = lazy(() => import("./admin/pages/ManageTeams"));
const AddTeam = lazy(() => import("./admin/pages/AddTeam"));
const ManageRoles = lazy(() => import("./admin/pages/ManageRoles"));
const Agreement = lazy(() => import("./admin/pages/Agreement"));
const ChangePassword = lazy(() => import("./admin/pages/ChangePassword"));
const Login = lazy(() => import("./admin/pages/Login"));
const ManageLeads = lazy(() => import("./admin/pages/ManageLeads"));
const CreateLead = lazy(() => import("./admin/pages/CreateLead"));
const ManageUpdates = lazy(() => import("./admin/pages/ManageUpdates"));
const Notifications = lazy(() => import("./admin/pages/Notifications"));
const RejectedTasks = lazy(() => import("./admin/pages/RejectedTasks"));
const ViewSummary = lazy(() => import("./admin/pages/ViewSummary"));
const AddRole = lazy(() => import("./admin/pages/AddRole"));
const RoleAccess = lazy(() => import("./admin/pages/RoleAccess"));
const ViewSeller = lazy(() => import("./admin/pages/ViewSeller")); // <-- add this
const CreateServicesTypes = lazy(() => import("./admin/pages/CreateServicesTypes"));
const ManageServiceTypes = lazy(() => import("./admin/pages/ManageServiceTypes"));
const CreateServicesActivities = lazy(() => import("./admin/pages/CreateServicesActivities"));
const ManageServiceActivities = lazy(() => import("./admin/pages/ManageServiceActivities"));
const ManageDigitalMarketPricing = lazy(() => import("./admin/pages/ManageDigitalMarketPricing"));
const CreateDigitalMarketPricing = lazy(() => import("./admin/pages/CreateDigitalMarketPricing"));

const MarketplaceType = lazy(() => import("./admin/pages/MarketplaceType"));
const ManageServicesType = lazy(() => import("./admin/pages/ManageServicesType"));
const ManageDepartments = lazy(() => import("./admin/pages/ManageDepartments"));
const AddServicesType = lazy(() => import("./admin/pages/AddServicesType"));
const AddDepartment = lazy(() => import("./admin/pages/AddDepartment"));
const ManageBilling = lazy(() => import("./admin/pages/ManageBilling"));
const ManageProductListing = lazy(() => import("./admin/pages/ManageProductListing"));
const AddProductListing = lazy(() => import("./admin/pages/AddProductListing"));
const ManageComissionPricing = lazy(() => import("./admin/pages/ManageComissionPricing"));
const CommissionPricing = lazy(() => import("./admin/pages/CommissionPricing"));
const EditSeller = lazy(() => import("./admin/pages/EditSeller"));
const LeadStatus = lazy(() => import("./admin/pages/LeadStatus"));
const ManageLeadsStatus = lazy(() => import("./admin/pages/ManageLeadsStatus"));
const Invoice = lazy(() => import("./admin/pages/Invoice"));
const ManageSupport = lazy(() => import("./admin/pages/ManageSupport"));
const AddSupport = lazy(() => import("./admin/pages/AddSupport"));

// Team Pages
const TeamDashboard = lazy(() => import("./Team/pages/Dashboard"));
const TeamManageLeads = lazy(() => import("./Team/pages/ManageLeads"));
const TeamTasks = lazy(() => import("./Team/pages/TeamTasks"));
const TeamLastestUpdates = lazy(() => import("./Team/pages/TeamLastestUpdates"));
const TaskSummary = lazy(() => import("./Team/pages/TaskSummary"));
const TeamNotifications = lazy(() => import("./Team/pages/TeamNotifications"));
const ChangePasswordTeam = lazy(() => import("./Team/pages/ChangePasswordTeam"));
const TeamManageSupport = lazy(() => import("./Team/pages/TeamManageSupport"));
const TeamAddSupport = lazy(() => import("./Team/pages/TeamAddSupport"));
// Seller Pages
const SellerDashboard = lazy(() => import("./Seller/pages/Dashboard"));
const AddProducts = lazy(() => import("./Seller/pages/AddProducts"));
const ManageProducts = lazy(() => import("./Seller/pages/ManageProducts"));
const BusinessInformationForm = lazy(() => import("./Seller/pages/BusinessInformationForm"));
const TaskStatus = lazy(() => import("./Seller/pages/TaskStatus"));
const MouAgreement = lazy(() => import("./Seller/pages/MouAgreement"));
const MouA2 = lazy(() => import("./Seller/pages/MouA2"));
const MouA3 = lazy(() => import("./Seller/pages/MouA3"));
const SellerInvoicePage = lazy(() => import("./Seller/pages/SellerInvoicePage"));
const SellerMarketplaceServices = lazy(() => import("./Seller/pages/SellerMarketplaceServices"));

const TaskSummarySellar = lazy(() => import("./Seller/pages/TaskSummarySellar"));
const ManageBusinessType = lazy(() => import("./admin/pages/ManageBusinessType.jsx"));
const AddBusinessType = lazy(() => import("./admin/pages/AddBusinessType.jsx"));
const ManageLeadSource = lazy(() => import("./admin/pages/ManageLeadSource.jsx"));
const AddLeadSource = lazy(() => import("./admin/pages/AddLeadSource.jsx"));
const EditTeamLatestUpdates = lazy(() => import("./admin/pages/EditLatestUpdates.jsx"));
const SellerLogin = lazy(() => import("./Seller/pages/SellerLogin.jsx"));
const ManageWing = lazy(() => import("./admin/pages/ManageWings.jsx"));
const AddWing = lazy(() => import("./admin/pages/AddWing.jsx"));
const ManageDocCategory = lazy(() => import("./admin/pages/ManageDocumentCategory.jsx"));
const AddDocCatgeory = lazy(() => import("./admin/pages/AddDocumentCatgeory.jsx"));
const AddProduct = lazy(() => import("./admin/pages/AddProduct.jsx"));
const ManageProduct = lazy(() => import("./admin/pages/ManageProduct.jsx"));
const OrderDetails = lazy(() => import("./admin/pages/OrderDetails.jsx"));

const ManageDocType = lazy(() => import("./admin/pages/ManageDocType.jsx"));
const AddDocType = lazy(() => import("./admin/pages/AddDocType.jsx"));
// Exicutive
const ExecutiveDashboard = lazy(() => import("./Executive/pages/ExecutiveDashboard.jsx"));
const ExicutiveManageSellers = lazy(() => import("./Executive/pages/ExicutiveManageSellers.jsx"));
const ExicutiveCreateSellers = lazy(() => import("./Executive/pages/ExicutiveCreateSellers.jsx"));
const ExicutiveCreateLead = lazy(() => import("./Executive/pages/ExicutiveCreateLead.jsx"));
const ExecutiveManageLeads = lazy(() => import("./Executive/pages/ExecutiveManageLeads"));
const ExecutiveLeadStatus = lazy(() => import("./Executive/pages/ExecutiveLeadStatus"));
const ExicutiveManageLeadsStatus = lazy(() => import("./Executive/pages/ExicutiveManageLeadsStatus.jsx"));
const ExicutiveChangePassword = lazy(() => import("./Executive/pages/ExicutiveChangePassword.jsx"));
const ExecutiveLastestUpdates = lazy(() => import("./Executive/pages/ExecutiveLastestUpdates"));
const ExecutiveManageUpdates = lazy(() => import("./Executive/pages/ExecutiveManageUpdates"));
// Accounts
const AccountsDashboard = lazy(() => import("./Accounts/pages/AccountsDashboard.js"));
const InvoiceNotification = lazy(() => import("./Accounts/pages/InvoiceNotification"));
const Taxinvoice = lazy(() => import("./Accounts/pages/Taxinvoice"));
const AccountsInvoice = lazy(() => import("./Accounts/pages/AccountsInvoice"));
const InvoicePage = lazy(() => import("./Accounts/pages/InvoicePage"));
const AccountsChangePassword = lazy(() => import("./Accounts/pages/AccountsChangePassword"));
const ExecutiveEditSeller = lazy(() => import("./Executive/pages/ExecutiveEditSeller.jsx"));
const ExecutiveViewSeller = lazy(() => import("./Executive/pages/ExecutiveViewSeller.jsx"));
const ManagerDocumentView = lazy(() => import("./Executive/pages/ManagerDocument.jsx"));
const SellerExeDashboard = lazy(() => import("./Executive/pages/ExecutiveExeDashboard.jsx"));
const SellerAddProduct = lazy(() => import("./Seller/pages/SellerAddProduct.jsx"));
const SellerManageProduct = lazy(() => import("./Seller/pages/SellerManageProduct"));
const SellerBulkUpload = lazy(() => import("./Seller/pages/SellerBulkUpload.jsx"));
const SellerManageReports = lazy(() => import("./Seller/pages/SellerManageReports.jsx"));
const SellerMarketplace = lazy(() => import("./Seller/pages/SellerMarketplace.jsx"));

const SellerInvoiceList = lazy(() => import("./Seller/pages/sellerInvoiceList.jsx"));
const AccountsInvoices = lazy(() => import("./Accounts/pages/AccountsInvoiceList.jsx"));
const SellerServicesList = lazy(() => import("./Seller/pages/ServicesList.jsx"));
const ManageSubDepartments = lazy(() => import("./admin/pages/ManageSubDepartment.jsx"));
const AddSubDepartment = lazy(() => import("./admin/pages/AddSubDepartment.jsx"));
const LeadViewExecutive = lazy(() => import("./Executive/components/Modal/ViewLeadExecutive.jsx"));
const ExecutiveViewLead = lazy(() => import("./Executive/components/Modal/ViewLeadExecutive.jsx"));
const NotFound = lazy(() => import("./common/404.jsx"));
const ManageSellersTeam = lazy(() => import("./Team/pages/ManageSellers.jsx"));
const ViewSellerDetails = lazy(() => import("./Team/pages/ViewSellerDetails.jsx"));
const TaskSummaryPersonal = lazy(() => import("./Team/pages/TaskSummaryPersonal.jsx"));
const BulkUpload = lazy(() => import("./admin/pages/BulkUpload.jsx"));
const ManageReports = lazy(() => import("./admin/pages/ManageReports.jsx"));
const ManageOrders = lazy(() => import("./admin/pages/ManageOrders.jsx"));
const AddOrders = lazy(() => import("./admin/pages/AddOrders.jsx"));
const ManageSubOrders = lazy(() => import("./admin/pages/ManageSubOrders.jsx"));
const AddSubOrders = lazy(() => import("./admin/pages/AddSubOrders.jsx"));
const SellerManageOrders = lazy(() => import("./Seller/pages/SellerManageOrders.jsx"));
const SellerManageSubOrders = lazy(() => import("./Seller/pages/SellerManageSubOrders.jsx"));
const SellerAddOrder = lazy(() => import("./Seller/pages/SellerAddOrder.jsx"));
const SellerAddSubOrder = lazy(() => import("./Seller/pages/SellerAddSubOrder.jsx"));
const SellerManageSupport = lazy(() => import("./Seller/pages/SellerManageSupport.jsx"));
const SellerAddSupport = lazy(() => import("./Seller/pages/SellerAddSupport.jsx"));
const ManageIssueType = lazy(() => import("./admin/pages/ManageIssueType.jsx"));
const AddIssueType = lazy(() => import("./admin/pages/AddIssueType.jsx"));
const ManageSupportStatus = lazy(() => import("./admin/pages/ManageSupportStatus.jsx"));
const AddSupportStatus = lazy(() => import("./admin/pages/AddSupportStatus.jsx"));

/* ---------------- Lazy common ---------------- */
const ToastContainer = lazy(() =>
  import("react-toastify").then((m) => ({ default: m.ToastContainer }))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Admin Routes */}
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
          {/* Team Routes */}
          <Route
            path="/team/dashboard"
            element={
              <TeamRoute>
                <TeamDashboard />
              </TeamRoute>
            }
          />
          <Route
            path="/team/latest-updates"
            element={
              <TeamRoute>
                <TeamLastestUpdates />
              </TeamRoute>
            }
          />
          <Route
            path="/team/manage-leads"
            element={
              <TeamRoute>
                <TeamManageLeads />
              </TeamRoute>
            }
          />
          <Route
            path="/team/manage-sellers"
            element={
              <TeamRoute>
                <ManageSellersTeam />
              </TeamRoute>
            }
          />
          <Route
            path="/team/view-seller/:id"
            element={
              <TeamRoute>
                <ViewSellerDetails />
              </TeamRoute>
            }
          />
          <Route
            path="/team/team-tasks"
            element={
              <TeamRoute>
                <TeamTasks />
              </TeamRoute>
            }
          />
          <Route
            path="/team/task-summary"
            element={
              <TeamRoute>
                <TaskSummary />
              </TeamRoute>
            }
          />
          <Route
            path="/team/my-task-summary/:id"
            element={
              <TeamRoute>
                <TaskSummaryPersonal />
              </TeamRoute>
            }
          />
          <Route
            path="/team/team-notification"
            element={
              <TeamRoute>
                <TeamNotifications />
              </TeamRoute>
            }
          />
          <Route
            path="/team/add-support"
            element={
              <TeamRoute>
                <TeamAddSupport />
              </TeamRoute>
            }
          />
          <Route
            path="/team/edit-support/:id"
            element={
              <TeamRoute>
                <TeamAddSupport />
              </TeamRoute>
            }
          />
          <Route
            path="/team/support"
            element={
              <TeamRoute>
                <TeamManageSupport />
              </TeamRoute>
            }
          />
          <Route
            path="/team/change-password"
            element={
              <TeamRoute>
                <ChangePasswordTeam />
              </TeamRoute>
            }
          />

          {/* Seller Routes */}
          <Route path="/seller/login" element={<SellerLogin />} />
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

          {/* Executive Routes */}
          <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
          <Route
            path="/executive/exe/dashboard"
            element={<SellerExeDashboard />}
          />
          <Route
            path="/executive/manage-seller"
            element={<ExicutiveManageSellers />}
          />
          <Route
            path="/executive/create-seller"
            element={<ExicutiveCreateSellers />}
          />
          <Route
            path="/executive/edit-seller/:id"
            element={<ExecutiveEditSeller />}
          />
          <Route
            path="/executive/view-seller/:id"
            element={<ExecutiveViewSeller />}
          />
          <Route
            path="/executive/create-lead"
            element={<ExicutiveCreateLead />}
          />
          <Route
            path="/executive/manage-leads"
            element={<ExecutiveManageLeads />}
          />
          <Route
            path="/executive/leads-status"
            element={<ExecutiveLeadStatus />}
          />
          <Route
            path="/executive/manage-leads-status"
            element={<ExicutiveManageLeadsStatus />}
          />
          <Route
            path="/executive/change-password"
            element={<ExicutiveChangePassword />}
          />
          <Route
            path="/executive/latest-updates"
            element={<ExecutiveLastestUpdates />}
          />
          <Route
            path="/executive/manage-updates"
            element={<ExecutiveManageUpdates />}
          />
          <Route
            path="/executive/view-lead/:id"
            element={<ExecutiveViewLead />}
          />

          {/* Accounts Routes */}
          <Route path="/accounts/dashboard" element={<AccountsDashboard />} />
          <Route
            path="/accounts/invoice-notification"
            element={<InvoiceNotification />}
          />
          <Route path="/accounts/invoice-list" element={<AccountsInvoices />} />
          <Route path="/accounts/create-invoice/:id" element={<Taxinvoice />} />
          <Route path="/accounts/invoice" element={<AccountsInvoice />} />
          <Route
            path="/accounts/invoice/:invoiceNumber"
            element={<InvoicePage />}
          />
          <Route
            path="/accounts/change-password"
            element={<AccountsChangePassword />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Suspense fallback={null}>
          <ToastContainer position="top-right" autoClose={3000} />
        </Suspense>
      </Suspense>
    </Router>
  );
}

export default App;
