import {ApplicationError} from "../internal/errors/errors";

export class ConfigUndefinedError extends ApplicationError {
}

const loadEnv = (key: string): string => {
    const value = process.env[key];
    if (value === undefined) {
        throw new ConfigUndefinedError(key)
    } else {
        return value;
    }
}

type growiEndpointsConfig = {
    GetPage: string
    GetAttachment: string
}

type growiConfig = {
    APIToken: string
    APIURL: string
    AttachmentDir: string
    Endpoints: growiEndpointsConfig
}


type config = {
    Port: string
    Growi: growiConfig
}

export const Config: config = {
    Port: loadEnv("PORT"),
    Growi: {
        APIToken: loadEnv("GROWI_API_TOKEN"),
        APIURL: loadEnv("GROWI_API_URL"),
        AttachmentDir: loadEnv("GROWI_ATTACHMENT_DIR"),
        Endpoints: {
            GetPage: "/_api/v3/revisions/list",
            GetAttachment: "/_api/v3/attachment"
        }
    },
}
