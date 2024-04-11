const ParadoxUserModel = require("../models/paradoxUser.model.js");
const QuestionModel = require("../models/question.model.js");

const getLevelForTime = () => {
  // Here, you can implement your own logic for determining the current level based on the time if needed.
  // For testing purposes, you can directly return a specific level or leave it as it is.
  // For example:
  // return 'level1';
  return null; // This will indicate that there's no active level for testing purposes.
};

const checkQuestion = async (req, res) => {
  try {
    // const currentLevel = getLevelForTime();
    const currentLevel = "level1"; // For testing purposes, assuming a specific level.

    if (!currentLevel) {
      return res
        .status(200)
        .json({ success: false, message: "No active level" });
    }

    const { uid } = req.body;
    const user = await ParadoxUserModel.findOne({ uid });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User does not exist" });
    }
    console.log(user.currQues);

    const ques = await QuestionModel.findOne({ id: user.currQues });
    console.log(ques);

    if (!ques) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Level Finished",
          data: { isAnswerCorrect: false, isLevelComplete: true },
        });
    }

    const responseData = {
      isAnswerCorrect: false,
      isLevelComplete: false,
      nextQuestion: {
        questionNo: ques.id,
        _id: ques._id,
        question: ques.question,
        image: ques.image,
        isHintAvailable: ques.isHintAvailable,
        score:user.score,
      },
    };

    if (user.unlockedHints.includes(user.currQues)) {
      responseData.nextQuestion.hint = ques.hint;
    }

    return res
      .status(200)
      .json({ success: true, message: "Question found", data: responseData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const checkAnswer = async (req, res) => {
  try {
    const currentLevel = "level1"; // For testing purposes, assuming a specific level.

    if (!currentLevel) {
      return res
        .status(200)
        .json({ success: false, message: "No active level" });
    }

    const { answer, uid } = req.body;
    const user = await ParadoxUserModel.findOne({ uid });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User does not exist" });
    }

    const ques = await QuestionModel.findOne({ id: user.currQues });

    if (!ques) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Level Finished",
          data: { isAnswerCorrect: false, isLevelComplete: true },
        });
    }

    const isAnswerCorrect = ques.answer.toLowerCase() === answer.toLowerCase();
    let scoreToAdd = 0;
    if (isAnswerCorrect) {
      scoreToAdd += 10;
      ques.count++;

      if (ques.count == 1) {
        scoreToAdd += 5;
      } else if (ques.count > 1 && ques.count <= 5) {
        scoreToAdd += 2;
      }

      // const firstSolver = await ParadoxUserModel.findOne({ lastAnswerCorrect: true })
      //   .sort({ lastAnswerTimestamp: 1 });

      // if (firstSolver && firstSolver.uid === uid) {
      //   scoreToAdd += 5;
      // }

      // const firstFiveCorrect = await ParadoxUserModel.find({ lastAnswerCorrect: true })
      //   .sort({ lastAnswerTimestamp: 1 })
      //   .limit(5);

      // if (firstFiveCorrect.some(u => u.uid === uid)) {
      //   scoreToAdd += 2;
      // }

      user.score += scoreToAdd;
      user.lastAnswerCorrect = true;
      await user.save();

      // ques.count++;
      await ques.save();

      // Increment user's current question after processing the answer
      user.currQues++;
      await user.save();
    } else {
      user.lastAnswerCorrect = false;

      await user.save();
    }

    const nextQues = await QuestionModel.findOne({ id: user.currQues });

    const responseData = {
      isAnswerCorrect,
      isLevelComplete: !nextQues,
      nextQuestion: nextQues
        ? {
            questionNo: nextQues.id,
            _id: nextQues._id,
            question: nextQues.question,
            image: nextQues.image,
            isHintAvailable: nextQues.isHintAvailable,
            score:user.score,
          }
        : null,
    };

    console.log(ques.answer.toLowerCase());
    console.log(answer.toLowerCase());
    return res
      .status(200)
      .json({
        success: true,
        message: isAnswerCorrect
          ? "Answer is correct"
          : "Answer is not correct",
        data: responseData,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { checkQuestion, checkAnswer };