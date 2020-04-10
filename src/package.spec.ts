import { expect } from "chai";

const strategy = require("..");

describe("passport-openid-oauth20", function () {
  it("should export Strategy constructor", function () {
    expect(strategy.Strategy).to.be.a("function");
  });
});
