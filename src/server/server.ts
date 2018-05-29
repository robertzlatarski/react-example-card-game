import * as Express from 'express';
import * as path from 'path';
import serverRenderer from './server-renderer';

const port = 3001;
const server = Express();
const router = Express.Router();

router.get('/', serverRenderer);

router.use('/static', Express.static(path.join(__dirname, '../../static')));

server.use(router);

server.listen(port);
