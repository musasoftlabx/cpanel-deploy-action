const core = require('@actions/core');
const axios = require('axios');

const main = async () => {

    const timeStart = new Date();
    
        const maxWaitSeconds = 60 * 5;
        const hostname = core.getInput('hostname', {required: true});
        const port = core.getInput('cPanelApiPort', {required: true});
        const repository_root = core.getInput('repository_root', {required: true});
        const updateRepository = core.getBooleanInput('updateRepository', {required: true});
        const cpanel_token = core.getInput('cpanel_token', {required: true});
        const cpanel_username = core.getInput('cpanel_username', {required: true});

        const baseUrl = `${hostname}:${port}/execute`;
        core.info(`baseUrl: '${baseUrl}'`);
        const updateRepoEndpoint = baseUrl + "/VersionControl/update";
        const createDeploymentTaskEndpoint = baseUrl + "/VersionControlDeployment/create";
        const getDeploymentStatusEndpoint = baseUrl + "/VersionControlDeployment/retrieve";

        if (updateRepository) {
            const branch = core.getInput('branch', {required: true});
            let updateRes = await axios.get(updateRepoEndpoint, {
                port: port,
                params: {
                    repository_root,
                    branch,
                },
                headers: {"Authorization": `cpanel ${cpanel_username}:${cpanel_token}`}
            });
            updateRes = updateRes.data;
            core.debug(`updateRes: ${JSON.stringify(updateRes, null, 2)}`);
          
        }

        let startDeployRes = await axios.get(createDeploymentTaskEndpoint, {
            params: {
                repository_root,
            },
            headers: {"Authorization": `cpanel ${cpanel_username}:${cpanel_token}`}
        });
};

main();
