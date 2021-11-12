/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLinks
// ====================================================

export interface findLinks_findLinks_links {
  __typename: "Link";
  name: string;
  host: string;
  port: number;
  serviceName: string;
  username: string;
  password: string;
}

export interface findLinks_findLinks {
  __typename: "FindLinksOutput";
  links: findLinks_findLinks_links[];
}

export interface findLinks {
  findLinks: findLinks_findLinks;
}
