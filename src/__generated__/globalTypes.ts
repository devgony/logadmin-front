/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateLinkInput {
  name: string;
  host: string;
  port: number;
  serviceName: string;
  username: string;
  password: string;
}

export interface DeleteLinkInput {
  name: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface MonitorPerfInput {
  name: string;
}

export interface MonitorSessionsInput {
  name: string;
}

export interface TestLinkInput {
  name: string;
  host: string;
  port: number;
  serviceName: string;
  username: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
