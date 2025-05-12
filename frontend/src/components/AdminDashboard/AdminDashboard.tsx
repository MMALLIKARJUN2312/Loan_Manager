import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import { Pie } from 'react-chartjs-2';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  interface Application {
    id: string;
    fullName: string;
    email: string;
    loanType: string;
    status: 'approved' | 'rejected' | 'pending';
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

  const stats = {
    total: applications.length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    pending: applications.filter(app => app.status === 'pending').length,
  };

  const chartData = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="stats">
            <div>Total Applications: {stats.total}</div>
            <div>Approved: {stats.approved}</div>
            <div>Rejected: {stats.rejected}</div>
            <div>Pending: {stats.pending}</div>
          </div>
          <div className="chart">
            <Pie data={chartData} />
          </div>
          <div className="applications-table">
            <h3>Applications List</h3>
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
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
