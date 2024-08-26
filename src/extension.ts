import * as vscode from "vscode";
import { identifyActiveFile, updateStatusBar } from "./app/displayTooling";
import { checkPytest, runPytestOnFile } from "./app/testRunner";
import { registerExtensionCommand } from "./registration";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "testing-dev-vsce" is now active!'
  );
  // Create a status bar item
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  statusBarItem.tooltip = "Click to run tests";
  statusBarItem.show();
  updateStatusBar(statusBarItem);

  const identifyFile = registerExtensionCommand(
    "identifyFile",
    identifyActiveFile
  );

  const runPytest = registerExtensionCommand("runPytest", () => {
    const editor = vscode.window.activeTextEditor;
    updateStatusBar(statusBarItem);
    if (editor) {
      const filePath = editor.document.uri.fsPath;
      runPytestOnFile(filePath);
    }
  });

  // Subscribe to active editor changes
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      const document = editor.document;
      identifyActiveFile();
      updateStatusBar(statusBarItem);
      checkPytest(document);
    }
  });
  const greeting = registerExtensionCommand("greet", () => {
    vscode.window.showInformationMessage("Hello World from testing-dev-vsce!");
  });

  context.subscriptions.push(statusBarItem, identifyFile, greeting, runPytest);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("Shutting down extension...");
}
