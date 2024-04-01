import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('flutter_feature_scaffolder.scaffoldFeature', async () => {
        const featureName = await vscode.window.showInputBox({ prompt: "Enter Feature Name" });
        if (!featureName) {
            vscode.window.showErrorMessage("Feature name is required!");
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("Open a project first!");
            return;
        }

        const projectRoot = workspaceFolders[0].uri;
        const featureRoot = vscode.Uri.joinPath(projectRoot, `lib/features/${featureName}`);
        
        // Define the structure
        const structure = {
            data: ['data_sources', 'models', 'repositories_impl'],
            domain: ['entities', 'repositories', 'use_cases'],
            presentation: ['bloc', 'screens', 'widgets']
        };

        // Loop through the structure to create directories
        for (const [layer, components] of Object.entries(structure)) {
            for (const component of components) {
                const componentPath = vscode.Uri.joinPath(featureRoot, layer, component);
                await vscode.workspace.fs.createDirectory(componentPath);

                // Create an index.dart file in each component directory
                const indexFilePath = vscode.Uri.joinPath(componentPath, `index.dart`);
                const fileContent = `// Export files for the ${component} component of the ${featureName} feature\n`;
                await vscode.workspace.fs.writeFile(indexFilePath, Buffer.from(fileContent));
            }
        }

        vscode.window.showInformationMessage(`${featureName} feature scaffolded successfully!`);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
