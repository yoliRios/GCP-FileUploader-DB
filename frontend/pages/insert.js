import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function InsertData() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess(false);
  
      // Validaciones
      if (!name || !email) {
        setError('Both name and email are required.');
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      try {
        const response = await fetch('http://104.198.60.100/insert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });
  
        if (response.ok) {
          setSuccess(true);
          setName('');
          setEmail('');
        } else {
          setError('Failed to insert data.');
        }
      } catch (error) {
        setError('An error occurred while inserting data.');
      }
};
  return (
    <div  className="d-flex flex-column " style={{ marginTop:'60px'}}>
      <h2>Insert Data</h2>      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Data inserted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the user's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter the user's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button  style={{ marginTop:'20px'}} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

