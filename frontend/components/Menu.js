import Link from 'next/link';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/insert">Insert Data</Link></li>
        <li><Link href="/upload">Upload File</Link></li>
        <li><Link href="/users">Show Users</Link></li>
      </ul>
      <style jsx>{`
        nav {
          padding: 10px;
          background-color: #f0f0f0;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 20px;
        }
        li {
          font-size: 18px;
        }
      `}</style>
    </nav>
  );
};

export default Menu;