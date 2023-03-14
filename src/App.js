import { HomePage } from 'pages/homepage/HomePage';
import { Login } from 'pages/login/Login';
import { useState } from 'react';


const App = () => {

  const [userId, setUserId] = useState(() => {
    const saved = localStorage.getItem("userId");
    return saved;
  });

  if (userId)
    return (
      <HomePage setUserId={setUserId} />
    )
  return (
    <Login setUserId={setUserId} />
  );
}

export default App;
