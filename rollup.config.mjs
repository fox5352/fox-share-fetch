// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
	input: 'src/main.ts', // Change input file extension to .ts
	output: [
		{
			file: 'dist/main.js',
			format: 'cjs',
			sourcemap: true
		},
		{
			file: 'dist/main.mjs',
			format: 'esm',
			sourcemap: true
		}
	],
	plugins: [json(), typescript()],
};