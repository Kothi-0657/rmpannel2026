import React from "react";

interface LineItem {
  id: string;
  service: string;
  description: string;
  quantity: number;
  rate: number;
  gstPercent: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface InspectionReportProps {
  customer: Customer;
  items: LineItem[];
  companyLogo?: string; // optional logo URL
  reportNumber?: string;
  date?: string;
}

const InspectionReport: React.FC<InspectionReportProps> = ({
  customer,
  items,
  companyLogo,
  reportNumber = "IR-001",
  date = new Date().toLocaleDateString(),
}) => {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const gstTotal = items.reduce(
    (sum, i) => sum + (i.quantity * i.rate * i.gstPercent) / 100,
    0
  );
  const grandTotal = subtotal + gstTotal;

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        {companyLogo && <img src={companyLogo} alt="Logo" style={styles.logo} />}
        <div>
          <h1 style={styles.title}>Inspection Report</h1>
          <p>Report No: {reportNumber}</p>
          <p>Date: {date}</p>
        </div>
      </div>

      {/* Customer Details */}
      <div style={styles.section}>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Address:</strong> {customer.address}</p>
      </div>

      {/* Line Items Table */}
      <div style={styles.section}>
        <h3>Line Items</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Rate</th>
              <th style={styles.th}>GST%</th>
              <th style={styles.th}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const amount = item.quantity * item.rate;
              return (
                <tr key={item.id}>
                  <td style={styles.td}>{item.service}</td>
                  <td style={styles.td}>{item.description}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>{item.rate.toFixed(2)}</td>
                  <td style={styles.td}>{item.gstPercent}%</td>
                  <td style={styles.td}>{(amount + (amount * item.gstPercent) / 100).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={styles.totals}>
        <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
        <p><strong>GST Total:</strong> ₹{gstTotal.toFixed(2)}</p>
        <p><strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}</p>
      </div>

      {/* Terms & Conditions */}
      <div style={styles.section}>
        <h3>Terms & Conditions</h3>
        <ol>
          <li>All inspections conducted are as per client requirements.</li>
          <li>Payment terms: 50% advance, 50% on report delivery.</li>
          <li>Any discrepancies must be reported within 7 days.</li>
          <li>GST included in all amounts above.</li>
        </ol>
      </div>

      {/* Buttons */}
      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => window.print()}>
          Download / Print PDF
        </button>
      </div>
    </div>
  );
};

export default InspectionReport;

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 24,
    maxWidth: 800,
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    height: 60,
    objectFit: "contain",
  },
  title: {
    margin: 0,
  },
  section: {
    marginBottom: 24,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #333",
    padding: 8,
    backgroundColor: "#f0f0f0",
  },
  td: {
    border: "1px solid #333",
    padding: 8,
  },
  totals: {
    textAlign: "right",
    marginBottom: 24,
    fontSize: 16,
  },
  buttons: {
    textAlign: "center",
    marginTop: 16,
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
