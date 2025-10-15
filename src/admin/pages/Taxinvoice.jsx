import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const VoicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? 259 : 95,
          transition: "margin-left 0.3s",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
            <h5 className="m-0">Tax Invoice</h5>
          </div>

          <div className="bg-white p-3 rounded shadow-sm invoice-container">
            {/* Header */}
            <div className="row mb-4">
              <div className="col-md-6">
                <img
                  src="../assets/admin/images/logo.png"
                  className="logo"
                  alt="ISNAP Logo"
                />
                <h5 className="mt-2">ISNAP ONLINE PRIVATE LIMITED</h5>
                <p>
                  3, Plot no. 90/3, Shaikpet, Kavuri Hills Phase 3, Kavuri Hill,
                  Madhapur,<br />
                  Telangana, Hyderabad, Telangana 500081, India<br />
                  GSTIN 36AAHC1640J1ZF<br />
                  mahesh.b@isnap.online
                </p>
              </div>
              <div className="col-md-6 text-end">
                <h2>TAX INVOICE</h2>
              </div>
            </div>

            {/* Invoice Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Invoice #</th>
                      <td>INV-000004</td>
                    </tr>
                    <tr>
                      <th>Invoice Date</th>
                      <td>14/11/2024</td>
                    </tr>
                    <tr>
                      <th>Terms</th>
                      <td>Custom</td>
                    </tr>
                    <tr>
                      <th>Due Date</th>
                      <td>23/11/2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table table-borderless text-end">
                  <tbody>
                    <tr>
                      <th>Place of Supply</th>
                      <td>Telangana (36)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Billing Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h6>Bill To</h6>
                <p>
                  K M ENTERPRISES<br />
                  GSTIN 36AAEFK0054G1ZP
                </p>
              </div>
              <div className="col-md-6">
                <h6>Ship To</h6>
                <p>GSTIN 36AAEFK0054G1ZP</p>
              </div>
            </div>

            {/* Services Table */}
            <div className="row mb-4">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Item & Description</th>
                      <th>HSN / SAC</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>CGST %</th>
                      <th>CGST Amt</th>
                      <th>SGST %</th>
                      <th>SGST Amt</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>AMAZON Ad Services</td>
                      <td>998511</td>
                      <td>1.00</td>
                      <td>7,500.00</td>
                      <td>9%</td>
                      <td>675.00</td>
                      <td>9%</td>
                      <td>675.00</td>
                      <td>7,500.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="total-row">
                      <td colSpan="9" className="text-end">
                        Sub Total
                      </td>
                      <td>7,500.00</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="9" className="text-end">
                        CGST (9%)
                      </td>
                      <td>675.00</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="9" className="text-end">
                        SGST (9%)
                      </td>
                      <td>675.00</td>
                    </tr>
                    <tr className="total-row border-top">
                      <td colSpan="9" className="text-end">
                        Total
                      </td>
                      <td>₹8,850.00</td>
                    </tr>
                    <tr>
                      <td colSpan="9" className="text-end">
                        Payment Made
                      </td>
                      <td className="text-danger">(-) 8,850.00</td>
                    </tr>
                    <tr>
                      <td colSpan="9" className="text-end">
                        Balance Due
                      </td>
                      <td>₹0.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="row">
              <div className="col-12">
                <p>
                  <strong>Total In Words:</strong> Indian Rupee Eight Thousand
                  Eight Hundred Fifty Only
                </p>
                <p>
                  <strong>Notes:</strong> Thanks for your business.
                </p>
                <p>
                  ISNAP ONLINE PVT LTD<br />
                  ACCOUNT NUMBER: 10168499898<br />
                  IFSC CODE: IDFB0080231<br />
                  BRANCH NAME: KAVURI HILLS BRANCH
                </p>
              </div>
            </div>

            {/* Signature */}
            <div className="row mt-5">
              <div className="col-12 text-end">
                <p>Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicePage;
