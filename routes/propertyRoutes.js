const express = require('express');
const Property = require('../models/Property.js');
const router = express.Router();

// Get all properties
router.post('/properties', async (req, res) => {
 try {
  const { name, location, price ,type ,description} = req.body;

  if (!name || !location || !price ||!type || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const createProperty = new Property({
    name : name, 
    location : location, 
    price: price ,
    type : type ,
    description : description
  });

  await createProperty.save();

  res.status(201).json({
    message: "Property Created successfully",
   
});

 } catch (error) {
  console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
 }



  // const users = await Property.create({
  //   name: "Chic Studio",
  //       location: "San Francisco, CA",
  //       price: 3000,
  //       type: "rent",
  //       description: "A stylish studio apartment in the heart of San Francisco, perfect for urban living."
  // });
  // res.send(users)
 

 
});


router.get('/getproperties', async (req, res) => {
  try {
    const properties = await Property.find({});
  
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  } 
})


// AI-driven recommendations (basic logic)
router.get('/recommendations', async (req, res) => {
  // Sample algorithm: Recommend properties based on previous interactions (for demo purposes)
  const recommendedProperties = await Property.find({}).limit(5);
  res.json(recommendedProperties);
});

module.exports = router;
