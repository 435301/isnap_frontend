import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminRoute, SellerRoute, TeamRoute } from "./routes/RoleRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

// Admin Pages
import AdminDashboard from "./admin/pages/Dashboard";
import AddMarketplaceType from "./admin/pages/AddMarketplaceType.jsx";
import CreateBillingCycle from "./admin/pages/CreateBillingCycle";
import ManageServices from "./admin/pages/ManageServices";
import AddService from "./admin/pages/AddService";
import LastestUpdates from "./admin/pages/LastestUpdates";
import ViewLead from "./admin/pages/ViewLead";
import AddState from "./admin/pages/AddState";
import ManageState from "./admin/pages/ManageState";
import ManageSellers from "./admin/pages/ManageSellers";
import CreateSeller from "./admin/pages/CreateSeller";
import ManageTeams from "./admin/pages/ManageTeams";
import AddTeam from "./admin/pages/AddTeam";
import ManageRoles from "./admin/pages/ManageRoles";
import Agreement from "./admin/pages/Agreement";
import ChangePassword from "./admin/pages/ChangePassword";
import Login from "./admin/pages/Login";
import ManageLeads from "./admin/pages/ManageLeads";
import CreateLead from "./admin/pages/CreateLead";
import ManageUpdates from "./admin/pages/ManageUpdates";
import Notifications from "./admin/pages/Notifications";
import RejectedTasks from "./admin/pages/RejectedTasks";
import ViewSummary from "./admin/pages/ViewSummary";
import AddRole from "./admin/pages/AddRole";
import RoleAccess from "./admin/pages/RoleAccess";
import ViewSeller from "./admin/pages/ViewSeller"; // <-- add this
import CreateServicesTypes from "./admin/pages/CreateServicesTypes";
import ManageServiceTypes from "./admin/pages/ManageServiceTypes";
import CreateServicesActivities from "./admin/pages/CreateServicesActivities";
import ManageServiceActivities from "./admin/pages/ManageServiceActivities";
import ManageDigitalMarketPricing from "./admin/pages/ManageDigitalMarketPricing";
import CreateDigitalMarketPricing from "./admin/pages/CreateDigitalMarketPricing";

import MarketplaceType from "./admin/pages/MarketplaceType";
import ManageServicesType from "./admin/pages/ManageServicesType";
import ManageDepartments from "./admin/pages/ManageDepartments";
import AddServicesType from "./admin/pages/AddServicesType";
import AddDepartment from "./admin/pages/AddDepartment";
import ManageBilling from "./admin/pages/ManageBilling";
import ManageProductListing from "./admin/pages/ManageProductListing";
import AddProductListing from "./admin/pages/AddProductListing";
import ManageComissionPricing from "./admin/pages/ManageComissionPricing";
import CommissionPricing from "./admin/pages/CommissionPricing";
import EditSeller from "./admin/pages/EditSeller";
import LeadStatus from "./admin/pages/LeadStatus";
import ManageLeadsStatus from "./admin/pages/ManageLeadsStatus";
import Invoice from "./admin/pages/Invoice";

// Team Pages
import TeamDashboard from "./Team/pages/Dashboard";
import TeamManageLeads from "./Team/pages/ManageLeads";
import TeamTasks from "./Team/pages/TeamTasks";
import TeamLastestUpdates from "./Team/pages/TeamLastestUpdates";
import TaskSummary from "./Team/pages/TaskSummary";
import TeamNotifications from "./Team/pages/TeamNotifications";
import ChangePasswordTeam from "./Team/pages/ChangePasswordTeam";

// Seller Pages
import SellerDashboard from "./Seller/pages/Dashboard";
import AddProducts from "./Seller/pages/AddProducts";
import ManageProducts from "./Seller/pages/ManageProducts";
import BusinessInformationForm from "./Seller/pages/BusinessInformationForm";
import TaskStatus from "./Seller/pages/TaskStatus";
import MouAgreement from "./Seller/pages/MouAgreement";
import MouA2 from "./Seller/pages/MouA2";
import MouA3 from "./Seller/pages/MouA3";
import SellerInvoicePage from "./Seller/pages/SellerInvoicePage";


