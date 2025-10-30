import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/admin/css/login.css";
import logo from "../assets/admin/images/logo.png";
import { validateLoginForm } from "./validation";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1=email/mobile, 2=otp, 3=new password
  const [forgotData, setForgotData] = useState({
    emailOrMobile: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, user } = useSelector((state) => state.auth);
  console.log('user123', user)

  // Redirect based on user role after login
  useEffect(() => {
    if (token && user?.roleName) {
      if (user.roleName === "Admin") {
        navigate("/dashboard");
      } else if (user.roleName === "Team") {
        navigate("/team/dashboard");
      } else if (user.roleName === "Seller") {
        navigate("/seller/mou-1");
      } else if (user.roleName === "Sales Manager") {
        navigate("/executive/dashboard");
      }
      else if (user.roleName === "Sales Executive") {
        navigate("/executive/exe/dashboard");
      }
      else if (user.roleName === "Accountant") {
        navigate("/accounts/dashboard");
      }
      else if (user.roleName === "Business Analytics Manager") {
        navigate("/team/dashboard");
    }
  }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(formData));
    }
  };

  // Forgot password handlers
  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotData.emailOrMobile) {
      setForgotError("Please enter Email or Mobile");
      return;
    }
    // TODO: Replace with actual API call to send OTP
    setForgotSuccess("OTP sent to " + forgotData.emailOrMobile);
    setForgotStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotData.otp) {
      setForgotError("Enter OTP");
      return;
    }
    // TODO: Replace with actual API call to verify OTP
    setForgotSuccess("OTP Verified!");
    setForgotStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotData.newPassword || !forgotData.confirmPassword) {
      setForgotError("Enter all password fields");
      return;
    }
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      setForgotError("Passwords do not match!");
      return;
    }
    // TODO: Replace with actual API call to reset password
    setForgotSuccess("Password reset successful!");
    setTimeout(() => {
      setShowForgot(false);
      setForgotStep(1);
      setForgotData({ emailOrMobile: "", otp: "", newPassword: "", confirmPassword: "" });
      setForgotSuccess("");
    }, 2000);
  };

  return (
    <div className="login-page">
      <div className="login-container text-center">
        <div className="brand">
          <img src={logo} className="w-50" alt="Logo" />
        </div>
        <h6 className="text-muted mt-3">
          Welcome to <br />
          <span className="text-success">Isnap Task Management System</span>
        </h6>

        {/* LOGIN FORM */}
        {!showForgot ? (
          <form className="mt-4 text-start" onSubmit={handleSubmit}>
            {error && <div className="text-danger mb-3">{error}</div>}

            <div className="mb-3 position-relative">
              <label className="form-label">
                Email/Mobile <span className="text-danger">*</span>
              </label>
              <i className="bi bi-envelope-fill input-icon" />
              <input
                type="text"
                name="emailOrMobile"
                value={formData.emailOrMobile}
                onChange={handleChange}
                className={`form-control ps-5 ${errors.emailOrMobile ? "is-invalid" : ""}`}
                placeholder="Email/Mobile"
              />
              {errors.emailOrMobile && (
                <div className="invalid-feedback">{errors.emailOrMobile}</div>
              )}
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <i className="bi bi-lock-fill input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ps-5 ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3 text-end">
              <button
                type="button"
                className="bg-white border-0 p-0 text-success"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center col-12">
              <button type="submit" className="btn btn-success px-5 py-2" disabled={loading}>
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </div>
          </form>
        ) : (
          // FORGOT PASSWORD FLOW
          <form className="mt-4 text-start">
            {forgotError && <div className="text-danger mb-3">{forgotError}</div>}
            {forgotSuccess && <div className="text-success mb-3">{forgotSuccess}</div>}

            {forgotStep === 1 && (
              <>
                <div className="mb-3 position-relative">
                  <label className="form-label">
                    Email/Mobile <span className="text-danger">*</span>
                  </label>
                  <i className="bi bi-envelope-fill input-icon" />
                  <input
                    type="text"
                    name="emailOrMobile"
                    value={forgotData.emailOrMobile}
                    onChange={handleForgotChange}
                    className="form-control ps-5"
                    placeholder="Enter Email/Mobile"
                  />
                </div>
                <div className="text-center mt-3 col-12">
                  <button onClick={handleSendOtp} className="btn btn-success px-4 py-2">
                    Send OTP
                  </button>
                </div>
              </>
            )}

            {forgotStep === 2 && (
              <>
                <div className="mb-3 position-relative">
                  <label className="form-label">Enter OTP</label>
                  <i className="bi bi-shield-lock-fill input-icon" />
                  <input
                    type="text"
                    name="otp"
                    value={forgotData.otp}
                    onChange={handleForgotChange}
                    className="form-control ps-5"
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="text-center mt-3 col-12">
                  <button onClick={handleVerifyOtp} className="btn btn-success px-4 py-2">
                    Verify OTP
                  </button>
                </div>
              </>
            )}

            {forgotStep === 3 && (
              <>
                <div className="mb-3 position-relative">
                  <label className="form-label">New Password</label>
                  <i className="bi bi-lock-fill input-icon" />
                  <input
                    type="password"
                    name="newPassword"
                    value={forgotData.newPassword}
                    onChange={handleForgotChange}
                    className="form-control ps-5"
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label">Confirm Password</label>
                  <i className="bi bi-lock-fill input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={forgotData.confirmPassword}
                    onChange={handleForgotChange}
                    className="form-control ps-5"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="text-center mt-3 col-12">
                  <button onClick={handleResetPassword} className="btn btn-success px-4 py-2">
                    Reset Password
                  </button>
                </div>
              </>
            )}

            <div className="mt-3 text-center">
              <button
                type="button"
                className="bg-white border-0 p-0 text-success"
                onClick={() => {
                  setShowForgot(false);
                  setForgotStep(1);
                  setForgotError("");
                  setForgotSuccess("");
                }}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;