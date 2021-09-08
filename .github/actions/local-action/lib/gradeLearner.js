const core = require("@actions/core");

module.exports = async () => {
  const eventContext = core.getInput("event_ctx");
  const eventContextJSON = JSON.parse(eventContext);
  const eventAction = eventContextJSON.action;

  const packageName = eventContextJSON.registry_package.name;
  const packageVersion =
    eventContextJSON.registry_package.package_version.version;
  const packageNameSpace = eventContextJSON.registry_package.namespace;

  try {
    // GOOD-RESULT
    if (eventAction === "published") {
      return {
        reports: [
          {
            filename: "",
            isCorrect: true,
            display_type: "actions",
            level: "info",
            msg: `Great Job!  You can have successfully published the ${packageName} package to the ${packageNameSpace} with a version of ${packageVersion}`,
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
              expected: "We expected a successfully publised packge.",
              got: `${JSON.stringify({
                publish_status: eventAction,
                package_name: packageName,
                package_version: packageVersion,
                package_namespace: packageNameSpace,
              })}`,
            },
          },
        ],
      };
    }
  } catch (error) {
    return {
      reports: [
        {
          filename: "",
          isCorrect: false,
          display_type: "actions",
          level: "fatal",
          msg: "",
          error: {
            expected: "",
            got: "An internal error occurred.  Please open an issue at: https://github.com/githubtraining/exercise-publish-package and let us know!  Thank you",
          },
        },
      ],
    };
  }
};
