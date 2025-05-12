import { Router } from 'express';
import { createLoanApplication, getLoanApplications, getStatistics } from '../controllers/loanController';

const router = Router();

router.post('/loan/apply', createLoanApplication);
router.get('/loan/applications', getLoanApplications);
router.get('/loan/statistics', getStatistics);

export default router;
