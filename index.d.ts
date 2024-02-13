import { Strategy as OAuth2Strategy } from 'passport-oauth2';

import type { VerifyCallback } from 'passport-oauth2';
import type { Request } from 'express';

declare module PassportSlack {
  interface SlackStrategyOptions {
    callbackURL?: string;
    clientID: string;
    clientSecret: string;
    passReqToCallback?: boolean; // Optionally pass req to callback
    scope?: string | string[];
    skipUserProfile?: boolean; // This can be true, false, or a string with the team ID
    state?: string;
    team?: string;
    userScope?: string | string[]; // This option is used to request permissions beyond the identity scopes
  }

  interface SlackProfile {
    _json: unknown;
    _raw: string;
    displayName: string;
    emails?: { value: string }[];
    id: string;
    photos?: { value: string }[];
    provider: 'slack';
    username?: string; // Depending on the requested scopes, this might not be present
  }

  interface VerifyFunction {
    (
      accessToken: string,
      refreshToken: string,
      profile: SlackProfile,
      done: VerifyCallback,
    ): void;
  }

  interface VerifyFunctionWithRequest {
    (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: SlackProfile,
      done: VerifyCallback,
    ): void;
  }

  class Strategy extends OAuth2Strategy {
    constructor(options: SlackStrategyOptions, verify: VerifyFunction);

    authorizationParams(options: unknown): unknown;

    userProfile(
      accessToken: string,
      done: (err?: unknown, profile?: SlackProfile) => void,
    ): void;
  }
}

export = PassportSlack;
