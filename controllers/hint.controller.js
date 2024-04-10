const QuestionModel = require("../models/question.model.js");
const UserModel = require("../models/paradoxUser.model.js");

const unlockHint = async (req, res) => {
  try {
    const { uid, id } = req.body;
    
    // Find the user by UID`+-------------------------------------------------------------------------------------------------------------
   
    const currUser = await UserModel.findOne({ uid });
    if (!currUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
   
  
    // Find the question by its ID
    const ques = await QuestionModel.findOne({ id });
    if (!ques) {
      return res.status(404).json({ success: false, message: "Question not found" });
    } 

    // Check if the user has enough points to unlock the hint
    const hintUnlockCost = 5; // 30 points deducted per hint
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

    // Check if the user is eligible to unlock the hint based on time spent
    // const timeSpentThreshold = 180; // hint unlock after 3 minutes only
    // let hintUnlockEligible = false;
    // if (currUser.timeSpent[ques.id] && currUser.timeSpent[ques.id] > timeSpentThreshold) {
    //   hintUnlockEligible = true;
    // }

    // Handle hint unlocking
    if (hintUnlockEligible) {
      // Deduct the hint unlock cost from the user's score
      currUser.score -= hintUnlockCost;
      // Add the question ID to the list of unlocked hints for the user
      currUser.unlockedHints.push(ques.id);
      // Save the updated user object
      await currUser.save();

      // Prepare response data
      const nextQuestion = {
        questionNo: ques.id,
        _id: ques._id,
        question: ques.question,
        hint: ques.hint,
        image: ques.image,
        isHintAvailable: ques.isHintAvailable,
      };

      // Send success response with unlocked hint information
      return res.status(200).json({
        success: true,
        message: "Hint unlocked successfully",
        data: { nextQuestion },
      });
    } else {
      // Send response indicating user is not eligible to unlock the hint
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
    // Handle internal server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { unlockHint };
