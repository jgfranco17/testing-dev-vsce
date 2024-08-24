import * as vscode from "vscode";
import { projectConfigs } from "./app/constants";

export function registerExtensionCommand(
  name: string,
  callback: (...args: any[]) => any
): vscode.Disposable {
  const fullCommandName = `${projectConfigs.commandPrefix}.${name}`;
  const command: vscode.Disposable = vscode.commands.registerCommand(
    fullCommandName,
    callback
  );
  console.log(`Registered command: ${fullCommandName}`);
  return command;
}
