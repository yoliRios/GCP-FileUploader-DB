import { useEffect, useState } from 'react';

export default function GetDataPage() {
  const [users, setUsers] = useState([]);

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/get');
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  // Function to handle delete request
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    alert(data.message); // Show the response message
    // Refresh the list after deletion
    setUsers(users.filter(user => user[0] !== id));
  };

  return (
    <div style={{ marginTop:'60px'}}>
      <h2>Users List</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user[0]} className="list-group-item d-flex justify-content-between align-items-center">
            {user[1]} - {user[2]} {/* Assuming the data has the same structure as fetched */}
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => handleDelete(user[0])}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
