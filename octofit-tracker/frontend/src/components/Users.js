import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching users from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-6 text-primary mb-0">Users</h2>
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#inviteUserModal">
          <i className="bi bi-person-plus me-1"></i> Invite User
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No users found.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.team && user.team.name ? user.team.name : user.team}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal placeholder for Invite User */}
      <div className="modal fade" id="inviteUserModal" tabIndex="-1" aria-labelledby="inviteUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="inviteUserModalLabel">Invite User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="userName" placeholder="Enter user name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail" placeholder="Enter user email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userTeam" className="form-label">Team</label>
                  <input type="text" className="form-control" id="userTeam" placeholder="Enter team name or ID" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Invite User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
