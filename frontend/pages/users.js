import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://34.42.37.195/get');
        setUsers(res.data);
      } catch (err) {
        console.log('Error fetching users', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Menu />
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user[0]}>{user[1]} - {user[2]}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
