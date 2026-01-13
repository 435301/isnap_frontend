import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Accounts
const AccountsDashboard = lazy(() => import("../Accounts/pages/AccountsDashboard.js"));
const InvoiceNotification = lazy(() => import("../Accounts/pages/InvoiceNotification"));
const Taxinvoice = lazy(() => import("../Accounts/pages/Taxinvoice"));
const AccountsInvoice = lazy(() => import("../Accounts/pages/AccountsInvoice"));
const InvoicePage = lazy(() => import("../Accounts/pages/InvoicePage"));
const AccountsChangePassword = lazy(() => import("../Accounts/pages/AccountsChangePassword"));


const AccountsInvoices = lazy(() => import("../Accounts/pages/AccountsInvoiceList.jsx"));

export const AccountsRoutes = () => {
    return (
        <Routes>
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
        </Routes>
    )
}
