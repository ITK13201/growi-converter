type config = {
    GrowiAPIToken: string
    GrowiAPIURL: string
    GrowiAttachmentDir: string
}


export const Config: config = {
    GrowiAPIToken: encodeURIComponent(String(process.env.GROWI_API_TOKEN)),
    GrowiAPIURL: String(process.env.GROWI_API_URL),
    GrowiAttachmentDir: process.env.GROWI_ATTACHMENT_DIR || "/attachment",
}
