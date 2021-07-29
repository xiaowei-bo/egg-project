'use strict';

const Service = require('egg').Service;
const { execAsync } = require("../utils/index");
const sh = require("shelljs");

class GitnotifyService extends Service {
    async handlerNotify(req) {
        console.log('req', req);
        console.log('reqbody', req.body);
        const { payload } = req.body;
        const { repository } = JSON.parse(payload);
        const { name } = repository;
        if (!name) {
            return {
                stderr: "please set your project"
            }
        }
        let shFilePath = `/work/wyb/project_files/${name}/sh/build.sh`;
        const findRes = sh.find(shFilePath);
        if (findRes.code) {
            return {
                code: findRes.code,
                stdout: findRes.stdout,
                stderr: findRes.stderr
            }
        }
        sh.chmod(777, shFilePath);
        sh.cd(`/work/wyb/project_files/${name}`);
        try {
            const execRes = await execAsync("sh/build.sh");
            return {
                code: execRes.code,
                stdout: execRes.stdout,
                stderr: execRes.stderr
            }
        } catch (error) {
            console.log(error)
            return {
                stderr: error
            }
        }
    }
    async cd(req) {
        const { project } = req.query;
        if (!project) {
            return {
                stderr: "please set your project"
            }
        }
        let shFilePath = `/work/wyb/project_files/${project}/sh/deploy.sh`;
        const findRes = sh.find(shFilePath);
        if (findRes.code) {
            return {
                code: findRes.code,
                stdout: findRes.stdout,
                stderr: findRes.stderr
            }
        }
        sh.chmod(777, shFilePath);
        sh.cd(`/work/wyb/project_files/${project}`);
        const execRes = await execAsync("sh/deploy.sh");
        return {
            code: execRes.code,
            stdout: execRes.stdout,
            stderr: execRes.stderr
        }
    }
}


module.exports = GitnotifyService;