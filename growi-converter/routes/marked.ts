import express from "express"
import HttpStatus from "http-status-codes";
import {GrowiPageNotFoundError} from "../internal/growi/growi";
import {Response} from "../models/response"
import {MarkedController} from "../controllers/marked_controller";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(HttpStatus.OK).send('access /:page_id');
})

router.get('/:page_id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {page_id} = req.params;
    const controller = new MarkedController()

    try {
        const html = await controller.buildHTML(page_id)
        res.status(HttpStatus.OK).send(html)
        return
    } catch (e: unknown) {
        if (e instanceof GrowiPageNotFoundError) {
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
            res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(response))
            return
        }
    }
});

export default router;
