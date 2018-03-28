const http = require('http');
const app = require('./app');

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Listening on http://localhost:${app.get('port')}`);
  console.log('Press CTRL-C to stop');
});
