import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching activities from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-6 text-primary mb-0">Activities</h2>
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addActivityModal">
          <i className="bi bi-plus-circle me-1"></i> Add Activity
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No activities found.</td>
                </tr>
              ) : (
                activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{activity.type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                    <td>{activity.user || (activity.user_id || '')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal placeholder for Add Activity */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="activityType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="activityType" placeholder="e.g. Running" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDuration" className="form-label">Duration (min)</label>
                  <input type="number" className="form-control" id="activityDuration" placeholder="e.g. 30" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDate" className="form-label">Date</label>
                  <input type="date" className="form-control" id="activityDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityUser" className="form-label">User</label>
                  <input type="text" className="form-control" id="activityUser" placeholder="User ID or Name" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Activity</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
