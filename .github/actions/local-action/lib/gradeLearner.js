const github = require("@actions/github");
const core = require("@actions/core");
const {spawnSync} = require('child_process')

module.exports = async () => {
  // const token = core.getInput("github-token");
  // const octokit = github.getOctokit(token);
  // const {owner,repo, full_name} = github.context.repo
  const eventContext = core.getInput("event_ctx")
  const eventContextJSON = JSON.parse(eventContext)
  const packageURL = eventContextJSON.package.package_version.source_url
  

  try {
    //   Do some logic to verify the leaner understands

    // TODO: run this query for all possible package types, aggregate results in an array to check count
    // TODO: repeat this query for orgs
    // const userPackages = await octokit.rest.packages.listPackagesForUser({
    //   package_type: "container",
    //   username: owner
    // })
    // const userPackageNames = userPackages.data.map(pkg=>pkg.name)
    // console.log(userPackageNames)

    // check if our repo package name is in the userPackageNames array
    // for (const name of userPackageNames){
      // if name == what we want
    // }
    const result = spawnSync("docker", ["pull",packageURL], { cwd: dir })


    if (result.status == 0) {
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
              got: `${status.stderr.toString()}`,
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
