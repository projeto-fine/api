const app = require('./config/express')();

const port = app.get('port');
require('./config/database');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
