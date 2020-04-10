// Load modules.
import { Strategy as OAuth2Strategy, VerifyFunction } from "passport-oauth2";
import { parse } from "./profile/openid";
/**
 * `Strategy` constructor.
 *
 * The OpenID Oauth authentication strategy authenticates requests by delegating to
 * the given provider using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Oauth application's client id
 *   - `clientSecret`  your Oauth application's client secret
 *   - `callbackURL`   URL to which the Oauth provider will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use('google', new OpenIdOAuth2Strategy({
 *         authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
 *         tokenURL: 'https://www.googleapis.com/oauth2/v4/token',
 *         userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret',
 *         callbackURL: 'https://www.example.net/auth/google/callback',
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
export class Strategy extends OAuth2Strategy {
  name: string;
  private userProfileURL: string;
  constructor(options: any, verify: VerifyFunction) {
    super(options, verify);
    [
      "authorizationURL",
      "tokenURL",
      "userProfileURL",
      "clientID",
      "clientSecret",
      "callbackURL",
    ].forEach(function (k) {
      if (!options[k]) {
        throw new Error(
          `You must provide ${k} to use passport-openid-oauth20.`
        );
      }
    });
    this.name = "openid-oauth20";
    this.userProfileURL = options.userProfileURL;
  }

  /**
   * Retrieve user profile.
   *
   * This function constructs a normalized profile, with the following properties:
   *
   *   - `provider`, set to the Strategy Name.
   *   - `id`
   *   - `username`
   *   - `displayName`
   */
  userProfile(accessToken: string, done: Function) {
    this._oauth2.get(this.userProfileURL, accessToken, (err, body, res) => {
      var json;
      if (err) {
        return done(new Error("failed to fetch user profile"));
      }

      try {
        json = JSON.parse(body as string);
      } catch (e) {
        return done(new Error("Failed to parse user profile"));
      }

      let profile = parse(json);

      profile.provider = this.name;
      profile._raw = body;
      profile._json = json;

      done(null, profile);
    });
  }

  /**
   * Return extra parameters to be included in the authorization request.
   *
   */
  authorizationParams(options: any) {
    var params: any = {};

    if (options.accessType) {
      params["access_type"] = options.accessType;
    }
    if (options.prompt) {
      params["prompt"] = options.prompt;
    }
    if (options.loginHint) {
      params["login_hint"] = options.loginHint;
    }
    if (options.includeGrantedScopes) {
      params["include_granted_scopes"] = true;
    }

    return params;
  }
}
export default Strategy;
