import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching workouts from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [apiUrl]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-6 text-primary mb-0">Workouts</h2>
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">
          <i className="bi bi-plus-circle me-1"></i> Add Workout
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
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">No workouts found.</td>
                </tr>
              ) : (
                workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{workout.name}</td>
                    <td>{workout.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal placeholder for Add Workout */}
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkoutModalLabel">Add Workout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="workoutName" className="form-label">Workout Name</label>
                  <input type="text" className="form-control" id="workoutName" placeholder="Enter workout name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDescription" className="form-label">Description</label>
                  <textarea className="form-control" id="workoutDescription" rows="2" placeholder="Enter workout description"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Workout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
