const Expense=require('../models/expense');

exports.addExpenses= async(req,res,next)=>{
    try{
        const Expenseamount= req.body.Expenseamount;
        const description=req.body.description;
        const catagory=req.body.catagory;
         
        const data= await Expense.create({Expenseamount:Expenseamount,description:description,catagory:catagory});
      res.status(201).json({expenseDetails:data});
    }catch(err){
      res.status(500).json({error:err})
    }
}

exports.getExpenses = async(req,res,next)=>{
    try{
    const expenses = await Expense.findAll();
    console.log(expenses);
    res.status(200).json({expenseDetails:expenses});
  }catch(err){
    res.status(500).json({error:err});
  }
  }

  exports.deleteExpense=async(req,res,next)=>{
    try{
    if(req.params.id=='undefined'){
        console.log('id is missing');
       return  res.status(400).json({error:'id is missing'});
  
    }
    const expenseId=req.params.id;
    await Expense.destroy({where:{id:expenseId}});
     res.sendStatus(200);
   }catch(err){
      res.status(500).json({error:err});
      
    }
  }
