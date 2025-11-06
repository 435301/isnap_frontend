import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../admin/assets/admin/css/login.css";
import logo from "../../admin/assets/admin/images/logo.png";
import { updateMouStatus } from "../../redux/actions/mouAction";
import { businessForgotPassword, businessLogin, businessResetPassword, businessVerifyOtp } from "../../redux/actions/sellerAuthAction";
import { toast } from "react-toastify";

const SellerLogin = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotData, setForgotData] = useState({
    emailOrMobile: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    token,
    seller,
    message,
    otp,
  } = useSelector((state) => state.sellerAuth);
  console.log('seller', seller)

  //   useEffect(() => {
  //       if (seller.status && seller?.mouStatus === 1) {
  //         navigate("/seller/dashboard");
  //       } else {
  //         navigate("/seller/mou-1");
  //     }
  // }, [token, seller, navigate]);

  // --- FORM VALIDATION ---
  const validateLoginForm = (data) => {
    let errors = {};
    if (!data.emailOrMobile.trim()) errors.emailOrMobile = "Email or Mobile is required.";
    if (!data.password.trim()) errors.password = "Password is required.";
    return errors;
  };

  // --- LOGIN HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const res = dispatch(
        businessLogin({
          identifier: formData.emailOrMobile,
          password: formData.password,
        },navigate )
        
      );
    
    //  if (res?.seller) {
    //   if (res.seller.mouStatus === 0) {
    //     navigate("/seller/mou-1");
    //   } else {
    //     navigate("/seller/dashboard");
    //   }
    // }
    }
  };

  // --- FORGOT PASSWORD HANDLERS ---
  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!forgotData.emailOrMobile) {
      toast.error("Please enter Email or Mobile");
      return;
    }
    await dispatch(businessForgotPassword(forgotData.emailOrMobile));
    setForgotStep(2);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!forgotData.otp) {
      toast.error("Please enter OTP");
      return;
    }
    await dispatch(businessVerifyOtp(forgotData.emailOrMobile, forgotData.otp));
    setForgotStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!forgotData.newPassword || !forgotData.confirmPassword) {
      toast.warn("Please enter both password fields");
      return;
    }
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await dispatch(
      businessResetPassword(forgotData.emailOrMobile, forgotData.newPassword)
    );
    setShowForgot(false);
    setForgotStep(1);
    setForgotData({ emailOrMobile: "", otp: "", newPassword: "", confirmPassword: "" });
  };


  return (
    <div className="login-page">
      <div className="login-container text-center">
        <div className="brand">
          <img src={logo} className="w-50" alt="Logo" />
        </div>

        <h6 className="text-muted mt-3">
          Welcome to <br />
          <span className="text-success">Seller Login</span>
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
                onChange={(e) => setFormData({ ...formData, emailOrMobile: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
          // --- FORGOT PASSWORD FLOW ---
          <form className="mt-4 text-start">
            {message && <div className="text-success mb-3">{message}</div>}
            {error && <div className="text-danger mb-3">{error}</div>}

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
                  setForgotData({ emailOrMobile: "", otp: "", newPassword: "", confirmPassword: "" });
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
export default SellerLogin;