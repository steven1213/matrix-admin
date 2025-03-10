import React, { useState } from 'react';
import Login from './pages/Login/Login';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.scss';

function App(): React.ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const handleLogin = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <div className="app">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div className="dashboard">
            <h1>欢迎, {username}!</h1>
            {/* 这里将来会是仪表板内容 */}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;