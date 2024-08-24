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

export function copyPathToCurrentFile(
  statusBarItem: vscode.StatusBarItem
): void {
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
}
