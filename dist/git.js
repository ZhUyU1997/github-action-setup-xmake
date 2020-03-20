"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("@actions/exec");
const io = require("@actions/io");
const os = require("os");
const path = require("path");
exports.folder = path.join(os.tmpdir(), `xmake${Date.now()}`);
const opt = { cwd: exports.folder };
async function lsRemote() {
    let out = '';
    await exec_1.exec('git', ['ls-remote', '--tags', 'https://github.com/xmake-io/xmake.git'], {
        listeners: {
            stdout: d => (out += d.toString()),
        },
    });
    const data = {};
    out.split('\n').forEach(line => {
        const [ref, tag] = line.trim().split('\t');
        if (ref && tag && tag.startsWith('refs/tags/v')) {
            data[tag.substring('refs/tags/v'.length)] = ref;
        }
    });
    return data;
}
exports.lsRemote = lsRemote;
async function create(ref) {
    await io.rmRF(exports.folder);
    await io.mkdirP(exports.folder);
    await exec_1.exec('git', ['init'], opt);
    await exec_1.exec('git', ['remote', 'add', 'origin', 'https://github.com/xmake-io/xmake.git'], opt);
    await exec_1.exec('git', ['fetch'], opt);
    await exec_1.exec('git', ['checkout', ref], opt);
    await exec_1.exec('git', ['submodule', 'update', '--init', '--recursive'], opt);
    return exports.folder;
}
exports.create = create;
async function cleanup() {
    await io.rmRF(exports.folder);
}
exports.cleanup = cleanup;
