import {ApplicationError} from "../errors/errors";
import axios from "axios";
import {Config} from "../../config/config";

export class GrowiPageNotFoundError extends ApplicationError {
}

export class GrowiAttachmentNotFoundError extends ApplicationError {
}


export class GrowiUtil {
    private accessToken: string

    constructor() {
        this.accessToken = encodeURIComponent(Config.Growi.APIToken)
    }

    async fetchPage(pageID: string): Promise<string> {
        const url = [
            Config.Growi.APIURL,
            Config.Growi.Endpoints.GetPage,
            `?access_token=${this.accessToken}`,
            `&pageId=${pageID}`,
            "&limit=1"
        ].join("")
        const res = await axios.get(url);
        const {data, status} = res;
        if (status === 200) {
            return String(data.revisions[0].body);
        } else {
            throw new GrowiPageNotFoundError(`growi page id ${pageID} not found`);
        }
    }

    async fetchAttachmentFileName(attachmentID: string): Promise<string> {
        const endpoint = [
            Config.Growi.APIURL,
            Config.Growi.Endpoints.GetAttachment,
            `/${attachmentID}`,
            `?access_token=${this.accessToken}`,
        ].join("")
        const res = await axios.get(endpoint);
        const {data, status} = res;
        if (status == 200 && data.attachment.fileName !== undefined) {
            return data.attachment.fileName;
        } else {
            throw new GrowiAttachmentNotFoundError(`growi attachment id ${attachmentID} not found`);
        }
    }
}
