// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htmltomatestack" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('htmltomatestack.convertToMatestack', function () {
		// The code you place here will be executed every time your command is executed

		
	  const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const selected_text = editor.document.getText(editor.selection);
			
			const convertScript = context.asAbsolutePath(
				path.join('convert')
			);
			console.log(convertScript);

	
	
			const cp = require('child_process')
			let output = cp.execSync(convertScript, {encoding: "utf8", stdio: ['pipe', 'pipe', 'ignore'], input: selected_text}).toString();
			console.log('output: ' + output.trim());
			editor.edit(editBuilder => {
				editBuilder.replace(selection, output);
			});
			
		}

		// Display a message box to the user
		// vscode.window.showInformationMessage('HtmlToMatestack converted your selection! Yay.' + result);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
