import {GrowiUtil} from "../internal/growi/growi";
import {MarkedUtil} from "../internal/marked/marked";

export class MarkedController {
    constructor() {
    }

    async buildHTML(pageID: string): Promise<string> {
        const growiUtil = new GrowiUtil();
        const growiPageContent: string = await growiUtil.fetchPage(pageID)

        const markedUtil = new MarkedUtil()
        return markedUtil.build(growiPageContent)
    }
}