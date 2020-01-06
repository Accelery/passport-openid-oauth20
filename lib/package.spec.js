"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var strategy_1 = require("./strategy");
describe("passport-openid-oauth20", function () {
    it("should export Strategy constructor", function () {
        chai_1.expect(strategy_1.Strategy).to.be.a("function");
    });
});
