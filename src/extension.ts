import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('flutter_feature_scafolder.scaffoldFeature', async () => {
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

        // Define the structure with additional files
        const structure = {
            data: ['data_sources', 'models', 'repositories'],
            domain: ['entities', 'repositories', 'use_cases'],
            presentation: ['bloc', 'screens', 'widgets']
        };

        // Create structure and files
        await createStructureAndFiles(featureRoot, structure, featureName);

        vscode.window.showInformationMessage(`${featureName} feature scaffolded successfully!`);
    });

    context.subscriptions.push(disposable);
}

async function createStructureAndFiles(baseUri: vscode.Uri, structure: any, featureName: string, basePath: string = '') {
    for (const layer of Object.keys(structure)) {
        const layerPath = vscode.Uri.joinPath(baseUri, basePath, layer);
        await vscode.workspace.fs.createDirectory(layerPath);

        // Create index.dart in each main layer
        const indexPath = vscode.Uri.joinPath(layerPath, 'index.dart');
        await vscode.workspace.fs.writeFile(indexPath, Buffer.from(`// Export files for the ${layer}\n`));

        for (const component of structure[layer]) {
            const componentPath = vscode.Uri.joinPath(layerPath, component);
            await vscode.workspace.fs.createDirectory(componentPath);
						
						let indexFileContent = `// Export files for the ${component} of ${featureName}\n`;

            // Specific files for data layer
            if (layer === 'data' && component === 'data_sources') {
                const remoteDataSourcePath = vscode.Uri.joinPath(componentPath, 'remote_data_source.dart');
                await vscode.workspace.fs.writeFile(remoteDataSourcePath, Buffer.from(`// Remote data operations for ${featureName}\n`));
                const localDataSourcePath = vscode.Uri.joinPath(componentPath, 'local_data_source.dart');
                await vscode.workspace.fs.writeFile(localDataSourcePath, Buffer.from(`// Local data operations for ${featureName}\n`));

								indexFileContent += `export 'remote_data_source.dart';\nexport 'local_data_source.dart';\n`;
            }

            if (layer === 'presentation' && component === 'screens') {
                const repositoryImplPath = vscode.Uri.joinPath(componentPath, `${featureName}_screen.dart`);
                await vscode.workspace.fs.writeFile(repositoryImplPath, Buffer.from(`// Main screen for ${featureName} feature\n`));
                
								indexFileContent += `export '${featureName}_screen.dart';\n`;
            }

            if (layer === 'data' && component === 'repositories') {
                const repositoryImplPath = vscode.Uri.joinPath(componentPath, `${featureName}_repository_impl.dart`);
                await vscode.workspace.fs.writeFile(repositoryImplPath, Buffer.from(`// Repository implementation for ${featureName}\n`));
                
								// Also create the repository in the domain layer
                const domainRepositoryPath = vscode.Uri.joinPath(baseUri, basePath, 'domain/repositories', `${featureName}_repository.dart`);
                await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(baseUri, basePath, 'domain/repositories'));
                await vscode.workspace.fs.writeFile(domainRepositoryPath, Buffer.from(`// Abstract repository definition for ${featureName}\n`));

								indexFileContent += `export '${featureName}_repository_impl.dart';\n`;
            }

            // Create index.dart in each subdirectory
            const indexFilePath = vscode.Uri.joinPath(componentPath, 'index.dart');
            await vscode.workspace.fs.writeFile(indexFilePath, Buffer.from(indexFileContent));
        }
    }
}

export function deactivate() {}
