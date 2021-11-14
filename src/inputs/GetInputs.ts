import prompt from "prompts";
import fs from "fs";
import { promisify } from "util";
const readdir = promisify(fs.readdir);
import { join } from "path";
import { validateName } from "../utils/validations";
import { onCancel } from "../utils/functions";

export default class GetInputs {
  static async getName(): Promise<{ name: string }> {
    return prompt(
      {
        name: "name",
        type: "text",
        message: "Project name?",
        validate: validateName,
      },
      {
        onCancel,
      }
    );
  }

  static getVariant(): Promise<{ variant: number }> {
    return prompt(
      {
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
      },
      {
        onCancel,
      }
    );
  }

  static async getProject(): Promise<{ project: "fs" | "json" | "views" }> {
    const templates = join(process.cwd(), "template");

    const projectFolders = await readdir(templates);
    const onlyDirs = [...projectFolders]
      .filter((e) => !/\./.test(e))
      .sort((a, b) => b.localeCompare(a));

    return prompt(
      [
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
      ],
      {
        onCancel,
      }
    );
  }
}
