import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    alert(data.message); // Handle response appropriately
  };

  return (
    <div style={{ marginTop:'60px'}}>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-3" style={{ marginTop:'40px'}}>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-indigo">Upload</button>
      </form>
    </div>
  );
}
