import * as vscode from "vscode";

export function identifyActiveFile(): void {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const filePath = document.uri.fsPath;
    vscode.window.showInformationMessage(
      `The current open file is: ${filePath}`
    );
  }
}

export function updateStatusBar(statusBarItem: vscode.StatusBarItem): void {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const filePath = document.uri.fsPath;
    statusBarItem.text = `$(file-code) ${filePath}`;
    statusBarItem.command = "testing-dev-vsce.runPytest";
  } else {
    statusBarItem.text = "No file is currently open";
    statusBarItem.command = undefined; // No command if there's no file
  }
}
