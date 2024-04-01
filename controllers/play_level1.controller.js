const ParadoxUserModel = require("../models/paradoxUser.model.js");
const QuestionModel = require("../models/question.model.js");

const levels = {
  level1: {
    start: 1681533000000,
    end: 1681583400000
  },
  
};

const getLevelForTime = (currTime) => {
  for (const level in levels) {
    if (currTime >= levels[level].start && currTime <= levels[level].end) {
      return level;
    }
  }
  return null;
};

const checkQuestion = async (req, res) => {
  try {
    const currTime = Date.now();
    const currentLevel = getLevelForTime(currTime);

    if (!currentLevel) {
      return res.status(200).json({ success: false, message: "No active level" });
    }

    const { uid } = req.body;
    const user = await ParadoxUserModel.findOne({ uid });

    if (!user) {
      return res.status(200).json({ success: false, message: "User does not exist" });
    }

    const ques = await QuestionModel.findOne({ id: user.currQues });

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
    const currentLevel = getLevelForTime(currTime);

    if (!currentLevel) {
      return res.status(200).json({ success: false, message: "No active level" });
    }

    const { answer, uid } = req.body;
    const user = await ParadoxUserModel.findOne({ uid });

    if (!user) {
      return res.status(200).json({ success: false, message: "User does not exist" });
    }

    const ques = await QuestionModel.findOne({ id: user.currQues });

    if (!ques) {
      return res.status(200).json({ success: true, message: "Level Finished", data: { isAnswerCorrect: false, isLevelComplete: true } });
    }

    const isAnswerCorrect = ques.answer.toLowerCase().replace(" ", "") === answer.toLowerCase();
    let scoreToAdd = 0;

    if (isAnswerCorrect) {
      
      scoreToAdd += 10;

      const firstSolver = await ParadoxUserModel.findOne({ lastAnswerCorrect: true })
        .sort({ lastAnswerTimestamp: 1 });

      if (firstSolver && firstSolver.uid === uid) {
        scoreToAdd += 5;       // first solver will get 5 extra points
      }
     
      const firstFiveCorrect = await ParadoxUserModel.find({ lastAnswerCorrect: true }) 
        .sort({ lastAnswerTimestamp: 1 })
        .limit(5);

      if (firstFiveCorrect.some(u => u.uid === uid)) {
        scoreToAdd += 2;                    // first 5 solver will get 5 more points per question
      }

     
      if (user.lastAnswerCorrect) {
        user.consecutiveCorrectAnswers++;
        scoreToAdd += user.consecutiveCorrectAnswers * 5; // for every consecutive right answer 5 more points
      } else {
        user.consecutiveCorrectAnswers = 1;   // else streak =1
      }

      
      user.score += scoreToAdd;
      user.lastAnswerCorrect = true; 
      await user.save();

      
      ques.count++;
      await ques.save();
    } else {
      
      user.lastAnswerCorrect = false;
      user.consecutiveCorrectAnswers = 0;
      await user.save();
    }

    const nextQues = await QuestionModel.findOne({ id: user.currQues });

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
