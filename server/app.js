require('./db/config');
const cookieParser = require('cookie-parser');

const express = require('express'),
  path = require('path'),
  openRoutes = require('./routes/open'),
  userRouter = require('./routes/secure/users'),
  passport = require('./middleware/authentication/index'),
  fileUpload = require('express-fileupload');
const app = express();

app.use(express.json());

app.use('/api', openRoutes);
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/images'
  })
);

app.use('/api/*', passport.authenticate('jwt', { session: false }));
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
