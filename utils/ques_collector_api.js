const { Router } = require("express");
const Question = require("../models/question.model");

const router = Router();

router.get("/form", async (req, res) => {
  try {
    const questions = await Question.find({});
    console.log(questions);
    res.send(questions);
  } catch (error) {
    console.log("Failed to fetch questions:", error);
    res.status(500).send("Error fetching questions");
  }
});

const submitQuestion = async (req, res, model) => {
  try {
    const { questionNo, question, image, answer,hint } = req.body;

    console.log(questionNo, question, image, answer,hint);

    const newQues = new model({
      question: question,
      id: questionNo,
      image: image,
      answer: answer,
      hint: hint
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