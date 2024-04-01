import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  setup(async () => {
    // Ensuring the extension is activated before each test
    const extensionId = 'KasasiraJoshua.flutter-feature-scafolder';
    const extension = vscode.extensions.getExtension(extensionId);
    if (!extension?.isActive) {
      await extension?.activate();
    }
  });

  test('Command is in the VSCode command list', async () => {
    // Fetch all commands available in the command palette
    const allCommands = await vscode.commands.getCommands(true);

    // Assert that our command is in the list
    const hasCommand = allCommands.includes('flutter-feature-scafolder.scaffoldFeature');
    assert.strictEqual(hasCommand, true, 'Command should exist in VSCode command list.');
  });
});
