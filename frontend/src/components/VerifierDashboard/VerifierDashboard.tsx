import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import './VerifierDashboard.css';

const VerifierDashboard: React.FC = () => {
  interface Application {
    id: string;
    fullName: string;
    email: string;
    loanType: string;
    status: string;
    createdAt: string;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/applications');
        setApplications(response.data);
      } catch (err) {
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="verifier-dashboard">
      <h2>Verifier Dashboard</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="applications-table">
          <h3>Assigned Applications</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Loan Type</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td>{app.fullName}</td>
                  <td>{app.email}</td>
                  <td>{app.loanType}</td>
                  <td>{app.status}</td>
                  <td>{new Date(app.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifierDashboard;
