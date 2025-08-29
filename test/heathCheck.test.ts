import { describe, it, expect } from "vitest"
import { heathCheck } from "../src/main";
import { URL } from "./setup";

describe("Testing heath check function", () => {



	it(`Get check state:success`, async () => {
		const res = await heathCheck(URL);

		expect(res).toBe(true);
	})
})
