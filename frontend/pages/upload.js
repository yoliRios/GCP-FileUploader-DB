import { useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://34.42.37.195/upload', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <Menu />
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
