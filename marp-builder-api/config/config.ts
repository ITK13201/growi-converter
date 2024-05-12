type config = {
    GrowiAPIToken: string
    GrowiAPIURL: string
    MarpHTMLDir: string
    MarpPDFDir: string
}


export const Config: config = {
    GrowiAPIToken: encodeURIComponent(String(process.env.GROWI_API_TOKEN)),
    GrowiAPIURL: String(process.env.GROWI_API_URL),
    MarpHTMLDir: process.env.MARP_HTML_DIR || "/usr/local/etc/marp-builder-api/html",
    MarpPDFDir: process.env.MARP_PDF_DIR || "/usr/local/etc/marp-builder-api/pdf",
}
