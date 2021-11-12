/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLinkInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createLink
// ====================================================

export interface createLink_createLink {
  __typename: "CreateLinkOutput";
  ok: boolean;
  error: string | null;
}

export interface createLink {
  createLink: createLink_createLink;
}

export interface createLinkVariables {
  input: CreateLinkInput;
}
