// src/Accounts/pages/InvoicePage.jsx
import React from 'react';
import logo from '../assets/images/logo.png'; // Adjust path to your logo

const InvoicePage = () => {
  return (
    <div className="invoice" style={{ border: '1px solid #000', padding: '20px 12px', width: '210mm', minHeight: '297mm', margin: 'auto', background: '#fff' }}>
      {/* Header */}
      <div className="row invoice-header" style={{ borderBottom: '1px solid #000', paddingBottom: '10px' }}>
        <div className="col-3 align-self-center">
          <div className="logo mb-2">
            <img src={logo} alt="Logo" style={{ height: '55px' }} />
          </div>
        </div>
        <div className="col-5">
          <h6 className="fw-bold mb-1">ISNAP ONLINE PRIVATE LIMITED</h6>
          <p style={{ fontSize: '14px', lineHeight: 1.4 }}>
            3, Plot no. 90/3, Shaikpet, Kavuri Hills Phase 3, Kavuri Hill, Madhapur,<br/>
            Hyderabad, Telangana 500081<br/>
            India<br/>
            GSTIN: 36AAHCI4640J1ZF<br/>
            mannesh.b@isnap.online
          </p>
        </div>
        <div className="col-4 text-end align-self-end">
          <h2 style={{ fontSize: '26px', fontWeight: 'bold' }}>TAX INVOICE</h2>
        </div>
      </div>

      {/* Invoice Info */}
      <table className="table table-borderless mt-3" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td><strong>#</strong> INV-000004</td>
            <td><strong>Place Of Supply:</strong> Telangana (36)</td>
          </tr>
          <tr>
            <td><strong>Invoice Date:</strong> 14/11/2024</td>
            <td></td>
          </tr>
          <tr>
            <td><strong>Terms:</strong> Custom</td>
            <td></td>
          </tr>
          <tr>
            <td><strong>Due Date:</strong> 23/11/2024</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Bill / Ship To */}
      <table className="table table-bordered mt-2 mb-3">
        <thead className="table-light">
          <tr>
            <th width="50%">Bill To</th>
            <th width="50%">Ship To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>K M ENTERPRISES</strong><br/>
              GSTIN: 36AAEFK0054G1ZP
            </td>
            <td>
              GSTIN: 36AAEFK0054G1ZP
            </td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
     <table class="table-invoice">
            <thead class="">
                <tr class="table-light">
                    <th>#</th>
                    <th>Item &amp; Description</th>
                    <th>HSN / SAC</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th colspan="2">CGST</th>
                    <th colspan="2">SGST</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>%</th>
                    <th>Amt</th>
                    <th>%</th>
                    <th>Amt</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td class="text-start">AMAZON Ad Services</td>
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
        </table>

      {/* Totals */}
      <div className="row mt-3">
        <div className="col-7">
          <p className="mb-1"><strong>Total In Words</strong><br/>
            <em>Indian Rupee Eight Thousand Eight Hundred Fifty Only</em>
          </p>
          <p className="mb-0"><strong>Notes</strong></p>
          <p className="mb-2">Thanks for your business.</p>
          <p className="mb-0">ISNAP ONLINE PVT LTD</p>
          <p className="mb-0">ACCOUNT NUMBER: 10168499898</p>
          <p className="mb-0">IFSC CODE: IDFB0080231</p>
          <p>BRANCH NAME: KAVURI HILLS BRANCH</p>
        </div>
        <div className="col-5">
          <table className="w-100 totals">
            <tbody>
              <tr><td>Sub Total</td><td className="text-end">7,500.00</td></tr>
              <tr><td>CGST (9%)</td><td className="text-end">675.00</td></tr>
              <tr><td>SGST (9%)</td><td className="text-end">675.00</td></tr>
              <tr className="fw-bold"><td>Total</td><td className="text-end">₹8,850.00</td></tr>
              <tr><td>Payment Made</td><td className="text-end">(-) ₹8,850.00</td></tr>
              <tr className="fw-bold text-danger"><td>Balance Due</td><td className="text-end">₹0.00</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="signature text-end mt-4" style={{ fontSize: '14px' }}>
        Authorized Signature
      </div>
    </div>
  );
};

export default InvoicePage;
