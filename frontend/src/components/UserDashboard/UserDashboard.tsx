import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './UserDashboard.css';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface LoanApplication {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  employmentType: string;
  income: string;
  loanType: string;
  loanAmount: string;
  loanTenure: number;
  loanPurpose: string;
  agreeToTerms: number;
  createdAt: string;
}

const UserDashboard: React.FC = () => {
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const response = await axios.get('/loans/applications');
        setLoans(response.data);
      } catch (err) {
        setError('Error fetching user loans');
      } finally {
        setLoading(false);
      }
    };

    fetchUserLoans();
  }, []);

  const chartData = {
    labels: loans.map((loan) =>
      new Date(loan.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Loan Amount (₹)',
        data: loans.map((loan) => parseFloat(loan.loanAmount)),
        fill: false,
        borderColor: '#3f51b5',
        backgroundColor: '#3f51b5',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Loan Amounts Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount (₹)' },
      },
      x: {
        title: { display: true, text: 'Date' },
      },
    },
  };

  return (
    <div className="user-dashboard">
      <h2>Your Loan Applications</h2>

      {loading ? (
        <p>Loading your loans...</p>
      ) : error ? (
        <p>{error}</p>
      ) : loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <>
          <div className="loan-table">
            <h3>Loan Application Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Loan Type</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.fullName}</td>
                    <td>{loan.email}</td>
                    <td>{loan.loanType}</td>
                    <td>{loan.loanAmount}</td>
                    <td>{loan.agreeToTerms ? 'Approved' : 'Pending'}</td>
                    <td>{new Date(loan.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="loan-chart">
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
