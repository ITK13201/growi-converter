import {Marked} from "marked";
import dedent from "ts-dedent";
import {Config} from "../../config/config";

export class MarkedUtil {
    constructor() {
    }

    build(content: string): string {
        const marked = new Marked()
        const docHTML = marked.parse(content)
        const html = dedent`
            <!DOCTYPE html>
            <html>
                <link rel="stylesheet" href="${Config.Marked.CSSPath}">
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