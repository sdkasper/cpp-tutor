import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import { markedHighlight } from 'marked-highlight';

hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', cpp);

const marked = new Marked(
	markedHighlight({
		highlight(code, lang) {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(code, { language: lang }).value;
			}
			return hljs.highlight(code, { language: 'cpp' }).value;
		}
	})
);

marked.setOptions({ breaks: true, gfm: true });

export function renderMarkdown(content: string): string {
	return marked.parse(content) as string;
}
