/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MonitorPerfInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: monitorPerf
// ====================================================

export interface monitorPerf_monitorPerf {
  __typename: "MonitorPerfOuput";
  currentTime: string;
  LOGICAL_READS: number;
  PHYSICAL_READS: number;
  CPU: number;
  ACTIVE_SESSIONS: number;
  LOCK_SESSIONS: number;
  EXECUTIONS: number;
}

export interface monitorPerf {
  monitorPerf: monitorPerf_monitorPerf;
}

export interface monitorPerfVariables {
  input: MonitorPerfInput;
}
