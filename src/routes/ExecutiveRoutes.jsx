import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const ExecutiveDashboard = lazy(() => import("../Executive/pages/ExecutiveDashboard.jsx"));
const ExicutiveManageSellers = lazy(() => import("../Executive/pages/ExicutiveManageSellers.jsx"));
const ExicutiveCreateSellers = lazy(() => import("../Executive/pages/ExicutiveCreateSellers.jsx"));
const ExicutiveCreateLead = lazy(() => import("../Executive/pages/ExicutiveCreateLead.jsx"));
const ExecutiveManageLeads = lazy(() => import("../Executive/pages/ExecutiveManageLeads"));
const ExecutiveLeadStatus = lazy(() => import("../Executive/pages/ExecutiveLeadStatus"));
const ExicutiveManageLeadsStatus = lazy(() => import("../Executive/pages/ExicutiveManageLeadsStatus.jsx"));
const ExicutiveChangePassword = lazy(() => import("../Executive/pages/ExicutiveChangePassword.jsx"));
const ExecutiveLastestUpdates = lazy(() => import("../Executive/pages/ExecutiveLastestUpdates"));
const ExecutiveManageUpdates = lazy(() => import("../Executive/pages/ExecutiveManageUpdates"));
const ExecutiveEditSeller = lazy(() => import("../Executive/pages/ExecutiveEditSeller.jsx"));
const ExecutiveViewSeller = lazy(() => import("../Executive/pages/ExecutiveViewSeller.jsx"));
const ManagerDocumentView = lazy(() => import("../Executive/pages/ManagerDocument.jsx"));
const SellerExeDashboard = lazy(() => import("../Executive/pages/ExecutiveExeDashboard.jsx"));
const LeadViewExecutive = lazy(() => import("../Executive/components/Modal/ViewLeadExecutive.jsx"));
const ExecutiveViewLead = lazy(() => import("../Executive/components/Modal/ViewLeadExecutive.jsx"));


export const ExecutiveRoutes = () => {
    return (
        <Routes>
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
        </Routes>
    )
}
