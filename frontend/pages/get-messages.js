import { useEffect, useState } from 'react';

export default function GetDataPage() {
  const [messages, setMessages] = useState([]);

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://34.29.124.51/get-messages');
      const data = await res.json();
      setMessages(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ marginTop:'60px'}}>
      <h2>Messages List</h2>
      <ul className="list-group">
        {messages.map((message) => (
          <li key={message[0]} className="list-group-item d-flex justify-content-between align-items-center">
            {message[1]} - {message[2]} {/* Assuming the data has the same structure as fetched */}      
          </li>
        ))}
      </ul>
    </div>
  );
}
