import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000';

function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [mongoData, setMongoData] = useState([]);
  const [redisData, setRedisData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Estados para formularios
  const [mongoForm, setMongoForm] = useState({ name: '', message: '' });
  const [redisForm, setRedisForm] = useState({ key: '', value: '' });

  // Verificar conexión con backend al cargar
  useEffect(() => {
    checkBackendStatus();
    fetchMongoData();
  }, []);

  // ================================
  // FUNCIONES DE API
  // ================================

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/ping`);
      const data = await response.json();
      setBackendStatus(data);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setBackendStatus({ error: 'Backend not reachable' });
    }
  };

  const fetchMongoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/data`);
      const data = await response.json();
      setMongoData(data.success ? data.data : []);
    } catch (error) {
      console.error('Error fetching MongoDB data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMongoData = async (e) => {
    e.preventDefault();
    if (!mongoForm.name || !mongoForm.message) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mongoForm)
      });
      
      if (response.ok) {
        setMongoForm({ name: '', message: '' });
        fetchMongoData(); // Refresh data
      }
    } catch (error) {
      console.error('Error adding data to MongoDB:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearMongoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/data`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchMongoData(); // Refresh data
      }
    } catch (error) {
      console.error('Error clearing MongoDB data:', error);
    } finally {
      setLoading(false);
    }
  };

  const testRedis = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/redis`);
      const data = await response.json();
      setRedisData(data);
    } catch (error) {
      console.error('Error testing Redis:', error);
      setRedisData({ error: 'Redis not reachable' });
    } finally {
      setLoading(false);
    }
  };

  const addRedisData = async (e) => {
    e.preventDefault();
    if (!redisForm.key || !redisForm.value) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/redis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(redisForm)
      });
      
      const data = await response.json();
      setRedisData(data);
      setRedisForm({ key: '', value: '' });
    } catch (error) {
      console.error('Error adding data to Redis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 NEBULA Technical Test</h1>
        <p>Fullstack + DevOps Demo</p>
        
        {/* STATUS DEL BACKEND */}
        <div className="status-section">
          <h2>📡 Backend Status</h2>
          <button onClick={checkBackendStatus} disabled={loading}>
            Check Connection
          </button>
          {backendStatus && (
            <div className={`status ${backendStatus.error ? 'error' : 'success'}`}>
              {backendStatus.error ? (
                <p>❌ {backendStatus.error}</p>
              ) : (
                <div>
                  <p>✅ {backendStatus.message}</p>
                  <small>Uptime: {Math.floor(backendStatus.uptime)}s</small>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECCIÓN MONGODB */}
        <div className="section">
          <h2>🍃 MongoDB Test</h2>
          
          <form onSubmit={addMongoData} className="form">
            <input
              type="text"
              placeholder="Name"
              value={mongoForm.name}
              onChange={(e) => setMongoForm({...mongoForm, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Message"
              value={mongoForm.message}
              onChange={(e) => setMongoForm({...mongoForm, message: e.target.value})}
            />
            <button type="submit" disabled={loading}>Add Data</button>
          </form>

          <div className="actions">
            <button onClick={fetchMongoData} disabled={loading}>
              Refresh Data
            </button>
            <button onClick={clearMongoData} disabled={loading} className="danger">
              Clear All Data
            </button>
          </div>

          <div className="data-display">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <p><strong>Records found:</strong> {mongoData.length}</p>
                {mongoData.map((item, index) => (
                  <div key={item._id || index} className="data-item">
                    <strong>{item.name}</strong>: {item.message}
                    <br />
                    <small>{new Date(item.timestamp).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SECCIÓN REDIS */}
        <div className="section">
          <h2>🔴 Redis Test</h2>
          
          <div className="actions">
            <button onClick={testRedis} disabled={loading}>
              Test Redis Connection
            </button>
          </div>

          <form onSubmit={addRedisData} className="form">
            <input
              type="text"
              placeholder="Key"
              value={redisForm.key}
              onChange={(e) => setRedisForm({...redisForm, key: e.target.value})}
            />
            <input
              type="text"
              placeholder="Value"
              value={redisForm.value}
              onChange={(e) => setRedisForm({...redisForm, value: e.target.value})}
            />
            <button type="submit" disabled={loading}>Store in Redis</button>
          </form>

          {redisData && (
            <div className={`status ${redisData.error ? 'error' : 'success'}`}>
              {redisData.error ? (
                <p>❌ {redisData.error}</p>
              ) : (
                <div>
                  <p>✅ {redisData.message}</p>
                  {redisData.key && (
                    <p><strong>{redisData.key}:</strong> {redisData.value}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;