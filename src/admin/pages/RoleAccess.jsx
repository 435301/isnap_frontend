import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const RoleAccess = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [role, setRole] = useState("Manager");
    const [permissions, setPermissions] = useState({

        dashboard: false,
        masterData: {
            category: false,
            role: false,
        },
        seller: {
            addSeller: false,
            manageSeller: false,
        },
    });

    const handlePermissionChange = (module, subModule = null) => {
        if (subModule) {
            setPermissions((prev) => ({
                ...prev,
                [module]: {
                    ...prev[module],
                    [subModule]: !prev[module][subModule],
                },
            }));
        } else {
            setPermissions((prev) => ({
                ...prev,
                [module]: !prev[module],
            }));
        }
    };
    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleSave = () => {
        console.log("Role:", role);
        console.log("Permissions:", permissions);
        // send to backend API
    };

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="content flex-grow-1">
                <Navbar onToggleSidebar={handleToggleSidebar} />

                <div className="container-fluid px-4 pt-3">
                    <div className="bg-white p-3 rounded shadow-sm">
                        <h5 className="mb-3">Role Access Management</h5>

                        <div className="row">
                            {/* Role */}
                            <div className="mb-3 col-4">
                                <label className="form-label fw-bold">Role:</label>
                                <select
                                    className="form-select ms-2"
                                    value={role} // current selected role
                                    onChange={(e) => setRole(e.target.value)} // update state on change
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Employee">Employee</option>
                                    {/* Add more roles as needed */}
                                </select>
                            </div>

                        </div>
                        {/* Permissions */}
                        <div className="permissions">
                        

                            {/* Master Data */}
                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={
                                        permissions.masterData.category && permissions.masterData.role
                                    } // checked if all submodules checked
                                    onChange={() => {
                                        const allChecked = permissions.masterData.category && permissions.masterData.role;
                                        setPermissions((prev) => ({
                                            ...prev,
                                            masterData: {
                                                category: !allChecked,
                                                role: !allChecked,
                                            },
                                        }));
                                    }}
                                    id="masterData"
                                />
                                <label htmlFor="masterData" className=" text-dark form-check-label ">
                                    Master Data
                                </label>

                                <div className="ms-4 mt-1">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={permissions.masterData.category}
                                            onChange={() => handlePermissionChange("masterData", "category")}
                                            id="category"
                                        />
                                        <label htmlFor="category" className="form-check-label">
                                            Category
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={permissions.masterData.role}
                                            onChange={() => handlePermissionChange("masterData", "role")}
                                            id="role"
                                        />
                                        <label htmlFor="role" className="form-check-label">
                                            State
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-check ms-3 mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={permissions.seller.addSeller && permissions.seller.manageSeller} // checked if all submodules are checked
                                    onChange={() => {
                                        const allChecked = permissions.seller.addSeller && permissions.seller.manageSeller;
                                        setPermissions((prev) => ({
                                            ...prev,
                                            seller: {
                                                addSeller: !allChecked,
                                                manageSeller: !allChecked,
                                            },
                                        }));
                                    }}
                                    id="seller"
                                />
                                <label htmlFor="seller" className="form-check-label text-dark">
                                    Seller
                                </label>

                                <div className="ms-4 mt-1">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={permissions.seller.addSeller}
                                            onChange={() => handlePermissionChange("seller", "addSeller")}
                                            id="addSeller"
                                        />
                                        <label htmlFor="addSeller" className="form-check-label">
                                            Add Seller
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={permissions.seller.manageSeller}
                                            onChange={() => handlePermissionChange("seller", "manageSeller")}
                                            id="manageSeller"
                                        />
                                        <label htmlFor="manageSeller" className="form-check-label">
                                            Manage Seller
                                        </label>
                                    </div>
                                </div>
                            </div>
  <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={
                                        permissions.masterData.category && permissions.masterData.role
                                    } // checked if all submodules checked
                                    onChange={() => {
                                        const allChecked = permissions.masterData.category && permissions.masterData.role;
                                        setPermissions((prev) => ({
                                            ...prev,
                                            masterData: {
                                                category: !allChecked,
                                                role: !allChecked,
                                            },
                                        }));
                                    }}
                                    id="masterData"
                                />
                                <label htmlFor="masterData" className=" text-dark form-check-label ">
                                  Team
                                </label>

                                <div className="ms-4 mt-1">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={permissions.masterData.category}
                                            onChange={() => handlePermissionChange("masterData", "category")}
                                            id="category"
                                        />
                                        <label htmlFor="category" className="form-check-label">
                                            Team
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={permissions.masterData.role}
                                            onChange={() => handlePermissionChange("masterData", "role")}
                                            id="role"
                                        />
                                        <label htmlFor="role" className="form-check-label">
                                            Role
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button className="btn btn-success mt-3" onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleAccess;
