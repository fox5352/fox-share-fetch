import { describe, expect, it } from "vitest";
import { getindex } from "../src/main";
import { URL } from "./setup";

const expectedRoutes = [
	{
		path: "/",
		name: "home",
		description: "index of available routes",
		methods: [["GET", "Public"]],
	},
	{
		path: "/settings",
		name: "settings",
		description: "view and edit settings",
		methods: [["GET", "Public"]],
	},
	{
		path: "/allowed",
		name: "allowed",
		description: "view allowed file types and folders",
		methods: [["GET", "Public"]],
	},
	{
		path: "/filetype/{audio|doc|image}",
		name: "filetype",
		description: "view what data is abale to be downloaded",
		methods: [["GET", "Public"]],
	},
	{
		path: "/download?path=\u003Cpath\u003E",
		name: "download",
		description: "Download file from given route if allowed",
		methods: [["GET", "Public"]],
	},
];

describe("index routes", () => {
	it("GET index stats:success", async () => {
		const res = await getindex(URL);

		// Check that the response has the property
		expect(res).toHaveProperty("routes");

		// Extract routes
		const { routes } = res;

		// Check type safety first
		expect(Array.isArray(routes)).toBe(true);

		// Finally, check deep equality
		expect(routes).toEqual(expectedRoutes);
	});
});
