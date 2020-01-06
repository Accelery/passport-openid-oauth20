"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var strategy = require("..");
describe("passport-openid-oauth20", function () {
    it("should export Strategy constructor", function () {
        chai_1.expect(strategy.Strategy).to.be.a("function");
    });
    it("should export Strategy constructor as module", function () {
        chai_1.expect(strategy).to.be.a("function");
        chai_1.expect(strategy).to.equal(strategy.Strategy);
    });
});
