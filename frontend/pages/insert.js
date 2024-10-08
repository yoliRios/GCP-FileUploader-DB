import { useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

const Insert = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://34.42.37.195/insert', { name, email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error inserting data');
    }
  };

  return (
    <div>
      <Menu />
      <h1>Insert Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Insert</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Insert;
