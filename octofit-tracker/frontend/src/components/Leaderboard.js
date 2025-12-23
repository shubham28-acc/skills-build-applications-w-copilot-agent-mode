import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;

  useEffect(() => {
    console.log('Fetching leaderboard from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [apiUrl]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-6 text-primary mb-0">Leaderboard</h2>
        <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">No leaderboard data found.</td>
                </tr>
              ) : (
                leaderboard.map((entry, idx) => (
                  <tr key={entry.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{entry.team && entry.team.name ? entry.team.name : entry.team}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
