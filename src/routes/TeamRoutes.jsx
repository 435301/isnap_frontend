// Team Pages

import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { TeamRoute } from "../routes/RoleRoutes.jsx";

const TeamDashboard = lazy(() => import("../Team/pages/Dashboard"));
const TeamManageLeads = lazy(() => import("../Team/pages/ManageLeads"));
const TeamTasks = lazy(() => import("../Team/pages/TeamTasks"));
const TeamLastestUpdates = lazy(() => import("../Team/pages/TeamLastestUpdates"));
const TaskSummary = lazy(() => import("../Team/pages/TaskSummary"));
const TeamNotifications = lazy(() => import("../Team/pages/TeamNotifications"));
const ChangePasswordTeam = lazy(() => import("../Team/pages/ChangePasswordTeam"));
const TeamManageSupport = lazy(() => import("../Team/pages/TeamManageSupport"));
const TeamAddSupport = lazy(() => import("../Team/pages/TeamAddSupport"));
const ManageSellersTeam = lazy(() => import("../Team/pages/ManageSellers.jsx"));
const ViewSellerDetails = lazy(() => import("../Team/pages/ViewSellerDetails.jsx"));
const TaskSummaryPersonal = lazy(() => import("../Team/pages/TaskSummaryPersonal.jsx"));

export const TeamRoutes = () => {
    return (
        <Routes>
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
        </Routes>
    )
}
