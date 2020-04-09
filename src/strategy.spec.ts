import { expect } from 'chai';

import { Strategy } from './strategy';

describe('Strategy', function () {
  describe('constructed', function () {
    var strategy = new Strategy(
      {
        authorizationURL: 'https://test.com/auth',
        tokenURL: 'https://test.com/token',
        userProfileURL: 'https://test.com/userinfo',
        clientID: '123-456-789',
        clientSecret: 'shhh-its-a-secret',
        callbackURL: 'https://test.com/callback',
      },
      function () {},
    );

    it('should be named openid-oauth20', function () {
      expect(strategy.name).to.equal('openid-oauth20');
    });
  });
  describe('errors', function () {
    it('should fail if missing all options', function () {
      expect(function () {
        new Strategy({}, function () {});
      }).to.throw(Error);
    });

    it('should fail if missing some options', function () {
      expect(function () {
        new Strategy(
          {
            // authorizationURL: 'https://test.com/auth',
            tokenURL: 'https://test.com/token',
            userProfileURL: 'https://test.com/userinfo',
            clientID: '123-456-789',
            clientSecret: 'shhh-its-a-secret',
            callbackURL: 'https://test.com/callback',
          },
          function () {},
        );
      }).to.throw(Error);
    });
  });
  describe('authorizationParams', function () {
    beforeEach(function () {
      this.strategy = new Strategy(
        {
          authorizationURL: 'https://test.com/auth',
          tokenURL: 'https://test.com/token',
          userProfileURL: 'https://test.com/userinfo',
          clientID: '123-456-789',
          clientSecret: 'shhh-its-a-secret',
          callbackURL: 'https://test.com/callback',
        },
        function () {},
      );
    });
    it('should map the prompt field', function () {
      var extraParams = this.strategy.authorizationParams({ prompt: 'foo' });
      expect(extraParams.prompt).to.eql('foo');
    });

    it('should map the accessType field', function () {
      var extraParams = this.strategy.authorizationParams({
        accessType: 'foo',
      });
      expect(extraParams.access_type).to.eql('foo');
    });

    it('should map the includeGrantedScopes field', function () {
      var extraParams = this.strategy.authorizationParams({
        includeGrantedScopes: true,
      });
      expect(extraParams.include_granted_scopes).to.be.true;
    });
  });
});
