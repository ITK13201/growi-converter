import {Marp} from "@marp-team/marp-core";
import dedent from "ts-dedent";

export class MarpUtil {
    constructor() {
    }

    build(content: string): string {
        const marp = new Marp()
        const {html, css} = marp.render(content)
        const htmlFile = dedent`
            <!DOCTYPE html>
            <html><body>
              <style>${css}</style>
              ${html}
            </body></html>
        `
        return htmlFile
    }
}