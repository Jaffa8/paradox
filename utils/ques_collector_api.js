const { Router } = require("express");
const Question = require("../models/question.model");


const router = Router();


router.get("/form", (req, res) => {
  res.render("questions"); 
});


const submitQuestion = async (req, res, model) => {
  try {
    const { questionNo, question, image, answer } = req.body;

    console.log(questionNo, question, image, answer);

    const newQues = new model({
      question: question,
      id: questionNo,
      image: image,
      answer: answer,
    });

    await newQues.save();

    return res.status(200).json({
      message: "submitted",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

router.post("/submit", async (req, res) => {
  await submitQuestion(req, res, Question);
});

module.exports = router;