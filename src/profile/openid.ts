/**
 * Parse profile.
 *
 * Parses user profiles as fetched from a OpenID Connect-compatible user
 * info endpoint.
 *
 * The amount of detail in the profile varies based on the scopes granted by the
 * user.  The following scope values add additional data:
 *
 *     `profile` - basic profile information
 *     `email` - email address
 *
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
let parse = function (json: any) {
  if ("string" == typeof json) {
    json = JSON.parse(json);
  }

  var profile: any = {};

  profile.id = json.sub;
  profile.displayName = json.name;
  if (json.family_name || json.given_name) {
    profile.name = {
      familyName: json.family_name,
      givenName: json.given_name,
    };
  }
  if (json.email) {
    profile.emails = [
      {
        value: json.email,
        verified: json.email_verified,
      },
    ];
  }
  if (json.picture) {
    profile.photos = [
      {
        value: json.picture,
      },
    ];
  }

  return profile;
};

export { parse };
