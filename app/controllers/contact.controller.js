 const mongoose = require("mongoose");
 const handlePromise = require("../helpers/promise.helper");
 const Contact = require("../models/contact.model");
 const { BadRequestError } = require("../errors");
 const { countDocuments } = require("../models/contact.model");

exports.create = (req, res) =>{
    res.send({message: "create handler"});
};
exports.findAll = async (req, res, next) => {
    const condition = {  };
    const { name } = req.query;
    if(name) {
        condition.name = { $regex : new RegExp(name), $options: "i" };
    }
        const [error, documents] = await handlePromise (Contact.find(condition));
        if(error){
            return next(new BadRequestError(500, "An error occurred while retrieving contacts"));
        }
        return res.send(documents);
    
    res.send({message: "findAll handler"});
};

exports.findOne = async (req, res, next) => {
        const { id } =req.params;
        const condition = {
             _id: id && mongoose.isValidObjectId(id) ? id :null,
        };
        const [error,document] = await handlePromise(Contact.findOne(condition));
        if(error){
            return next(new BadRequestError (500, `Error retrieveving contact with id=${req.params.id}`));
        }
        if(!document){
            return next(new BadRequestError (404,"Contact not found"));
        }
         return res.send(document);
   // res.send({message: "findOne handler"});
};

 exports.update =  async (req, res, next) => {
    if ( Object.keys(req.body).length === 0){
        return next(new BadRequestError(400, "Data to update can not be empty"));
  };
  const { id } =req.params;
  const condition = {
      _id : id && mongoose.isValidObjectId(id) ? id: null,
  }
    const [error,document] = await handlePromise(Contact.findOneAndUpdate(condition,req.body, {
        new : true,
     })
    );
   
    if(error){
        return next(new BadRequestError (500,`Error updating contact with id=${req.params.id}`));
    }
    if(!document){
        return next(new BadRequestError (404,"Contact not found"));
    } return res.send({message: "Contact was updated successfully"});



   //  return res.send(document);
        //res.send({message: "update handler"});
 };
exports.delete =  async(req, res ,next) => {
    const { id } =req.params;
    const condition = {
         _id: id && mongoose.isValidObjectId(id) ? id :null,
    };
    const [error,document] = await handlePromise(Contact.findOneAndDelete(condition));
    if(error){
        return next(new BadRequestError (500, `Cou;d not delete contact with id=${req.params.id}`));
    }
    if(!document){
        return next(new BadRequestError (404,"Contact not found"));
    }
    return res.send({message: "Contact was updated successfully"});
    // res.send({message: "delete handler"});
};

exports.deleteAll = async (req,res) => {
    const [error,data] = await handlePromise(
    Contact.deleteMany({ })
    ) ;
     if(error){
         return next(new BadRequestError (500, "An error occurred while removing favorite contacts"));
     }
     return res.send({
         message: `${data.deleCount} contacts were delete successfully`,
     });

   
};
exports.findAllFavorite= async(req,res, next) => {
       const [error,documents] = await handlePromise()
       Contact.find({favorite :true,}
        );
        if(error){
            return next(new BadRequestError (500, "An error occurred while retrieving favorite contacts"));
        }
        return res.send(documents);
    //  res.send({message: "findAllFavorite handler"});
};
exports.create = async (req, res, next) => {
    if(!req.body.name){
        return next(new BadRequestError(400," Name can not be empty"));
    }
    //crete a contact
    const contact = new Contact({
        name : req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone : req.body.phone,
        favorite: req.body.favorite === true,
    });
    const [error, document] = await handlePromise(contact.save());
    if(error){
        return next (new BadRequestError(500, "An error occurred while creating the contact }"));
    }
    return res.send(document);
};

            

          