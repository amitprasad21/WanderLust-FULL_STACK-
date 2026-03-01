const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(450),
        category : Joi.string().valid("Rooms","Iconic Cities","Mountains","Castle","Amazing Pools","Camping","Farms","Arctice","Domes","Beach","Cabins","Houses","Hotel").required(),
        image : Joi.string().allow("", null),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
})