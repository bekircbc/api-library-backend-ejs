import * as qsys from './qsys.js';
import * as qstr from './qstr.js';
import path from 'path';
import { platform } from 'node:process';

// WINDOWS: C:\edward\projects\node-mvc
// LINUX: /home/edward/projects/node-mvc
const __dirname = path.resolve(path.dirname(''));

/**
 * Returns whether Node is running on Windows or Linux.
 * 
 * const system = qsys.getSystem();
 * 
 * WINDOWS: win32
 * LINUX: linux
 */
export const getSystem = () => {
	return platform;
};

/**
 * Returns the operating-system appropriate slash.
 * 
 * const osSlash = getSystemSlash();
 * 
 * WINDOWS: \
 * LINUX: /
 */
export const getSystemSlash = (path) => {
	return platform === 'linux' ? '/' : '\\';
};

/**
 * Gets the operating-system appropriate absolute path and file name of a file.
 * Note as parameter you should always pass a Linux-style site-relative path and file name.
 * 
 * const dbPathAndFileName = qsys.buildAbsolutePathAndFileName('src/data/site.sqlite');
 * 
 * WINDOWS: C:\edward\projects\node-mvc\src\data\site.sqlite
 * LINUX: /home/edward/projects/node-mvc/src/data/site.sqlite
 */
export const buildSystemAbsolutePathAndFileName = (pathAndFileName) => {
	pathAndFileName = qstr.replaceAll(
		pathAndFileName,
		'/',
		qsys.getSystemSlash()
	);
	return __dirname + qsys.getSystemSlash() + pathAndFileName;
};