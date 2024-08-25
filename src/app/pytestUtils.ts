import * as vscode from "vscode";
import { EXTENSION_NAME } from "./constants";

export function checkPytest(document: vscode.TextDocument): void {
  const text = document.getText();
  const pytestFunctions = findPytestFunctions(text);

  if (pytestFunctions.length > 0) {
    vscode.window
      .showInformationMessage(
        `Found ${pytestFunctions.length} Pytest function(s) in current document`,
        "Run tests"
      )
      .then((selection) => {
        switch (selection) {
          case "Run tests": {
            console.log("Running tests!");
            runPytestOnFile(document.uri.fsPath);
            break;
          }
          default: {
            console.log("Disregarding tests...");
            break;
          }
        }
      });
  } else {
    console.log(`No tests to run in ${document.uri.fsPath}`);
  }
}

function checkPythonFile(document: vscode.TextDocument): boolean {
  const isPyFile: boolean = document.uri.fsPath.endsWith(".py");
  return document.languageId === "python" && isPyFile;
}

function findPytestFunctions(text: string): string[] {
  const functionRegex: RegExp = /def (test_\w+)/g;
  const pytestFunctions: string[] = [];
  let match;

  while ((match = functionRegex.exec(text)) !== null) {
    pytestFunctions.push(match[1]);
  }

  return pytestFunctions;
}

function runPytestOnFile(filepath: string): void {
  let terminal = vscode.window.terminals.find((t) => t.name === EXTENSION_NAME);
  if (!terminal) {
    // If no existing terminal is found, create a new one
    terminal = vscode.window.createTerminal(EXTENSION_NAME);
  }
  terminal.sendText(`pytest "${filepath}"`);
  terminal.show();
}
