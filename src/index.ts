import cluster from 'cluster';
import os from 'os';
import app from './app';
import db from './config/db';

(async () => {
  const numCPUs = process.env.NODE_ENV === 'production' ? os.cpus().length : 1;
  await db.connect();
  console.log('Connected to DB');
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers..
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const normalizePort = (val: any) => {
      const port = parseInt(val, 10);

      if (Number.isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    };

    const port = normalizePort(process.env.PORT || '4000');

    const onError = (error: any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    };

    app.on('error', onError);
    const onListening = () => {
      const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
      console.log(`Listening on ${bind}`);
      console.log('Connected!');
    };

    app.listen(port, onListening);
    console.log(`Worker ${process.pid} started`);
  }
})();
