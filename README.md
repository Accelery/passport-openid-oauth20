# passport-openid-oauth20

[Passport](http://passportjs.org/) strategy for authenticating with OpenID providers using the OAuth 2.0 API.

[![Build Status](https://travis-ci.com/kertof/passport-openid-oauth20.svg?branch=master)](https://travis-ci.com/kertof/passport-openid-oauth20)

[![npm](https://img.shields.io/npm/v/passport-openid-oauth20.svg)](https://www.npmjs.com/package/passport-openid-oauth20)

## Install

```bash
npm install passport-openid-oauth20
```

## Usage

### Configure Strategy

The strategy requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
OpenID profile. The `verify` callback must call `cb` providing a user to
complete authentication.

```javascript
var OpenIdOAuth2Strategy = require("passport-openid-oauth20").Strategy;

// Example using Google OpenID profile.
passport.use(
  "google",
  new OpenIdOAuth2Strategy(
    {
      authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenURL: "https://www.googleapis.com/oauth2/v4/token",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://www.example.net/auth/google/callback"
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

Use `passport.authenticate()`, specifying the strategy name, or `'openid-oauth20'`, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2019 Christophe Querton <[https://kertof.com/](https://kertof.com/)>
