import {Config} from "../config/config";
import {GrowiUtil} from "../internal/growi/growi";
import {MarpUtil} from "../internal/marp/marp";
import fs from "fs";

export class GrowiController {
    private growiAPIToken: string
    private growiAPIURL: string
    private growiAPIGetPageEndpoint: string
    private growiAPIGetAttachmentEndpoint: string
    private growiAttachmentDir: string

    constructor() {
        this.growiAPIToken = Config.GrowiAPIToken
        this.growiAPIURL = Config.GrowiAPIURL
        this.growiAPIGetPageEndpoint = `${this.growiAPIURL}/_api/v3/revisions/list`
        this.growiAPIGetAttachmentEndpoint = `${this.growiAPIURL}/_api/v3/attachment`
        this.growiAttachmentDir = Config.GrowiAttachmentDir
    }

    async buildPDF(growiPageID: string): Promise<string> {
        const growiUtil = new GrowiUtil(this.growiAPIToken);
        const growiPageContent: string = await growiUtil.fetchPage(this.growiAPIGetPageEndpoint, growiPageID)

        const marpUtil = new MarpUtil()
        return marpUtil.build(growiPageContent)
    }

    async getAttachment(attachmentID: string): Promise<Buffer> {
        const growiUtil = new GrowiUtil(this.growiAPIToken);
        const growiAttachmentFileName: string = await growiUtil.fetchAttachmentFileName(this.growiAPIGetAttachmentEndpoint, attachmentID)
        return fs.readFileSync(`${this.growiAttachmentDir}/${growiAttachmentFileName}`)
    }
}