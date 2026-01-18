interface Props {
  customers: any[];
  onSelect: (customer: any) => void;
}

const CustomerTable: React.FC<Props> = ({ customers, onSelect }) => {
  return (
    <table border={1} cellPadding={10} width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Last call</th>
          <th>Follow-up</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.customerId}>
            <td>{c.name}</td>
            <td>{c.phone}</td>
            <td>{c.status}</td>
            <td>{c.subStatus}</td>
            <td>{c.followUpDate}</td>
            <td>
              <button onClick={() => onSelect(c)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
