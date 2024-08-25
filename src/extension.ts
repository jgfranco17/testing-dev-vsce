import * as vscode from "vscode";
import {
  identifyActiveFile,
  copyPathToCurrentFile,
  updateStatusBar,
  interactiveWindow,
} from "./app/displayTooling";
import { checkPytest } from "./app/pytestUtils";
import { registerExtensionCommand } from "./registration";

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

  // Also update the status bar when the extension is activated
  updateStatusBar(statusBarItem);

  const identifyFile = registerExtensionCommand(
    "identifyFile",
    identifyActiveFile
  );

  const showMessageCommand = registerExtensionCommand(
    "showInfoMessage",
    interactiveWindow
  );

  // Subscribe to active editor changes
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      const document = editor.document;
      identifyActiveFile();
      copyPathToCurrentFile(statusBarItem);
      checkPytest(document);
    }
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
  context.subscriptions.push(
    statusBarItem,
    identifyFile,
    greeting,
    copyPath,
    showMessageCommand
  );
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("Shutting down extension...");
}
