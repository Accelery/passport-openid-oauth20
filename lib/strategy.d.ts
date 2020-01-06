import * as OAuth2Strategy from "passport-oauth2";
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
export declare class Strategy extends OAuth2Strategy {
    name: string;
    private userProfileURL;
    constructor(options: any, verify: OAuth2Strategy.VerifyFunction);
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
    userProfile(accessToken: string, done: Function): void;
    /**
     * Return extra parameters to be included in the authorization request.
     *
     */
    authorizationParams(options: any): any;
}
