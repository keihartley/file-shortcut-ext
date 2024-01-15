import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export const generateCompletionItems = (currentDir: string): vscode.CompletionItem[] => {
    let items: vscode.CompletionItem[] = [];

    if (fs.existsSync(currentDir)) {
        const files = fs.readdirSync(currentDir);

        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const completionItem = new vscode.CompletionItem(file + '/');
                completionItem.kind = vscode.CompletionItemKind.Folder;
                items.push(completionItem);
            }
        }
    }

    return items;
};

export const getAvailableRootDirectories = (): string[] => {
    const rootDirectories: string[] = [];
    if (process.platform === 'win32') {
        for (let driveLetter = 'A'.charCodeAt(0); driveLetter <= 'Z'.charCodeAt(0); driveLetter++) {
            const drive = String.fromCharCode(driveLetter) + ':\\';
            if (fs.existsSync(drive)) {
                rootDirectories.push(drive);
            }
        }
    } else {
        rootDirectories.push('/');
    }
    return rootDirectories;
};