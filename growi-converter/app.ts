import express from 'express';
import createError, {HttpError} from "http-errors";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import HttpStatus from 'http-status-codes';

import indexRouter from './routes/index';
import marpRouter from './routes/marp';
import attachmentRouter from "./routes/attachment";
import {Response} from "./models/response";

const app: express.Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/marp', marpRouter);
app.use('/attachment', attachmentRouter);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
});

// error handler
app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    const response: Response = {
        message: err.message,
        status: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        statusText: err.statusText || HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    }
    res.json(JSON.stringify(response));
});

export default app;
