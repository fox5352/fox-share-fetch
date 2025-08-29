// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/main.ts', // Change input file extension to .ts
	output: [
		{
			file: 'dist/main.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/main.mjs',
			format: 'esm',
			sourcemap: true
		}
	],
	watch: {
		include: ['src/**'],
		exclude: ['node_modules/**']
	},
	plugins: [typescript()],
};