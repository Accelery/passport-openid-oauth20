"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Load modules.
var OAuth2Strategy = require("passport-oauth2");
var openid_1 = require("./profile/openid");
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
var Strategy = /** @class */ (function (_super) {
    __extends(Strategy, _super);
    function Strategy(options, verify) {
        var _this = _super.call(this, options, verify) || this;
        [
            "authorizationURL",
            "tokenURL",
            "userProfileURL",
            "clientID",
            "clientSecret",
            "callbackURL"
        ].forEach(function (k) {
            if (!options[k]) {
                throw new Error("You must provide " + k + " to use passport-openid-oauth20.");
            }
        });
        _this.name = "openid-oauth20";
        _this.userProfileURL = options.userProfileURL;
        return _this;
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
    Strategy.prototype.userProfile = function (accessToken, done) {
        var _this = this;
        this._oauth2.get(this.userProfileURL, accessToken, function (err, body, res) {
            var json;
            if (err) {
                return done(new Error("failed to fetch user profile"));
            }
            try {
                json = JSON.parse(body);
            }
            catch (e) {
                return done(new Error("Failed to parse user profile"));
            }
            var profile = openid_1.parse(json);
            profile.provider = _this.name;
            profile._raw = body;
            profile._json = json;
            done(null, profile);
        });
    };
    /**
     * Return extra parameters to be included in the authorization request.
     *
     */
    Strategy.prototype.authorizationParams = function (options) {
        var params = {};
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
    };
    return Strategy;
}(OAuth2Strategy));
exports.Strategy = Strategy;
