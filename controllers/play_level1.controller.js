const ParadoxUser = require("../models/paradoxUser.model.js");
const Question = require("../models/question.model.js");


const level1StartsAt = 1681533000000;
const level2StartsAt = 1681626600000;
const level1EndsAt = 1681583400000;
const level2EndsAt = 1681655400000;


const checkQuestion = async (req, res) => {
  try {
    const currTime = Date.now();

  
    if (currTime < level1StartsAt || currTime > level1EndsAt) {
      return res.status(200).json({ success: false, message: "Level has ended" });
    }

    const { uid } = req.body;

 
    const user = await ParadoxUser.findOne({ uid });

    if (!user) {
      return res.status(200).json({ success: false, message: "User does not exist" });
    }

   
    const ques = await Question.findOne({ id: user.currQues });

    if (!ques) {
      return res.status(200).json({ success: true, message: "Level Finished", data: { isAnswerCorrect: false, isLevelComplete: true } });
    }

    const responseData = {
      isAnswerCorrect: false,
      isLevelComplete: false,
      nextQuestion: {
        questionNo: ques.id,
        _id: ques._id,
        question: ques.question,
        image: ques.image,
        isHintAvailable: ques.isHintAvailable
      }
    };

  
    if (user.unlockedHints.includes(user.currQues)) {
      responseData.nextQuestion.hint = ques.hint;
    }

    return res.status(200).json({ success: true, message: "Question found", data: responseData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const checkAnswer = async (req, res) => {
  try {
    const currTime = Date.now();

  
    if (currTime < level1StartsAt || currTime > level1EndsAt) {
      return res.status(200).json({ success: false, message: "Level has ended" });
    }

    const { answer, uid } = req.body;

    const user = await ParadoxUser.findOne({ uid });

    if (!user) {
      return res.status(200).json({ success: false, message: "User does not exist" });
    }

  
    const ques = await Question.findOne({ id: user.currQues });

    if (!ques) {
      return res.status(200).json({ success: true, message: "Level Finished", data: { isAnswerCorrect: false, isLevelComplete: true } });
    }

   
    const isAnswerCorrect = ques.answer.toLowerCase().replace(" ", "") === answer.toLowerCase();

    if (isAnswerCorrect) {
      let scoreToAdd = 20;
      
     
      if (ques.count < 5) {
        scoreToAdd += 10;
      }
      
      if (ques.count === 0) {
        scoreToAdd += 5;
      }
      
      user.score += scoreToAdd;
      user.currQues++;
      await user.save();
      
      ques.count++;
      await ques.save();
    }
    

   
    const nextQues = await Question.findOne({ id: user.currQues });

    const responseData = {
      isAnswerCorrect,
      isLevelComplete: !nextQues,
      nextQuestion: nextQues ? {
        questionNo: nextQues.id,
        _id: nextQues._id,
        question: nextQues.question,
        image: nextQues.image,
        isHintAvailable: nextQues.isHintAvailable
      } : null
    };

    return res.status(200).json({ success: true, message: isAnswerCorrect ? "Answer is correct" : "Answer is incorrect", data: responseData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { checkQuestion, checkAnswer };
