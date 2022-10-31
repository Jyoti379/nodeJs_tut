
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.post('/add-expense',expenseController.addExpenses);
router.get('/get-expenses',expenseController.getExpenses);
router.delete('/delete-expense',expenseController.deleteExpense);
//router.put('/edit-expense',expenseController.editExpense);


module.exports=router;