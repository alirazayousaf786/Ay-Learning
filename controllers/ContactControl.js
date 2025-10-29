import ContactModel from "../models/Contact.js";


//post reques route
 export const Contact = async(req,res)=>{
   try{
     const {name,email,message}=req.body;
     if(!name || !email || !message){
       return res.status(400).json({message:"All field is required"})
     };
     const newContact=await ContactModel.create({
        name,
        email,
        message
     });
     res.status(201).json(newContact)
   }catch(err){
      console.log("Error",err)
      res.status(500).json({message:err.message})
   }
    
};

//get all contact route

 export const getAllContact=async(req,res)=>{
    try{
        const getContact=await ContactModel.find();
        res.status(200).json(getContact);
    }catch(err){
        console.log("Get All Error",err)
        res.status(500).json({message:err.message})
    }
}

//delete the route

export const getIdDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await ContactModel.findByIdAndDelete(id);

    if (!deleteContact) { 
      return res.status(404).json({ message: "contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
