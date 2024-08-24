// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "testing-dev-vsce" is now active!'
  );
  // Function to identify the currently active file
  const identifyActiveFile = () => {
    const editor = vscode.window.activeTextEditor;
    let message: string;
    if (editor) {
      const document = editor.document;
      const filePath = document.uri.fsPath;
      message = `The current open file is: ${filePath}`;
    } else {
      message = "No file is currently open.";
    }
  };

  // Register the command
  const identifyAct = vscode.commands.registerCommand(
    "vulcanbox.identifyFile",
    () => {
      identifyActiveFile();
    }
  );

  // Subscribe to active editor changes
  vscode.window.onDidChangeActiveTextEditor(() => {
    identifyActiveFile();
  });
  const verification = vscode.commands.registerCommand(
    "testing-dev-vsce.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from testing-dev-vsce!"
      );
    }
  );

  context.subscriptions.push(verification, identifyAct);
}

// This method is called when your extension is deactivated
export function deactivate() {}
