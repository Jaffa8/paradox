const QuestionModel = require("../models/question.model.js");
const UserModel = require("../models/paradoxUser.model.js");

const unlockHint = async (req, res) => {
  try {
    const { uid } = req.body;

    
    const currUser = await UserModel.findOne({ uid });
    if (!currUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

   
    const ques = await QuestionModel.findOne({ id: currUser.currQues });
    if (!ques) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

   
    const hintUnlockCost = 30;     // 30 points deducted per hint
    if (currUser.score < hintUnlockCost) {
      return res.status(200).json({
        success: false,
        message: "Not enough points available to unlock the hint",
        data: {
          nextQuestion: {
            questionNo: ques.id,
            _id: ques._id,
            question: ques.question,
            image: ques.image,
            isHintAvailable: ques.isHintAvailable,
          },
        },
      });
    }

    
    let hintUnlockEligible = false;

   
    

    
    const timeSpentThreshold = 180;             // hint unlock after 3 minutes only
    if (currUser.timeSpent[ques.id] && currUser.timeSpent[ques.id] > timeSpentThreshold) {
      hintUnlockEligible = true;
    }

    if (hintUnlockEligible) {
     
      currUser.score -= hintUnlockCost;           // deducting the score
      currUser.unlockedHints.push(ques.id);
      await currUser.save();

     
      const nextQuestion = {
        questionNo: ques.id,
        _id: ques._id,
        question: ques.question,
        hint: ques.hint,
        image: ques.image,
        isHintAvailable: ques.isHintAvailable,
      };

      return res.status(200).json({
        success: true,
        message: "Hint unlocked successfully",
        data: { nextQuestion },
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "User not eligible to unlock the hint for this question",
        data: {
          nextQuestion: {
            questionNo: ques.id,
            _id: ques._id,
            question: ques.question,
            image: ques.image,
            isHintAvailable: ques.isHintAvailable,
          },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { unlockHint };
