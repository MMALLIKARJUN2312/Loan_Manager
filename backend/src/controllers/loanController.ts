import { Request, Response } from 'express';
import pool from '../config/db';
import { ResultSetHeader } from 'mysql2/promise';

export const createLoanApplication = async (req: Request, res: Response) => {
  const {
    fullName, email, phone, dob, address, employmentType, income,
    loanType, loanAmount, loanTenure, loanPurpose, agreeToTerms
  } = req.body;

  const sql = `
    INSERT INTO loans (
      fullName, email, phone, dob, address, employmentType, income,
      loanType, loanAmount, loanTenure, loanPurpose, agreeToTerms
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    fullName, email, phone, dob, address, employmentType, income,
    loanType, loanAmount, loanTenure, loanPurpose, agreeToTerms
  ];

  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, values);
    res.status(201).json({ message: 'Loan application created', id: result.insertId });
  } catch (err) {
    console.error('Error inserting data:', (err as Error).message);
    res.status(500).json({ message: 'Error inserting data' });
  }
};

export const getLoanApplications = async (_req: Request, res: Response) => {
  const sql = 'SELECT * FROM loans';

  try {
    const [rows] = await pool.execute(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data:', (err as Error).stack);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

export const getStatistics = async (_req: Request, res: Response) => {
  const statsQuery = `
    SELECT
      COUNT(*) AS totalApplications,
      AVG(loanAmount) AS averageLoanAmount,
      SUM(CASE WHEN agreeToTerms = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS applicationSuccessRate
    FROM loans
  `;

  try {
    const [rows] = await pool.execute<any[]>(statsQuery);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching statistics:', (err as Error).stack);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};
