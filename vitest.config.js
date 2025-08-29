import { defineConfig } from "vitest/config";


export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",        // Simulate a browser
		setupFiles: "./test/setup.ts",
		include: ["test/**/*.test.ts"],
		deps: {
			inline: true,
		},
	},
});
