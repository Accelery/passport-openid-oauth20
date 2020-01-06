import { expect } from "chai";

import { Strategy } from "./strategy";

describe("passport-openid-oauth20", () => {
  it("should export Strategy constructor", () => {
    expect(Strategy).to.be.a("function");
  });
});
