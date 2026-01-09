const getSellerAuthHeaders = (isFormData = false) => {
  const token =  localStorage.getItem("authToken") ;
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
    },
  };
};

export default getSellerAuthHeaders;