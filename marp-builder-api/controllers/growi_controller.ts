import {Config} from "../config/config";
import {GrowiUtil} from "../internal/growi/growi";
import {MarpUtil} from "../internal/marp/marp";

export class GrowiController {
    private growiAPIToken: string
    private growiAPIURL: string
    private growiAPIGetPageEndpoint: string

    constructor() {
        this.growiAPIToken = Config.GrowiAPIToken
        this.growiAPIURL = Config.GrowiAPIURL
        this.growiAPIGetPageEndpoint = `${this.growiAPIURL}/_api/v3/revisions/list`
    }

    async buildPDF(growiPageID: string): Promise<string> {
        const growiUtil = new GrowiUtil(this.growiAPIToken);
        const growiPageContent: string = await growiUtil.fetchPage(this.growiAPIGetPageEndpoint, growiPageID)

        const marpUtil = new MarpUtil()
        return marpUtil.build(growiPageContent)
    }
}