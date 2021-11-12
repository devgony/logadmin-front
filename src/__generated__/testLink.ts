/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TestLinkInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: testLink
// ====================================================

export interface testLink_testLink {
  __typename: "TestLinkOuput";
  ok: boolean;
  error: string | null;
}

export interface testLink {
  testLink: testLink_testLink;
}

export interface testLinkVariables {
  input: TestLinkInput;
}
