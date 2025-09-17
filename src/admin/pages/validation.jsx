

// Email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mobile regex: 10 digits
const mobileRegex = /^[0-9]{10}$/;

export const validateLoginForm = (formData) => {
    let errors = {};

    // Validate Email or Mobile
    if (!formData.emailOrMobile) {
        errors.emailOrMobile = "Email or Mobile is required";
    } else if (
        !emailRegex.test(formData.emailOrMobile) &&
        !mobileRegex.test(formData.emailOrMobile)
    ) {
        errors.emailOrMobile = "Enter a valid email or 10-digit mobile number";
    }

    // Validate Password
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

// State Form Validation

export const validateStateForm = (formData) => {
    let errors = {};

    if (!formData.stateName || !formData.stateName.trim()) {
        errors.stateName = "State Name is required.";
    } else if (formData.stateName.trim().length < 3) {
        errors.stateName = "State Name must be at least 3 characters.";
    } else if (/\d/.test(formData.stateName)) {
        errors.stateName = "State Name must not contain numbers.";
    }

    if (!formData.stateStatus || formData.stateStatus.trim() === "") {
        errors.stateStatus = "State Status is required.";
    }

    return errors;
};




// pages/validation.js

// Validate individual Sub Service form
export const validateSubServiceForm = (formData) => {
  const errors = {};

  // Sub Service Name validation
  if (!formData.subServiceName || formData.subServiceName.trim() === "") {
    errors.subServiceName = "Sub Service Name is required";
  } else if (formData.subServiceName.length < 3) {
    errors.subServiceName = "Sub Service Name must be at least 3 characters";
  }

  // Sub Service Code validation
  if (!formData.subServiceCode || formData.subServiceCode.trim() === "") {
    errors.subServiceCode = "Sub Service Code is required";
  } else if (!/^[A-Za-z0-9_-]+$/.test(formData.subServiceCode)) {
    errors.subServiceCode = "Code can only contain letters, numbers, - and _";
  }

  // Status validation
  if (!formData.status || (formData.status !== "Active" && formData.status !== "Inactive")) {
    errors.status = "Status must be Active or Inactive";
  }

  return errors;
};

// Service Form Validation



// Seller Form Validation

export const validateSellerForm = (formData) => {
    let errors = {};

    // Business Name
    if (!formData.businessName || !formData.businessName.trim()) {
        errors.businessName = "Business name is required";
    } else if (!/^[a-zA-Z0-9\s&.,'-]+$/.test(formData.businessName)) {
        errors.businessName = "Business name can only contain letters, numbers, spaces, and basic punctuation";
    }

    // Seller Name
    if (!formData.sellerName || !formData.sellerName.trim()) {
        errors.sellerName = "Seller name is required";
    } else if (!/^[a-zA-Z\s.']+$/.test(formData.sellerName)) {
        errors.sellerName = "Seller name can only contain letters and spaces";
    }

    // Mobile Number (must start with 6-9 and be exactly 10 digits)
    if (!formData.mobileNumber || !formData.mobileNumber.trim()) {
        errors.mobileNumber = "Mobile number is required";
    } else if (!/^[0-9]+$/.test(formData.mobileNumber)) {
        errors.mobileNumber = "Mobile number must contain only digits";
    } else if (formData.mobileNumber.length > 10) {
        errors.mobileNumber = "Mobile number cannot be more than 10 digits";
    } else if (!/^[6-9]/.test(formData.mobileNumber)) {
        errors.mobileNumber = "Mobile number must start with 6-9";
    } else if (formData.mobileNumber.length !== 10) {
        errors.mobileNumber = "Mobile number must be exactly 10 digits";
    }

    // Spoc Mobile Number (must start with 6-9 and be exactly 10 digits)
    if (!formData.spocMobileNumber || !formData.spocMobileNumber.trim()) {
        errors.spocMobileNumber = "SPOC mobile number is required";
    } else if (!/^[0-9]+$/.test(formData.spocMobileNumber)) {
        errors.spocMobileNumber = "SPOC mobile number must contain only digits";
    } else if (formData.spocMobileNumber.length > 10) {
        errors.spocMobileNumber = "SPOC mobile number cannot be more than 10 digits";
    } else if (!/^[6-9]/.test(formData.spocMobileNumber)) {
        errors.spocMobileNumber = "SPOC mobile number must start with 6-9";
    } else if (formData.spocMobileNumber.length !== 10) {
        errors.spocMobileNumber = "SPOC mobile number must be exactly 10 digits";
    }




    // Email ID
    if (!formData.emailId || !formData.emailId.trim()) {
        errors.emailId = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
        errors.emailId = "Enter a valid email address";
    }

    // State
    if (!formData.state || !formData.state.trim()) {
        errors.state = "State is required";
    }

    // City
    if (!formData.city || !formData.city.trim()) {
        errors.city = "City is required";
    }

    // GST Number
    if (!formData.gstNumber || !formData.gstNumber.trim()) {
        errors.gstNumber = "GST number is required";
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
        errors.gstNumber = "Enter a valid GST number (e.g., 22AAAAA0000A1Z5)";
    }


    return errors;
};

export const validateLeadForm = (formData) => {
    const errors = {};
    const phonePattern = /^[6-9][0-9]{9}$/; // Starts 6–9, total 10 digits
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
    const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces

    // ✅ Customer Mobile
    if (!formData.customerMobile?.trim()) {
        errors.customerMobile = 'Mobile number is required';
    } else if (!phonePattern.test(formData.customerMobile)) {
        errors.customerMobile = 'Enter a valid 10-digit mobile number starting with 6-9';
    }

    // ✅ Customer Name
    if (!formData.customerName?.trim()) {
        errors.customerName = 'Customer name is required';
    } else if (!namePattern.test(formData.customerName.trim())) {
        errors.customerName = 'Customer name must contain only letters';
    }

    // ✅ Lead Details
    if (!formData.leadDetails?.trim()) {
        errors.leadDetails = 'Lead details are required';
    }

    // ✅ Team
    if (!formData.team?.trim()) {
        errors.team = 'Team is required';
    }

    // ✅ Email (optional but validate if present)
    if (formData.email?.trim() && !emailPattern.test(formData.email)) {
        errors.email = 'Invalid email format';
    }

    return errors;
};


export const validateTeamForm = (formData) => {
    const errors = {};

    // ✅ Patterns
    const namePattern = /^[A-Za-z\s]+$/; // only alphabets and spaces
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/; // standard email
    const aadharPattern = /^\d{12}$/; // exactly 12 digits

    // ✅ Team Name
    if (!formData.teamName?.trim()) {
        errors.teamName = 'Team Name is required';
    } else if (!namePattern.test(formData.teamName.trim())) {
        errors.teamName = 'Team Name must contain only letters';
    }

    // ✅ Employee ID
    if (!formData.employeeID?.trim()) {
        errors.employeeID = 'Employee ID is required';
    }

    // ✅ Gender
    if (!formData.gender) {
        errors.gender = 'Gender is required';
    }

    // ✅ Email Validations
    if (!formData.email?.trim()) {
        errors.email = 'Email is required';
    } else if (formData.email.includes(' ')) {
        errors.email = 'Email cannot contain spaces';
    } else if (formData.email.length > 254) {
        errors.email = 'Email is too long';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,6}$/.test(formData.email.trim())) {
        errors.email = 'Enter a valid email address';
    }


    // ✅ Role
    if (!formData.role) {
        errors.role = 'Role is required';
    }

    // ✅ Address
    if (!formData.address?.trim()) {
        errors.address = 'Address is required';
    }

    // ✅ Manager
    if (!formData.manager) {
        errors.manager = 'Manager is required';
    }

    // ✅ Aadhar Number
    if (!formData.aadhar?.trim()) {
        errors.aadhar = 'Aadhar Number is required';
    } else if (!aadharPattern.test(formData.aadhar.trim())) {
        errors.aadhar = 'Aadhar must be exactly 12 digits';
    }

    // ✅ ID Proof
    if (!formData.idProof) {
        errors.idProof = 'ID Proof is required';
    }

    return errors;
};

//Change Password  validations

// validation.js
// validation.js
export const validateChangePassword = (formData) => {
    const errors = {};
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword) {
        errors.oldPassword = "Old password is required.";
    } else if (oldPassword.length < 6) {
        errors.oldPassword = "Old password must be at least 6 characters.";
    }

    if (!newPassword) {
        errors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
        errors.newPassword = "New password must be at least 8 characters.";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== newPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
};

