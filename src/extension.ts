import * as vscode from 'vscode';
import { activeProvider } from './provider/activate';

export function activate(context: vscode.ExtensionContext) {
    let provider = vscode.languages.registerCompletionItemProvider('shellscript', activeProvider);

    context.subscriptions.push(provider);
}


export function deactivate() {}
