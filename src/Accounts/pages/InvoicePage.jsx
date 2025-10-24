// src/Accounts/pages/InvoicePage.jsx
import React, { useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png'; // Adjust path to your logo
import './InvoicePage.css';  // Import your CSS
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInvoiceServices, uploadInvoice } from '../../redux/actions/invoiceAction';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoicePage = () => {
  const { invoiceNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const { invoice, services, loading, error } = useSelector((state) => state.invoices);
  console.log('invoice', invoice);
  const businessId = invoice?.businessId
  console.log('businessId', businessId)
  useEffect(() => {
    if (invoiceNumber) {
      dispatch(fetchInvoiceServices(invoiceNumber));
    }
  }, [dispatch, invoiceNumber]);

  const handleUploadInvoice = async () => {
    const input = invoiceRef.current;
    // Convert HTML to canvas
    const canvas = await html2canvas(input, { scale: 2 });
    //  Convert canvas to image and then to PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Convert PDF to Blob
    const pdfBlob = pdf.output("blob");
    const formData = new FormData();
    formData.append("invoiceFile", pdfBlob, `invoice-${invoiceNumber}.pdf`);
    formData.append("businessId", businessId);
    formData.append("invoiceNumber", invoiceNumber);
    formData.append("invoiceType", 1);

    const result = await dispatch(uploadInvoice(formData));
  };


  return (
    <div>
    <div className="invoice" ref={invoiceRef} style={{ border: '1px solid #000', padding: '20px 12px', width: '210mm', minHeight: '297mm', margin: 'auto', background: '#fff' }}>
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
            3, Plot no. 90/3, Shaikpet, Kavuri Hills Phase 3, Kavuri Hill, Madhapur,<br />
            Hyderabad, Telangana 500081<br />
            India<br />
            GSTIN: 36AAHCI4640J1ZF<br />
            mannesh.b@isnap.online
          </p>
        </div>
        <div className="col-4 text-end align-self-end">
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>PROFORMA INVOICE</h2>
        </div>
      </div>

      {/* Invoice Info */}
      <table className="table table-borderless mt-3" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td><strong>#</strong> {invoice?.invoiceNumber}</td>
            <td><strong>Place Of Supply:</strong> Telangana (36)</td>
          </tr>
          <tr>
            <td><strong>Invoice Date:</strong> {invoice?.invoiceDate}</td>
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
              <strong>K M ENTERPRISES</strong><br />
              GSTIN: 36AAEFK0054G1ZP
            </td>
            <td>
              GSTIN: 36AAEFK0054G1ZP
            </td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <table className="table-invoice mt-3">
        <thead>
          <tr className="table-light">
            <th>#</th>
            <th>Item &amp; Description</th>
            <th>HSN / SAC</th>
            <th>Qty</th>
            <th>Rate</th>
            <th colSpan="2">CGST</th>
            <th colSpan="2">SGST</th>
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
          {services?.map((s, index) => {
            const cgstAmount = (s.totalAmount * 0.09).toFixed(2); // 9% CGST
            const sgstAmount = (s.totalAmount * 0.09).toFixed(2); // 9% SGST
            return (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td className="text-start">{s.serviceTypeName || s.activityName || s.source}</td>
                <td>998511</td>
                <td>{s.qty || 1}</td>
                <td>{s.amount}</td>
                <td>9%</td>
                <td>{cgstAmount}</td>
                <td>9%</td>
                <td>{sgstAmount}</td>
                <td>{s.totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Totals */}
      <div className="row mt-3">
        <div className="col-7">
          <p className="mb-1"><strong>Total In Words</strong><br />
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
              <tr><td>Sub Total</td><td className="text-end">₹{invoice?.subAmount}</td></tr>
              <tr><td>GST ({invoice?.gstPercentage}%)</td><td className="text-end">₹{invoice?.gstAmount}</td></tr>
              <tr className="fw-bold"><td>Total</td><td className="text-end">₹{invoice?.totalAmount}</td></tr>
              <tr><td>Payment Made</td><td className="text-end">(-) ₹{invoice?.totalAmount}</td></tr>
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
     <div className='text-center'>
        <button className="btn btn-sm btn-success ms-3 mt-3 mb-3" onClick={handleUploadInvoice}>Confirm</button>
      </div>
    </div>
  );
};

export default InvoicePage;
