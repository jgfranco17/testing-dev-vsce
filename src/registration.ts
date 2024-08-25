import * as vscode from "vscode";
import { EXTENSION_NAME } from "./app/constants";

export function registerExtensionCommand(
  name: string,
  callback: (...args: any[]) => any
): vscode.Disposable {
  const fullCommandName = `${EXTENSION_NAME}.${name}`;
  const command: vscode.Disposable = vscode.commands.registerCommand(
    fullCommandName,
    callback
  );
  console.log(`Registered command: ${fullCommandName}`);
  return command;
}
