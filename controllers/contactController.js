import {Contact} from "../models/contactModel.js"
import asyncHandler from "express-async-handler";


// @description Get all contacts
// Route get /api/contacts/
//Access private
const getContacts = async(req, res) => {
    const listContacts = await Contact.find({ user_id: req.user.id });

    if (!listContacts){
        res.status(400)

    }

    res.status(200).json(listContacts);
}


// @description post new contact
// Route post /api/contacts/
//Access private
const postContact = async (req, res) => {

    const {name, email, mobile} = req.body;
    
    if(!name || !email || !mobile){
        res.status(400);
        throw new Error("All of Fields are Mandatory");
    }

    const checkDuplicateContact = await Contact.findOne({email});
    
    if (checkDuplicateContact){
        res.status(400);
        throw new Error("Duplicate email address");
    }

    console.log("Checkpoint")
    const addContact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        mobile
    });

    res.status(200).json(addContact);
}


// @description get contact
// Route get /api/contacts/:id
//Access private
const getContact = async(req, res) => {
    const getContact = await Contact.findById(req.params.id );

    if (!getContact){
        res.status(400)
        // throw new Error(" Contact not Found")
    }

    res.status(200).json(getContact);
}

// @description update contact
// Route put /api/contacts/:id
//Access private
const updateContact = async(req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(400)
        throw new Error ("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update this contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!updateContact){
        res.status(400)
    }

    res.status(200).json(updatedContact);
}


// @description delete contact
// Route delete /api/contacts/:id
//Access private
const deleteContact = async(req, res) => {
    
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(400)
        throw new Error ("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete this contact")
    }

    await Contact.deleteOne({ _id: req.params.id });

    if (!deleteContact){
        res.status(400)

    }

    res.status(200).json(deleteContact);
}

export {getContacts, postContact, getContact, updateContact, deleteContact}