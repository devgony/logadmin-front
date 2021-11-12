/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MonitorSessionsInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: monitorSessions
// ====================================================

export interface monitorSessions_monitorSessions_monitorSessionsRows {
  __typename: "MonitorSessionsRow";
  ELAPSED_TIME: string;
  SID: string;
  SERIAL: string;
  USERNAME: string;
  MACHINE: string;
  EVENT: string;
  SQL_TEXT: string | null;
  PREV_SQL_TEXT: string | null;
  BLOCKING_SESSION: string | null;
  PROGRAM: string;
  MODULE: string;
  ACTION: string | null;
  LOGON_TIME: string;
  PREV_EXEC_START: string | null;
  SPID: string;
}

export interface monitorSessions_monitorSessions {
  __typename: "MonitorSessionsOutput";
  monitorSessionsRows: monitorSessions_monitorSessions_monitorSessionsRows[];
}

export interface monitorSessions {
  monitorSessions: monitorSessions_monitorSessions;
}

export interface monitorSessionsVariables {
  input: MonitorSessionsInput;
}
