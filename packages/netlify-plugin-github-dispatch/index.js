// @ts-check
const { Octokit } = require("@octokit/rest");
const debug = require("debug")("netlify-plugin-github-dispatch");

const config = {
  auth: process.env.GITHUB_TOKEN,
  owner: "seancdavis",
  repo: "seancdavis-com",
  workflow_id: ".github/workflows/publish-tweets.yml",
  ref: "main",
  inputs: {},
};

module.exports = {
  onSuccess: async ({ constants, utils }) => {
    if (process.env.BRANCH !== config.ref) {
      console.log(`Current branch is not ${config.ref}. Skipping dispatch.`);
      return;
    }
    try {
      debugEnv(constants);
      await dispatchWorkflow();
    } catch (error) {
      return utils.build.failPlugin(error.message, { error });
    }
  },
};

/**
 * Dispatch the GitHub workflow.
 */
async function dispatchWorkflow() {
  const { auth, owner, repo, workflow_id, ref, inputs } = config;

  // Fail if missing gh token.
  if (!config.auth) {
    throw new Error("Missing config.auth. Did you set GITHUB_TOKEN?");
  }

  const octokit = new Octokit({ auth });

  const workflows = await octokit.actions.listRepoWorkflows({ owner, repo });
  if (!workflows.data) {
    throw new Error("Cannot find workflows data");
  }
  debug(workflows.data.workflows);

  console.log("triggering GitHub workflow with %o", {
    owner,
    repo,
    workflow_id,
    ref,
    inputs,
  });

  // Trigger workflow.
  // https://octokit.github.io/rest.js/v18#actions-create-workflow-dispatch
  await octokit.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id,
    ref,
    inputs,
  });
}

/**
 * Render debug output if environment variable
 * `DEBUG=netlify-plugin-github-dispatch` is present.
 *
 * @param {object} constants The `constants` object available to build plugin.
 */
function debugEnv(constants) {
  const context = process.env.CONTEXT;
  const isLocal = constants.IS_LOCAL;
  const siteName = process.env.SITE_NAME;
  // unique deploy url
  const deployUrl = process.env.DEPLOY_URL;
  // preview, branch, or production deploy url
  const deployPrimeUrl = process.env.DEPLOY_PRIME_URL;
  const isPullRequest = process.env.PULL_REQUEST === "true";
  const commitRef = process.env.COMMIT_REF;
  const branch = process.env.BRANCH;
  const headBranch = process.env.HEAD;

  debug({
    isLocal,
    isPullRequest,
    siteName,
    context,
    commitRef,
    branch,
    headBranch,
    deployUrl,
    deployPrimeUrl,
  });
}
