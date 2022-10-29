const User= require('../models/User');

exports.addUser= async(req,res,next)=>{
    try{
        if(!req.body.number){
            throw new Error('Phone Number is mandatory');
        }
    const name=req.body.name;
    const email =req.body.email;
    const phonenumber=req.body.phonenumber;

     const data= await User.create({name:name,email:email,phonenumber:phonenumber});

    res.status(201).json({newUserDetail:data});
    }catch(err){
        res.status(500).json({error:err});
    }
}

exports.getUser= async(req,res,next)=>{
    try{
        const users= await User.findAll();
        res.status(200).json({allUsers:users})
    }catch(err){
        console.log('get user is not working',JSON.stringify(err));
        res.status(500).json({error:err})
         }
  }

  exports.deleteUser= async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log('id is missing');
           return  res.status(400).json({error:'id is missing'});

        }
        const uId=req.params.id;
        await User.destroy({where:{id:uId}});
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({error:err})
    }
   }
    exports.editUser = async(req,res,next)=>{
        try{
            const uId=req.params.id;
            const updatedName=req.body.name;
            const updatedEmail=req.body.email;
            const updatedNumber=req.body.phonenumber;
            const updatedUser= await findByPk(uId);
            users.name=updatedName;
            users.email=updatedEmail;
            user.phonenumber=updatedNumber
            await User.save();
        }catch(err){
            console.log('edit user not working');
            res.status(500).json({error:'edit user not working '})
        }
    }