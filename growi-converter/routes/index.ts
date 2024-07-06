import express from "express"
import HttpStatus from "http-status-codes";

const router: express.Router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(HttpStatus.OK).send('OK');
});

export default router;
