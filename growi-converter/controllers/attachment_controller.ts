import {Config} from "../config/config";
import {GrowiUtil} from "../internal/growi/growi";
import fs from "fs";

export class AttachmentController {
    constructor() {
    }

    async loadAttachment(attachmentID: string): Promise<Buffer> {
        const growiUtil = new GrowiUtil();
        const attachmentFileName: string = await growiUtil.fetchAttachmentFileName(attachmentID)
        return fs.readFileSync(`${Config.Growi.AttachmentDir}/${attachmentFileName}`)
    }
}
