export class ApplicationError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
