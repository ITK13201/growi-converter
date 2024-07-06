import {Marked} from "marked";
import markedKatex from "marked-katex-extension";

export class MarkedUtil {
    constructor() {
    }

    build(content: string): string {
        const options = {
            throwOnError: false
        };
        const markedExtensions = [
            markedKatex(options)
        ]

        const marked = new Marked(...markedExtensions);
        const docHTML = marked.parse(content)
        const html = `
<!DOCTYPE html>
<html>
<head>
    <!-- === -->
    <!-- KaTeX -->
    <!-- === -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossorigin="anonymous">
    <!-- The loading of KaTeX is deferred to speed up page rendering -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" integrity="sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg" crossorigin="anonymous"></script>
    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous"
            onload="renderMathInElement(document.body);"></script>

    <!-- === -->
    <!-- GitHub Markdown CSS -->
    <!-- === -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.6.1/github-markdown-light.min.css">
</head>
<body>
    <div class="markdown-body">
        ${docHTML}
    </div>
</body>
</html>
        `
        return html
    }
}