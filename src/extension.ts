// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  identifyActiveFile,
  copyPathToCurrentFile,
} from "./app/displayTooling";
import { registerExtensionCommand } from "./registration";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "testing-dev-vsce" is now active!'
  );
  // Create a status bar item
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.tooltip = "Click to copy file path";
  statusBarItem.show();

  // Function to update the status bar with the active file's path
  const updateStatusBar = () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const filePath = document.uri.fsPath;
      statusBarItem.text = `$(file-code) ${filePath}`;

      // Set the command to copy the file path when clicked
      statusBarItem.command = "testing-dev-vsce.copyFilePath";
    } else {
      statusBarItem.text = "No file is currently open";
      statusBarItem.command = undefined; // No command if there's no file
    }
  };

  // Also update the status bar when the extension is activated
  updateStatusBar();

  const identifyFile = registerExtensionCommand(
    "identifyFile",
    identifyActiveFile
  );

  // Subscribe to active editor changes
  vscode.window.onDidChangeActiveTextEditor(() => {
    identifyActiveFile();
    copyPathToCurrentFile(statusBarItem);
  });
  const greeting = registerExtensionCommand("greet", () => {
    vscode.window.showInformationMessage("Hello World from testing-dev-vsce!");
  });

  const copyPath = registerExtensionCommand("copyFilePath", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const filePath = document.uri.fsPath;

      // Copy the file path to the clipboard
      vscode.env.clipboard.writeText(filePath).then(() => {
        vscode.window.showInformationMessage("File path copied to clipboard!");
      });
    }
  });
  context.subscriptions.push(statusBarItem, identifyFile, greeting, copyPath);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("Shutting down extension...");
}
