//! SPDX-FileCopyrightText: 2025 Milesime <213074881+milesime@users.noreply.github.com>
//!
//! SPDX-License-Identifier: GPL-2.0-only

import { spawn } from "node:child_process";
import vscode from "vscode";
import { contributes } from "../package.json";

interface YodReport {
  code: string;
  msg: string;
  startLine: number;
  startCol: number;
  endLine: number;
  endCol: number;
}

class Formatter {
  constructor(private diagnostics: vscode.DiagnosticCollection) {}

  async provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    _options: vscode.FormattingOptions,
    cancel: vscode.CancellationToken,
  ): Promise<vscode.TextEdit[] | undefined> {
    try {
      const executablePath =
        vscode.workspace
          .getConfiguration("yod")
          .get<string>("executablePath") ??
        contributes.configuration.properties["yod.executablePath"].default;

      const cwd =
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? process.cwd();

      const yodFmt = spawn(executablePath, ["fmt-debug"], { cwd });

      cancel.onCancellationRequested(() => yodFmt.kill());

      let stderr = "";
      let stdout = "";

      yodFmt.stderr.on("data", (chunk) => {
        stderr += chunk;
      });

      yodFmt.stdout.on("data", (chunk) => {
        stdout += chunk;
      });

      yodFmt.stdin.write(document.getText());
      yodFmt.stdin.end();

      const code = await new Promise<number | null>((resolve, reject) => {
        yodFmt.on("error", (error) => {
          if (error.message.includes("ENOENT")) {
            reject(
              new Error(
                `Yod executable not found. Please ensure that “${executablePath}” is correct and points to a valid Yod executable. You can set the path in VS Code settings under “yod.executablePath” or make sure it’s in your system’s PATH.`,
              ),
            );
          } else {
            reject(error);
          }
        });
        yodFmt.on("close", resolve);
      });

      if (cancel.isCancellationRequested) {
        return;
      }

      this.diagnostics.delete(document.uri);

      const yodReports: YodReport[] = JSON.parse(stderr);

      if (yodReports.length > 0) {
        const diagnostics: vscode.Diagnostic[] = yodReports.map((report) => {
          const message = `${report.code}: ${report.msg}`;

          return new vscode.Diagnostic(
            new vscode.Range(
              report.startLine,
              report.startCol,
              report.endLine,
              report.endCol,
            ),
            message,
            report.code.startsWith("E")
              ? vscode.DiagnosticSeverity.Error
              : vscode.DiagnosticSeverity.Warning,
          );
        });

        this.diagnostics.set(document.uri, diagnostics);

        vscode.window.showErrorMessage(
          diagnostics[0]?.message || "Empty report message.",
        );
      }

      if (code === 0) {
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(document.getText().length),
        );
        return [vscode.TextEdit.replace(fullRange, stdout)];
      }
    } catch (err) {
      if (err instanceof Error) {
        vscode.window.showErrorMessage(`Formatting failed: ${err.message}`);
      } else {
        vscode.window.showErrorMessage(
          "An unexpected error occurred during formatting.",
        );
      }
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  try {
    const diagnostics = vscode.languages.createDiagnosticCollection("yod");
    const formatter = new Formatter(diagnostics);
    const selector = { language: "yod" };

    context.subscriptions.push(
      diagnostics,
      vscode.languages.registerDocumentFormattingEditProvider(
        selector,
        formatter,
      ),
    );
  } catch (err) {
    if (err instanceof Error) {
      vscode.window.showErrorMessage(
        `Yod extension activation failed: ${err.message}`,
      );
    } else {
      vscode.window.showErrorMessage(
        "An unexpected error occurred during Yod extension activation.",
      );
    }
  }
}
