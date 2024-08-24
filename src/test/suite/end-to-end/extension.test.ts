import * as assert from "assert";
import * as vscode from "vscode";
// import * as Extension from '../../extension';

suite("End-to-End Test", () => {
  test("extension should be activated", async () => {
    const extension: vscode.Extension<any> | undefined =
      vscode.extensions.getExtension("jgfranco.testing-dev-vsce");
    if (!extension) {
      assert.fail("Extension not found!");
    }
    await extension.activate();
    assert.ok(extension.isActive);
  });
});
