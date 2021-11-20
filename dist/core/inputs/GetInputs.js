"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const prompts_1 = __importDefault(require("prompts"));
const util_1 = require("util");
const validator_1 = require("../validator");
const readdir = (0, util_1.promisify)(fs_1.default.readdir);
class GetInputs {
    static getName() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, prompts_1.default)({
                name: "name",
                type: "text",
                message: "Project name?",
                validate: validator_1.NameValidator.validate,
            }, {
                onCancel: this.onCancel,
            });
        });
    }
    static getVariant() {
        return (0, prompts_1.default)({
            name: "variant",
            type: "select",
            message: "Do you want to have auth already built?",
            initial: 0,
            choices: [
                {
                    title: "No, thank you 🚀",
                    value: 0,
                },
                { title: "Yes, please 💪", value: 1 },
            ],
        }, {
            onCancel: this.onCancel,
        });
    }
    static getProject() {
        return __awaiter(this, void 0, void 0, function* () {
            let templates = "";
            let starting = (0, path_1.join)(process.cwd());
            let count = 0;
            while (!templates) {
                const path = (0, path_1.join)(starting, "template");
                try {
                    yield readdir(path);
                    templates = path;
                }
                catch (_error) {
                    // Runs in case of no template folder present
                    starting = (0, path_1.join)(process.cwd(), "..");
                }
                count++;
                if (count > 3) {
                    process.exit(1);
                }
            }
            const projectFolders = yield readdir(templates);
            const onlyDirs = [...projectFolders]
                .filter((e) => !/\./.test(e))
                .sort((a, b) => b.localeCompare(a));
            return (0, prompts_1.default)([
                {
                    name: "project",
                    type: "select",
                    message: "Which kind?",
                    initial: 0,
                    choices: onlyDirs.map((e) => {
                        return {
                            title: e,
                            value: e,
                        };
                    }),
                },
            ], {
                onCancel: this.onCancel,
            });
        });
    }
    static onCancel(data) {
        console.log(`You did not set a ${data.name} and canceled the ironlauncher`);
        process.exit(1);
    }
}
exports.default = GetInputs;
