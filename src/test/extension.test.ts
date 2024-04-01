const assert = require('assert');
const vscode = require('vscode');

suite("Extension Tests", function() {
    test("Sample test", async () => {
        const command = await vscode.commands.getCommands(true);
        const commandExists = command.includes('flutter_feature_scaffolder.scaffoldFeature');
        assert.equal(commandExists, true);
    });
});