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
    const filePath = vscode.workspace.asRelativePath(
      document.uri.fsPath,
      false
    );
    statusBarItem.text = `$(file-code) ${filePath}`;

    // Set the command to copy the file path when clicked
    statusBarItem.command = "testing-dev-vsce.copyFilePath";
  } else {
    statusBarItem.text = "No file is currently open";
    statusBarItem.command = undefined; // No command if there's no file
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

export function interactiveWindow(): void {
  vscode.window
    .showInformationMessage("Would you like to proceed?", "Yes", "No")
    .then((selection) => {
      if (selection === "Yes") {
        vscode.window.showInformationMessage("You selected Yes!");
      } else if (selection === "No") {
        vscode.window.showInformationMessage("You selected No!");
      }
    });
}
