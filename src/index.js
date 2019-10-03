'use strict';

const {tmpdir} = require('os');
const {join: pathJoin} = require('path');
const {accessSync, constants: fsConstants, readFileSync, writeFileSync, mkdtempSync, existsSync, unlinkSync} = require('fs');
const {sync: rimrafSync} = require('rimraf');

const hashKeyHex = key => Buffer.from(key).toString('hex');

module.exports = (opts) => {
	const options = {
		path: null,
		encode: JSON.stringify,
		decode: JSON.parse,
		hashKey: hashKeyHex,
		...opts
	};

	// Default path is to generate a random tmp dir.
	if(!options.path) {
		options.path = mkdtempSync(pathJoin(tmpdir(), 'keyv-dir-default-'));
	}

	// Test FS is ready.
	accessSync(options.path, fsConstants.R_OK | fsConstants.W_OK);

	const {path, encode, decode, hashKey} = options;

	const get = key => {
		const hash = hashKey(key);
		if(!existsSync(pathJoin(path, hash))) return undefined;
		return decode(readFileSync(pathJoin(path, hash)));
	};

	const set = (key, value) => {
		const hash = hashKey(key);
		return writeFileSync(pathJoin(path, hash), encode(value));
	};

	const del = key => {
		const hash = hashKey(key);
		const f = pathJoin(path, hash);
		if(!existsSync(f)) return false;
		unlinkSync(f);
		return true;
	};

	const clear = () => {
		rimrafSync(pathJoin(path, '*'));
	};

	return {get, set, delete:del, clear};
};
