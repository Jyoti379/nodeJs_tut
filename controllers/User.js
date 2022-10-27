const User=require('../models/user')
 
exports.postUser = async(req,res,next)=>{
  try{

      if(!req.body.number){
          throw new Error('Phone Number is mandatory');
      }
      
  const name=req.body.name;
  const email=req.body.email;
  const phonenumber=req.body.number;
  const data= await User.create({name:name,email:email,phonenumber:phonenumber});
  res.status(201).json({newUserDetail:data});
}catch(err){
  res.status(500).json({error:err})
}
}

exports.getUser = async(req,res,next)=>{
  try{

  const users=await User.findAll();
  res.status(200).json({allUsers:users});
}catch(err){
  console.log('user fails',JSON.stringify(err));
  res.status(500).json({error:err})
}
}

exports.deleteUser = async(req,res,next)=>{
  try{
      if(req.params.id=='undefined'){
          console.log('ID missing');
          return res.status(400).json({err:'id missing'})
      }
      const uId=req.params.id;
      await User.destroy({where:{id:uId}});
      res.status(200);
  }catch(err){
      console.log(err);
      res.status(500).json({error:err})
  }
}
