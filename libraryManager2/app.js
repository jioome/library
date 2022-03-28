const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { Server } = require("socket.io");
const { createServer } = require("http");
const jwt = require('jsonwebtoken');


const { db , initialize} = require('./lib/db');
const routerModule = require('./router');


const decodeToken = async (tokenStr) => {   
  const token = tokenStr.replace('Bearer ', '');
  const decodedData = await jwt.verify(token, 'testerrffer');
  return decodedData
}

const serverInit = async () => {
  await initialize();

  const app = new Koa();
  app
    .use(bodyParser())
    .use(async (ctx, next) => {  
      try{
          await next();
      } catch(err) {
        // if(err.level <= 40) { console.log()}
          console.log(err);
          ctx.body = err.message;
      }
    })
    .use(async (ctx, next) => {
      if(ctx.request.header.authorization) {
        ctx.user = await decodeToken(ctx.request.header.authorization)
      }

      await next();
    })
    .use(routerModule.allowedMethods())
    .use(routerModule.routes());
  
  const httpServer = createServer(app.callback());
  const io = new Server(httpServer, { /* options */ });

  const userMap = {}
  io.use(async (socket, next) => {
    socket.user = await decodeToken(socket.handshake.headers.authorization)
    next();
  });

  io.on('connection', async socket => {
    userMap[socket.user.email] = socket.id;
    const allSocket = await io.fetchSockets();
  
    socket.on('send', (data) => {
      const sendTarget = userMap[data.targetEmail];
      if(sendTarget) {
        io.sockets.sockets.get(sendTarget).emit('receive', { message: data.message});
      }
      
    })
  });

  httpServer.listen(3000, () => {
    console.log('server open');
  });
}

serverInit();

