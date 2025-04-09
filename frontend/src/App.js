import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchLeaderboard = async () => {
    const res = await axios.get('http://localhost:3001/api/users', {
      params: { filter, search: search || undefined },
    });
    setUsers(res.data.data);
  };

  const handleRecalculate = async () => {
    await axios.post('http://localhost:3001/api/users/recalculate');
    fetchLeaderboard();
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Leaderboard</h1>
      <div className='form-container'>
        <input
          placeholder='Search by id'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchLeaderboard}>Search</button>
      </div>

      <div className='button-container'>
        <button onClick={() => setFilter('day')}>Today</button>
        <button onClick={() => setFilter('month')}>This Month</button>
        <button onClick={() => setFilter('year')}>This Year</button>

        <button onClick={handleRecalculate}>Recalculate</button>
        <button
          onClick={() => {
            setFilter('');
            setSearch('');
            fetchLeaderboard();
          }}
        >
          Reset
        </button>
      </div>

      <table border='1' cellPadding='8' style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Total Points</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.totalPoints}</td>
              <td>{user.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
