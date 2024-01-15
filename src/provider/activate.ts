import * as vscode from "vscode";
import {
  generateCompletionItems,
  getAvailableRootDirectories,
} from "../util/completion";

export const activeProvider: vscode.CompletionItemProvider<vscode.CompletionItem> =
  {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const linePrefix = document
        .lineAt(position)
        .text.substring(0, position.character);

      if (linePrefix.endsWith("/")) {
        const rootDirectories = getAvailableRootDirectories();
        const completionItems = rootDirectories.map((rootDir) => {
          const completionItem = new vscode.CompletionItem(rootDir);
          completionItem.kind = vscode.CompletionItemKind.Folder;
          return completionItem;
        });

        return completionItems;
      } else {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const currentDir =
          workspaceFolders && workspaceFolders.length > 0
            ? workspaceFolders[0].uri.fsPath
            : "";
        return generateCompletionItems(currentDir);
      }
    },
  };
