# passport-openid-oauth2

[Passport](http://passportjs.org/) strategy for authenticating with OpenID providers using the OAuth 2.0 API.

[![npm](https://img.shields.io/npm/v/passport-openid-oauth2.svg)](https://www.npmjs.com/package/passport-openid-oauth2)

## Install

```bash
npm install passport-openid-oauth2
```

## Usage

### Configure Strategy

The strategy requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
OpenID profile. The `verify` callback must call `cb` providing a user to
complete authentication.

```javascript
var OpenIdOAuth2Strategy = require('passport-openid-oauth2').Strategy;

// Example using Google OpenID profile.
passport.use('google',
  new OpenIdOAuth2Strategy(
    {
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenURL: 'https://www.googleapis.com/oauth2/v4/token',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET',
      callbackURL: 'https://www.example.net/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { providerId: profile.id, provider: profile.provider },
        function(err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
```

### Authenticate Requests

Use `passport.authenticate()`, specifying the strategy name, or `'openid-oauth2'`, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
