const QuestionModel = require("../models/question.model");
const UserModel = require("../models/paradoxUser.model");

const unlockHint = async (req, res) => {
  try {
    const { uid } = req.body; 

    const currUser = await UserModel.findOne({ uid }); 
    const ques = await QuestionModel.findOne({ id: currUser.currQues });

    if (currUser.score >= 30) { 
      currUser.score -= 30; 
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

      return res.status(200).send({
        success: true,
        message: "Hint Unlocked",
        data: { nextQuestion },
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Not enough points available",
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
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { unlockHint };
