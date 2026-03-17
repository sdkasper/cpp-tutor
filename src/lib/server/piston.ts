import { env } from '$env/dynamic/private';

const WANDBOX_URL = env.CODE_EXEC_API_URL || 'https://wandbox.org/api/compile.json';

export interface ExecutionResult {
	stdout: string;
	stderr: string;
	compile_output: string;
	status: 'success' | 'compile_error' | 'runtime_error' | 'timeout' | 'error';
	exit_code: number;
}

/**
 * Transform Romanian file I/O code to use stdin/stdout for Piston execution.
 * Detects ifstream fin("X.in") / ofstream fout("X.out") patterns and rewires them to cin/cout.
 */
export function transformFileIO(code: string): { code: string; transformed: boolean } {
	// Match ifstream fin("something.in") with optional whitespace variations
	const hasIfstream = /ifstream\s+fin\s*\(\s*"[^"]+\.in"\s*\)/.test(code);
	const hasOfstream = /ofstream\s+fout\s*\(\s*"[^"]+\.out"\s*\)/.test(code);

	if (!hasIfstream && !hasOfstream) {
		return { code, transformed: false };
	}

	let transformed = code;

	// Ensure <iostream> is included (some files only have <fstream>)
	if (!/#include\s*<iostream>/.test(transformed)) {
		transformed = transformed.replace(
			/(#include\s*<fstream>)/,
			'$1\n#include <iostream>'
		);
	}

	// Replace ifstream fin("X.in") with a reference to cin
	transformed = transformed.replace(
		/ifstream\s+fin\s*\(\s*"[^"]+\.in"\s*\)\s*;?/,
		'auto& fin = std::cin;'
	);

	// Replace ofstream fout("X.out") with a reference to cout
	transformed = transformed.replace(
		/ofstream\s+fout\s*\(\s*"[^"]+\.out"\s*\)\s*;?/,
		'auto& fout = std::cout;'
	);

	return { code: transformed, transformed: true };
}

export async function executeCode(sourceCode: string, stdin: string = ''): Promise<ExecutionResult> {
	try {
		const res = await fetch(WANDBOX_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				compiler: 'gcc-12.3.0',
				code: sourceCode,
				stdin,
				options: 'warning,c++17',
				'compiler-option-raw': '-O2'
			})
		});

		if (!res.ok) {
			const text = await res.text();
			return {
				stdout: '',
				stderr: '',
				compile_output: `Execution service error (${res.status}): ${text}`,
				status: 'error',
				exit_code: -1
			};
		}

		const data = await res.json();

		const exitCode = parseInt(data.status ?? '0', 10);
		const compilerError = data.compiler_error || '';
		const compilerMessage = data.compiler_message || '';
		const programOutput = data.program_output || '';
		const programError = data.program_error || '';

		// Compilation failed: compiler_error present and no program output
		if (compilerError && !programOutput) {
			return {
				stdout: '',
				stderr: '',
				compile_output: compilerError,
				status: 'compile_error',
				exit_code: exitCode || 1
			};
		}

		// Runtime error (non-zero exit)
		if (exitCode !== 0) {
			return {
				stdout: programOutput,
				stderr: programError,
				compile_output: compilerMessage,
				status: 'runtime_error',
				exit_code: exitCode
			};
		}

		return {
			stdout: programOutput,
			stderr: programError,
			compile_output: compilerMessage,
			status: 'success',
			exit_code: 0
		};
	} catch (err) {
		return {
			stdout: '',
			stderr: '',
			compile_output: `Failed to connect to execution service: ${err instanceof Error ? err.message : String(err)}`,
			status: 'error',
			exit_code: -1
		};
	}
}
