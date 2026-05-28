
import http2 from 'node:http2';
import {
    basename,
    resolve
} from 'path';

import {
    WritableStream
} from '#server/libs/WritableStream.mjs';
import {
    MAX_REQUEST_SIZE
} from '#server/config/envConfig.mjs';
import {
    getDiffTime,
    stringifyMsg,
    getStartTime
} from '#server/utils/serverUtils.mjs';

const filename = basename(resolve(import.meta.url));
import Logger from '#server/libs/Logger.mjs';
const logger = Logger(filename);

export default function Http2Wrapper(options, _payload) {

    return new Promise((resolve, reject) => {

        const requestStartTime = getStartTime();

        const port = options.port && options.port !== 443 ? `:${options.port}` : '';

        // path is full url with parameters
        const url = `https://${options.host}${port}`;
        logger.verbose(`Connect URL: ${url}`);

        const clientSession = http2.connect(url);

        clientSession.on('error', (err) => {
            return reject({
                err,
                msg: err.message || 'Unknown error occured'
            });
        });

        clientSession.on('connect', () => {
            const reqOptions = {
                ':path': options.path,
                ':method': options.method || 'GET'
            };
            if (options.headers) {
                reqOptions['headers'] = options.headers;
            }
            const req = clientSession.request(reqOptions);
            logger.verbose(`Connected with options: ${stringifyMsg(reqOptions)}`);

            let responseHeaders = {};
            req.on('response', (headers, _flags) => {
                responseHeaders = headers;
                logger.verbose(`Response Headers: ${stringifyMsg(responseHeaders)}`);
            });

            const results = new WritableStream({
                maxRequestSize: MAX_REQUEST_SIZE
            });

            req.setEncoding('utf8');
            req.pipe(results);

            req.on('end', () => {
                clientSession.close();
                return resolve({
                    data: results,
                    headers: responseHeaders,
                    requestCallTime: getDiffTime(requestStartTime)
                });
            });

            req.end();
        });
    });
}

const options = {
    host: 'qa4.sephora.com',
    path: '/product/perk-up-dry-shampoo-P393281',
    headers: {
        'request-id': '1235-0-' + Date.now()
    }
};

Http2Wrapper(options).then(results => {
    console.log('http2', results.requestCallTime);
    //console.log(results.headers);
}).catch(err => {
    console.error(err);
});


