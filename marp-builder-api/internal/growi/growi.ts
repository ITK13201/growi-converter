import {CustomError} from "../errors/errors";
import axios, {AxiosResponse} from "axios";

export class GrowiPageNotFoundError extends CustomError {
}


export class GrowiUtil {
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    fetchPage(getPageEndpoint: string, pageID: string): Promise<string> {
        const growiAPIGetPageEndpointWithParams = [
            getPageEndpoint,
            `?access_token=${this.accessToken}`,
            `&pageId=${pageID}`,
            "&limit=1"
        ].join("")
        return axios.get(growiAPIGetPageEndpointWithParams)
            .then((res: AxiosResponse) => {
                const {data, status} = res
                if (status === 200) {
                    return String(data.revisions[0].body)
                } else {
                    throw new GrowiPageNotFoundError(`growi page id ${pageID} not found`)
                }
            })
    }
}