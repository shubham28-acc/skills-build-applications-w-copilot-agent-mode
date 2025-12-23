import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching teams from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-6 text-primary mb-0">Teams</h2>
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createTeamModal">
          <i className="bi bi-plus-circle me-1"></i> Create Team
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">No teams found.</td>
                </tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal placeholder for Create Team */}
      <div className="modal fade" id="createTeamModal" tabIndex="-1" aria-labelledby="createTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createTeamModalLabel">Create Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Team Name</label>
                  <input type="text" className="form-control" id="teamName" placeholder="Enter team name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamDescription" className="form-label">Description</label>
                  <textarea className="form-control" id="teamDescription" rows="2" placeholder="Enter team description"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Team</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
