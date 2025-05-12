import express from 'express';
import cors from 'cors';
import loanRoutes from './routes/loanRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', loanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
