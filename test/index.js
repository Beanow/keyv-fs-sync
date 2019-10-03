'use strict';
const test = require('ava');
const Fs = require('memory-fs');
const keyvTestSuite = require('@keyv/test-suite').default;
const Keyv = require('keyv');
const KeyvFsSync = require('../src');

const root = '/test';

const store = () => {
	const fs = new Fs();
	fs.mkdirpSync(root);
	return KeyvFsSync(fs, root, true);
};

keyvTestSuite(test, Keyv, store);
