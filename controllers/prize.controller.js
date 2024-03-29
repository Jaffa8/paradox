const Prize=require("../models/prize.model.js");


const getAllPrizes = async (req, res) => {
    try {
        const prizes = await Prize.find();
        res.status(200).json({message:"success:true"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports=getAllPrizes;