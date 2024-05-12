import express from "express"
import HttpStatus from "http-status-codes";
import {GrowiController} from "../controllers/growi_controller";
import {GrowiAttachmentNotFoundError} from "../internal/growi/growi";
import {Response} from "../models/response"

const router: express.Router = express.Router();

router.get('/:attachment_id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {attachment_id} = req.params;
    const growiController = new GrowiController();

    try {
        const buffer = await growiController.getAttachment(attachment_id)
        res.header("Content-Type", "application/octet-stream");
        res.status(HttpStatus.OK).send(buffer)
        return
    } catch (e: unknown) {
        if (e instanceof GrowiAttachmentNotFoundError) {
            const response: Response = {
                status: HttpStatus.BAD_REQUEST,
                statusText: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
                message: e.message
            }
            res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(response))
            return
        } else if (e instanceof Error) {
            console.log(e)
            const response: Response = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                statusText: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                message: e.message
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json
        }
    }
});

export default router;
