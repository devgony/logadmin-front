/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteLinkInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteLink
// ====================================================

export interface deleteLink_deleteLink {
  __typename: "DeleteLinkOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteLink {
  deleteLink: deleteLink_deleteLink;
}

export interface deleteLinkVariables {
  input: DeleteLinkInput;
}
