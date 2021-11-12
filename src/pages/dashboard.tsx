import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { TITLE } from "../const";
import {
  monitorPerf,
  monitorPerfVariables,
  monitorPerf_monitorPerf,
} from "../__generated__/monitorPerf";
import {
  VictoryArea,
  VictoryChart,
  VictoryContainer,
  VictoryLine,
} from "victory";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  monitorSessions,
  monitorSessionsVariables,
} from "../__generated__/monitorSessions";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";

const MONITOR_PERF = gql`
  subscription monitorPerf($input: MonitorPerfInput!) {
    monitorPerf(input: $input) {
      currentTime
      LOGICAL_READS
      PHYSICAL_READS
      CPU
      ACTIVE_SESSIONS
      LOCK_SESSIONS
      EXECUTIONS
    }
  }
`;

const MONITOR_SESSIONS = gql`
  subscription monitorSessions($input: MonitorSessionsInput!) {
    monitorSessions(input: $input) {
      monitorSessionsRows {
        ELAPSED_TIME
        SID
        SERIAL
        USERNAME
        MACHINE
        EVENT
        SQL_TEXT
        PREV_SQL_TEXT
        BLOCKING_SESSION
        PROGRAM
        MODULE
        ACTION
        LOGON_TIME
        PREV_EXEC_START
        SPID
      }
    }
  }
`;

const dataT = [
  { x: new Date(2021, 5, 1), y: 8 },
  { x: new Date(2021, 5, 2), y: 10 },
  { x: new Date(2021, 5, 3), y: 7 },
  { x: new Date(2021, 5, 4), y: 4 },
  { x: new Date(2021, 5, 7), y: 6 },
  { x: new Date(2021, 5, 8), y: 3 },
  { x: new Date(2021, 5, 9), y: 7 },
  { x: new Date(2021, 5, 10), y: 9 },
  { x: new Date(2021, 5, 11), y: 6 },
];
type IChartData = {
  [key in keyof Omit<monitorPerf_monitorPerf, "__typename" | "currentTime">]: [
    { x: string; y: number }
  ];
};

export default function Dashboard() {
  const initData = Array(5).fill({ x: "00:00:00", y: 0 }) as [
    { x: string; y: number }
  ];
  const [chartData, setChartData] = useState<IChartData>({
    LOGICAL_READS: initData,
    PHYSICAL_READS: initData,
    CPU: initData,
    ACTIVE_SESSIONS: initData,
    LOCK_SESSIONS: initData,
    EXECUTIONS: initData,
  });

  const {
    state: { name },
  } = useLocation<{ name: string }>();
  const { data, error } = useSubscription<monitorPerf, monitorPerfVariables>(
    MONITOR_PERF,
    { variables: { input: { name } } }
  );
  const { data: sessionsData } = useSubscription<
    monitorSessions,
    monitorSessionsVariables
  >(MONITOR_SESSIONS, { variables: { input: { name } } });
  useEffect(() => {
    if (data) {
      const input = data.monitorPerf;
      setChartData(prev => {
        const newData = Object.entries(prev)
          .map(([k, v]) => {
            if (v.length >= 5) {
              v.shift();
            }
            v.push({
              x: input.currentTime,
              y: input[k as keyof IChartData],
            });
            return { k, v };
          })
          .reduce(
            (acc, { k, v }) => ({ ...acc, [k]: [...v] }),
            {}
          ) as IChartData;
        return newData;
      });
      // console.log(chartData, error);
    }
  }, [data]);

  const columns = [
    "ELAPSED_TIME",
    "SID",
    "SERIAL",
    "USERNAME",
    "MACHINE",
    "EVENT",
    "SQL_TEXT",
    "PREV_SQL_TEXT",
    "BLOCKING_SESSION",
    "PROGRAM",
    "MODULE",
    "ACTION",
    "LOGON_TIME",
    "PREV_EXEC_START",
    "SPID",
  ];
  // console.log(columns);
  // const columns = useMemo(
  //   () => labels.map(l => ({ Header: l, accessor: l })),
  //   []
  // );
  // console.log(sessionsData?.monitorSessions, error);
  const getMin = (data: { x: string; y: number }[]) => {
    return data.reduce((acc, cur) => (acc > cur.y ? cur.y : acc), 0);
  };

  const getMax = (data: { x: string; y: number }[]) => {
    const max =
      (data.reduce((acc, cur) => (acc < cur.y ? cur.y : acc), 0) + 1) * 1.5;
    return max < 10 ? 10 : max;
  };

  return (
    <div className="h-full">
      <Helmet>
        <title>{`Dashboard | ${TITLE}`}</title>
      </Helmet>
      <div className="bg-gray-500 grid grid-cols-3 gap-0.5 text-xs">
        {Object.entries(chartData).map(([k, v]) => (
          <div key={k} className="bg-red-50 flex flex-col items-center">
            <h2>{k}</h2>
            <VictoryChart
              domain={{ y: [getMin(v), getMax(v)] }}
              height={window.outerWidth > 1024 ? 200 : 320}
              containerComponent={<VictoryContainer title="testdsfdf" />}
            >
              <VictoryArea
                data={v}
                style={{ data: { fill: "lightblue", stroke: "teal" } }}
              />
            </VictoryChart>
          </div>
        ))}
      </div>
      <div className="h-3/6 bg-gray-400">
        {sessionsData?.monitorSessions?.monitorSessionsRows && (
          <HotTable
            data={sessionsData?.monitorSessions?.monitorSessionsRows}
            colHeaders={columns}
            columns={columns.map(c => ({ data: c }))}
            // width="600"
            height="100%"
            settings={{
              width: "100%",
              colWidths: 110,
              manualColumnResize: true,
              preventOverflow: "horizontal",
              licenseKey: "non-commercial-and-evaluation",
              className: "htCenter htMiddle bg-gray-50",
              wordWrap: false,
              columnSorting: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