import TaskSummarySellar from "./Seller/pages/TaskSummarySellar";
import ManageBusinessType from "./admin/pages/ManageBusinessType.jsx";
import AddBusinessType from "./admin/pages/AddBusinessType.jsx";
import ManageLeadSource from "./admin/pages/ManageLeadSource.jsx";
import AddLeadSource from "./admin/pages/AddLeadSource.jsx";
import EditTeamLatestUpdates from "./admin/pages/EditLatestUpdates.jsx";
import SellerLogin from "./Seller/pages/SellerLogin.jsx";
import ManageWing from "./admin/pages/ManageWings.jsx";
import AddWing from "./admin/pages/AddWing.jsx";
import ManageDocCategory from "./admin/pages/ManageDocumentCategory.jsx";
import AddDocCatgeory from "./admin/pages/AddDocumentCatgeory.jsx";
import ManageDocType from "./admin/pages/ManageDocType.jsx";
import AddDocType from "./admin/pages/AddDocType.jsx";
// Exicutive
import ExecutiveDashboard from "./Executive/pages/ExecutiveDashboard.jsx";
import ExicutiveManageSellers from "./Executive/pages/ExicutiveManageSellers.jsx";
import ExicutiveCreateSellers from "./Executive/pages/ExicutiveCreateSellers.jsx";
import ExicutiveCreateLead from "./Executive/pages/ExicutiveCreateLead.jsx";
import ExecutiveManageLeads from "./Executive/pages/ExecutiveManageLeads";
import ExecutiveLeadStatus from "./Executive/pages/ExecutiveLeadStatus";
import ExicutiveManageLeadsStatus from "./Executive/pages/ExicutiveManageLeadsStatus.jsx";
import ExicutiveChangePassword from "./Executive/pages/ExicutiveChangePassword.jsx";
import ExecutiveLastestUpdates from "./Executive/pages/ExecutiveLastestUpdates";
import ExecutiveManageUpdates from "./Executive/pages/ExecutiveManageUpdates";
// Accounts
import AccountsDashboard from "./Accounts/pages/AccountsDashboard.js";
import InvoiceNotification from './Accounts/pages/InvoiceNotification';
import Taxinvoice from "./Accounts/pages/Taxinvoice";
import AccountsInvoice from "./Accounts/pages/AccountsInvoice";
import InvoicePage from './Accounts/pages/InvoicePage';
import AccountsChangePassword from './Accounts/pages/AccountsChangePassword';
import ExecutiveEditSeller from "./Executive/pages/ExecutiveEditSeller.jsx";
import ExecutiveViewSeller from "./Executive/pages/ExecutiveViewSeller.jsx";
import ManagerDocumentView from "./Executive/pages/ManagerDocument.jsx";
import SellerExeDashboard from "./Executive/pages/ExecutiveExeDashboard.jsx";
import SellerInvoiceList from "./Seller/pages/sellerInvoiceList.jsx";
import AccountsInvoices from "./Accounts/pages/AccountsInvoiceList.jsx";
import SellerServicesList from "./Seller/pages/ServicesList.jsx";
import ManageSubDepartments from "./admin/pages/ManageSubDepartment.jsx";
import AddSubDepartment from "./admin/pages/AddSubDepartment.jsx";
import LeadViewExecutive from "./Executive/components/Modal/ViewLeadExecutive.jsx";
import ExecutiveViewLead from "./Executive/components/Modal/ViewLeadExecutive.jsx";
import NotFound from "./common/404.jsx";
import ManageSellersTeam from "./Team/pages/ManageSellers.jsx";
import ViewSellerDetails from "./Team/pages/ViewSellerDetails.jsx";
import TaskSummaryPersonal from "./Team/pages/TaskSummaryPersonal.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/add-market-type" element={<AdminRoute><AddMarketplaceType /></AdminRoute>} />
        <Route path="/view-lead/:id" element={<AdminRoute><ViewLead /></AdminRoute>} />
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
        <Route path="/latest-updates" element={<AdminRoute><LastestUpdates /></AdminRoute>} />
        <Route path="/edit-latest-updates/:id" element={<AdminRoute><EditTeamLatestUpdates /></AdminRoute>} />
        <Route path="/manage-roles-features" element={<AdminRoute><RoleAccess /></AdminRoute>} />
        <Route path="/manage-billing" element={<AdminRoute><ManageBilling /></AdminRoute>} />
        <Route path="/manage-marketplace" element={<AdminRoute><ManageServicesType /></AdminRoute>} />
        <Route path="/manage-business-type" element={<AdminRoute><ManageBusinessType /></AdminRoute>} />
        <Route path="/manage-lead-source" element={<AdminRoute><ManageLeadSource /></AdminRoute>} />
        <Route path="/manage-services" element={<AdminRoute><ManageServices /></AdminRoute>} />
        <Route path="/market-place-type" element={<AdminRoute><MarketplaceType /></AdminRoute>} />
        <Route path="/manage-wings" element={<AdminRoute><ManageWing /></AdminRoute>} />
        <Route path="/manage-departments" element={<AdminRoute><ManageDepartments /></AdminRoute>} />
        <Route path="/manage-sub-departments" element={<AdminRoute><ManageSubDepartments /></AdminRoute>} />
        <Route path="/add-service" element={<AdminRoute><AddService /></AdminRoute>} />
        <Route path="/create-department" element={<AdminRoute><AddDepartment /></AdminRoute>} />
        <Route path="/create-sub-department" element={<AdminRoute><AddSubDepartment /></AdminRoute>} />
        <Route path="/create-wing" element={<AdminRoute><AddWing /></AdminRoute>} />
        <Route path="/create-billing" element={<AdminRoute><CreateBillingCycle /></AdminRoute>} />
        <Route path="/manage-product-listing" element={<AdminRoute><ManageProductListing /></AdminRoute>} />
        <Route path="/add-product-listing" element={<AdminRoute><AddProductListing /></AdminRoute>} />
        <Route path="/manage-commission" element={<AdminRoute><ManageComissionPricing /></AdminRoute>} />
        <Route path="/create-commission" m element={<AdminRoute><CommissionPricing /></AdminRoute>} />
        <Route path="/manage-digital-marketing-price" element={<AdminRoute><ManageDigitalMarketPricing /></AdminRoute>} />
        <Route path="/create-digital-marketing-price" element={<AdminRoute><CreateDigitalMarketPricing /></AdminRoute>} />
        <Route path="/leads-status" element={<AdminRoute><LeadStatus /></AdminRoute>} />
        <Route path="/manage-leads-status" element={<AdminRoute><ManageLeadsStatus /></AdminRoute>} />
        <Route path="/add-marketplacetype" element={<AdminRoute><AddServicesType /></AdminRoute>} />
        <Route path="/add-business-type" element={<AdminRoute><AddBusinessType /></AdminRoute>} />
        <Route path="/add-lead-source" element={<AdminRoute><AddLeadSource /></AdminRoute>} />
        <Route path="/add-state" element={<AdminRoute><AddState /></AdminRoute>} />
        <Route path="/add-role" element={<AdminRoute><AddRole /></AdminRoute>} />
        <Route path="/manage-state" element={<AdminRoute><ManageState /></AdminRoute>} />
        <Route path="/manage-sellers" element={<AdminRoute><ManageSellers /></AdminRoute>} />
        <Route path="/create-seller" element={<AdminRoute><CreateSeller /></AdminRoute>} />
        <Route path="/add-team" element={<AdminRoute><AddTeam /></AdminRoute>} />
        <Route path="/manage-team" element={<AdminRoute><ManageTeams /></AdminRoute>} />
        <Route path="/manage-roles" element={<AdminRoute><ManageRoles /></AdminRoute>} />
        <Route path="/agreement" element={<AdminRoute><Agreement /></AdminRoute>} />
        <Route path="/change-password" element={<AdminRoute><ChangePassword /></AdminRoute>} />
        <Route path="/manage-leads" element={<AdminRoute><ManageLeads /></AdminRoute>} />
        <Route path="/create-lead" element={<AdminRoute><CreateLead /></AdminRoute>} />
        <Route path="/manage-updates" element={<AdminRoute><ManageUpdates /></AdminRoute>} />
        <Route path="/view-notifications" element={<AdminRoute><Notifications /></AdminRoute>} />
        <Route path="/rejected-tasks" element={<AdminRoute><RejectedTasks /></AdminRoute>} />
        <Route path="/view-summary" element={<AdminRoute><ViewSummary /></AdminRoute>} />
        <Route path="/in-voice" element={<AdminRoute><Invoice /></AdminRoute>} />

        {/* Serices Types */}
        <Route path="/create-service-activities" element={<AdminRoute><CreateServicesActivities /></AdminRoute>} />
        <Route path="/manage-service-types" element={<AdminRoute><ManageServiceTypes /></AdminRoute>} />
        <Route path="/create-service-type" element={<AdminRoute><CreateServicesTypes /></AdminRoute>} />
        <Route path="/manage-service-activities" element={<AdminRoute><ManageServiceActivities /></AdminRoute>} />
        <Route path="/manage-document-category" element={<AdminRoute><ManageDocCategory /></AdminRoute>} />
        <Route path="/add-document-category" element={<AdminRoute><AddDocCatgeory /></AdminRoute>} />
        <Route path="/manage-document-type" element={<AdminRoute><ManageDocType /></AdminRoute>} />
        <Route path="/add-document-type" element={<AdminRoute><AddDocType /></AdminRoute>} />


        {/* Team Routes */}
        <Route path="/team/dashboard" element={<TeamRoute><TeamDashboard /></TeamRoute>} />
        <Route path="/team/latest-updates" element={<TeamRoute><TeamLastestUpdates /></TeamRoute>} />
        <Route path="/team/manage-leads" element={<TeamRoute><TeamManageLeads /></TeamRoute>} />
        <Route path="/team/manage-sellers" element={<TeamRoute><ManageSellersTeam /></TeamRoute>} />
        <Route path="/team/view-seller/:id" element={<TeamRoute><ViewSellerDetails /></TeamRoute>} />
        <Route path="/team/team-tasks" element={<TeamRoute><TeamTasks /></TeamRoute>} />
        <Route path="/team/task-summary" element={<TeamRoute><TaskSummary /></TeamRoute>} />
        <Route path="/team/my-task-summary/:id" element={<TeamRoute><TaskSummaryPersonal /></TeamRoute>} />
        <Route path="/team/team-notification" element={<TeamRoute><TeamNotifications /></TeamRoute>} />
        <Route path="/team/change-password" element={<TeamRoute><ChangePasswordTeam /></TeamRoute>} />

        {/* Seller Routes */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
        <Route path="/seller/add-products" element={<SellerRoute><AddProducts /></SellerRoute>} />
        <Route path="/seller/mou-1" element={<SellerRoute><MouAgreement /></SellerRoute>} />
        <Route path="/seller/mou-2" element={<SellerRoute><MouA2 /></SellerRoute>} />
        <Route path="/seller/mou-3" element={<SellerRoute><MouA3 /></SellerRoute>} />
        <Route path="/seller/manage-products" element={<SellerRoute><ManageProducts /></SellerRoute>} />
        <Route path="/seller/business-information" element={<SellerRoute><BusinessInformationForm /></SellerRoute>} />
        <Route path="/seller/task" element={<SellerRoute><TaskStatus /></SellerRoute>} />
        <Route path="/seller/task-summary" element={<SellerRoute><TaskSummarySellar /></SellerRoute>} />
        <Route path="/seller/invoice-seller" element={<SellerRoute><SellerInvoicePage /></SellerRoute>} />
        <Route path="/seller/invoice-seller-list" element={<SellerRoute><SellerInvoiceList /></SellerRoute>} />
        <Route path="/seller/services-seller-list" element={<SellerRoute><SellerServicesList /></SellerRoute>} />


        {/* Executive Routes */}
        <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
        <Route path="/executive/exe/dashboard" element={<SellerExeDashboard />} />
        <Route path="/executive/manage-seller" element={<ExicutiveManageSellers />} />
        <Route path="/executive/create-seller" element={<ExicutiveCreateSellers />} />
        <Route path="/executive/edit-seller/:id" element={<ExecutiveEditSeller />} />
        <Route path="/executive/view-seller/:id" element={<ExecutiveViewSeller />} />
        <Route path="/executive/create-lead" element={<ExicutiveCreateLead />} />
        <Route path="/executive/manage-leads" element={<ExecutiveManageLeads />} />
        <Route path="/executive/leads-status" element={<ExecutiveLeadStatus />} />
        <Route path="/executive/manage-leads-status" element={<ExicutiveManageLeadsStatus />} />
        <Route path="/executive/change-password" element={<ExicutiveChangePassword />} />
        <Route path="/executive/latest-updates" element={<ExecutiveLastestUpdates />} />
        <Route path="/executive/manage-updates" element={<ExecutiveManageUpdates />} />
        <Route path="/executive/view-lead/:id" element={<ExecutiveViewLead />} />


        {/* Accounts Routes */}
        <Route path="/accounts/dashboard" element={<AccountsDashboard />} />
        <Route path="/accounts/invoice-notification" element={<InvoiceNotification />} />
        <Route path="/accounts/invoice-list" element={<AccountsInvoices />} />
        <Route path="/accounts/create-invoice/:id" element={<Taxinvoice />} />
        <Route path="/accounts/invoice" element={<AccountsInvoice />} />
        <Route path="/accounts/invoice/:invoiceNumber" element={<InvoicePage />} />
        <Route path="/accounts/change-password" element={<AccountsChangePassword />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </Router>
  );
}

export default App;