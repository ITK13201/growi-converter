import {GrowiUtil} from "../internal/growi/growi";
import {MarpUtil} from "../internal/marp/marp";

export class MarpController {
    constructor() {
    }

    async buildHTML(pageID: string): Promise<string> {
        const growiUtil = new GrowiUtil();
        const growiPageContent: string = await growiUtil.fetchPage(pageID)

        const marpUtil = new MarpUtil()
        return marpUtil.build(growiPageContent)
    }
}