import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  return (
    <div style={{ marginTop:'60px'}}>
      <h1>Welcome to MyApp</h1>
      {isClient && (
        <p>This site allows you to insert data, fetch data, and upload files!</p>
      )}
    </div>
  );
}
