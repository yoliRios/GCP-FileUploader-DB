import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="app-container">
      <Navbar expanded={expanded} onToggle={() => setExpanded(!expanded)} bg="indigo" expand="lg">
        <Navbar.Brand href="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/insert">Insert User</Nav.Link>
            <Nav.Link href="/get">User List</Nav.Link>
            <Nav.Link href="/upload">Upload File</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <div className="content">
          {children}
        </div>
      </Container>
      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          justify-content: center;        
          align-items: center;
          height: 60vh; /* Altura completa de la ventana */
        }

        .content {
          max-width: 500px; /* Ancho máximo para el contenido */
          width: 100%; /* Asegura que el contenido ocupa el 100% del ancho permitido */
          text-align: center; /* Centra el texto dentro del contenido */
        }
      `}</style>
    </div>
  );
}
