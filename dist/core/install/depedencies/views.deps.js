"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEWS_EXPRESS_AUTH_DEPTS = exports.VIEWS_EXPRESS_BASE_DEPS = void 0;
const base_deps_1 = require("./base.deps");
exports.VIEWS_EXPRESS_BASE_DEPS = [
    ...base_deps_1.baseExpress,
    `ejs`,
    `express-ejs-layouts`,
    `serve-favicon`,
];
exports.VIEWS_EXPRESS_AUTH_DEPTS = [...exports.VIEWS_EXPRESS_BASE_DEPS, ...base_deps_1.baseCookieAuth];
