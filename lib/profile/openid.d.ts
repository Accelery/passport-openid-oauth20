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
declare let parse: (json: any) => any;
export { parse };
