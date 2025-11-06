// src/components/DigitalMarketingAgreement.js
import React from "react";

const DigitalMarketingAgreement = ({ digitalMarketing }) => {
  return (
    <div className="col-lg-12">
      <h3 className="text-dark mb-4 text-center">
        DIGITAL MARKETING SERVICE AGREEMENT
      </h3>

      <p>
        <strong>THIS GENERAL SERVICE AGREEMENT</strong> (the "Agreement"),
        dated this day of August 2025
      </p>

      <p>
        <strong>BETWEEN:</strong>
        <br />
        <strong>MORANDI COLORS PRIVATE LIMITED</strong> (GSTN:
        36AAQCM6357H1ZX), H NO 20-3, H-81, Sri Nivas Height, ADARSH NAGAR,
        UPPAL, Hyderabad, Medchal Malkajgiri, Telangana, 500039. (the "Client")
      </p>

      <p>
        <strong>- AND -</strong>
        <br />
        <strong>ISNAP ONLINE PRIVATE LIMITED</strong> (GSTN: 36AAHCI4640J1ZF),
        a company incorporated under the Companies Act, 2013, having its
        registered office at PLOT NO 90/3, PHASE 3, KAVURI HILLS, MADHAPUR,
        HYDERABAD, TELANGANA, INDIA – 500081. (the "Contractor")
      </p>

      <h5>BACKGROUND:</h5>
      <p>
        A. The Client thinks that the Contractor has the necessary
        qualifications, experience, and abilities to provide services to the
        Client.
        <br />
        B. The Contractor agrees to provide the Client with such services on the
        terms and conditions outlined in this Agreement.
      </p>

      <p>
        <strong>IN CONSIDERATION OF</strong> the matters described above and of
        the mutual benefits and obligations outlined in this Agreement, the
        receipt and sufficiency of which consideration is hereby acknowledged,
        the Client and the Contractor (individually the "Party" and collectively
        the "Parties" to this Agreement) agree as follows:
      </p>

      {/* You can continue adding all the rest of the agreement content here 
          exactly as in your HTML, keeping the structure of <h5>, <ol>, <p>, etc. */}

      <h5 className="mt-4">Governing Law</h5>
      <ol start="31">
        <li>
          This Agreement will be governed by and construed under the laws of the
          State of Telangana.
        </li>
      </ol>

      <h5 className="mt-4">IN WITNESS WHEREOF</h5>
      <p>
        the Parties have duly affixed their signatures under hand and seal on
        this day of August, 2025.
      </p>

      <p>
        <strong>WITNESS:</strong> ______________________________{" "}
        <strong>MORANDI COLORS PRIVATE LIMITED</strong>
        <br />
        Per: ______________________________
        <br />
        (Seal)
      </p>

      <p>
        <strong>WITNESS:</strong> ______________________________{" "}
        <strong>ISNAP ONLINE PRIVATE LIMITED</strong>
        <br />
        Per: ______________________________
        <br />
        (Seal)
      </p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th> DIGITAL MARKETING SERVICES</th>
            <th>PRICE IN INR / ACCOUNT</th>
            <th>PAYMENT TERMS</th>
          </tr>
        </thead>
        <tbody>
          {/* DIGITAL MARKETING */}
          {digitalMarketing && digitalMarketing.offerPrice && (
            <tr>
              <td>DIGITAL MARKETING</td>
              <td>
                {digitalMarketing.digitalMarketingServiceNames?.map((s) => s.name).join(", ")}
                <br />
                ₹{digitalMarketing.offerPrice}
              </td>
              <td>{digitalMarketing.billCycleTitle || "—"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DigitalMarketingAgreement;
