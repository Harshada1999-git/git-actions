const core = require('@actions/core');
const exec = require('@actions/exec');
 
const validateBranchName = ({ branchName }) => /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName);
const ValidateDirectoryName = ({dirName}) => a-zA-Z0-9-+$/test(dirName);
  
async function run() { 
  const baseBranch = core.getInput('base-Branch');
  const targetBranch = core.getInput('target-Branch');
  const ghToken = core.getInput('ghToken');
  const workingDir = core.getInput('working-directory');
  const debug = core.getInput('debug');

  core.setSecret(ghToken);

  if (validateBranchName({branchName: baseBranch})){
    core.setFailed('invalid base branch name')
    return;
  }

  if (validateBranchName({branchName: targetBranch})){
    core.setFailed('invalid target-branch name')
    return;
  }

  if (validateDirectoryName({branchName: workingDir})){
    core.setFailed('invalid directory name')
    return;
  }

  core.info(`[js-dependency-update]: base branch is ${baseBranch}`);
  core.info(`[js-dependency-update]: base branch is ${targetBranch}`);
  core.info(`[js-dependency-update]: base branch is ${workingDir}`);

  awaitexec.exec('npm update', [],{
    cwd: workingDir
  });

  const gitStatus = await exec.getExecOutput('git status -s package.json', [],{

  });

  if (gitStatus.stdout.length > 0 ){
    core.info('[js-dependency-updateThere are upodates available')
  }else{
    core.info('[js-dependency-update]: No updates at this point')
  }
  /*
  1. Parse Inputs:
    1.1 base-branch from which to check for updates
    1.2 target-branch to use to create the PR
    1.3 github Token for authentication purpose (to create PRs)
    1.4 Working directory for which to check dependencies
  2. Execute the npm update command within the working directory
  3. Check whether there are modified package*.json files
  4. If there are modified files:
    4.1 Add and Commit files to the target branch 
    4.2 Create a PR to the base-branch using the Octokit API
  5. Otherwise, conclude the custom action
  */
  core.info('I am a custom JS action');
}
 
run();