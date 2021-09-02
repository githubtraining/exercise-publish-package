const github = require("@actions/github");
const core = require("@actions/core");

module.exports = async () => {
  const token = core.getInput("token");
  const octokit = github.getOctokit(token);

  try {
    //   Do some logic to verify the leaner understands

    if (GOOD - RESULT) {
      return {
        reports: [
          {
            filename: "",
            isCorrect: true,
            display_type: "actions",
            level: "info",
            msg: "Great job!",
            error: {
              expected: "",
              got: "",
            },
          },
        ],
      };
      // BAD-RESULT
    } else {
      return {
        reports: [
          {
            filename: "",
            isCorrect: false,
            display_type: "actions",
            level: "warning",
            msg: `incorrect solution`,
            error: {
              expected: "What we expecrted",
              got: `What we got`,
            },
          },
        ],
      };
    }
  } catch (error) {
    return {
      reports: [
        {
          filename: filename,
          isCorrect: false,
          display_type: "actions",
          level: "fatal",
          msg: "",
          error: {
            expected: "",
            got: "An internal error occurred.  Please open an issue at: https://github.com/githubtraining/exercise-remove-commit-history and let us know!  Thank you",
          },
        },
      ],
    };
  }
};
