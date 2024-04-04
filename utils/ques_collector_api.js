const { Router } = require("express");
const Question = require("../models/question.model");


const router = Router();


const renderQuestionForm = (req, res) => {
  res.render("questions"); 
};


router.get("/form", renderQuestionForm);


const submitQuestion = async (req, res, model) => {
  try {
    const { id, question, image, answer, hint, isHintAvailable, isAnswerRequired } = req.body;

    console.log(id, question, image, answer);

    const newQues = new model({
      question: question,
      id: id,
      image: image,
      answer: answer,
      hint: hint,
      isHintAvailable: isHintAvailable,
      isAnswerRequired: isAnswerRequired,
    });

    await newQues.save();

    return res.status(200).json({ message: "submitted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


router.post("/submit", async (req, res) => {
  await submitQuestion(req, res, Question);
});



module.exports = router;
