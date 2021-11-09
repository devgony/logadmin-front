import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
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
  const [chartData, setChartData] = useState<IChartData>({
    LOGICAL_READS: [{ x: "", y: 0 }],
    PHYSICAL_READS: [{ x: "", y: 0 }],
    CPU: [{ x: "", y: 0 }],
    ACTIVE_SESSIONS: [{ x: "", y: 0 }],
    LOCK_SESSIONS: [{ x: "", y: 0 }],
    EXECUTIONS: [{ x: "", y: 0 }],
  });

  const {
    state: { name },
  } = useLocation<{ name: string }>();
  const { data } = useSubscription<monitorPerf, monitorPerfVariables>(
    MONITOR_PERF,
    { variables: { input: { name } } }
  );
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
      console.log(chartData);
    }
  }, [data]);
  return (
    <div className="h-full">
      <Helmet>
        <title>{`Dashboard | ${TITLE}`}</title>
      </Helmet>
      <h1>{name}</h1>
      <div className="h-3/6 bg-gray-500 grid grid-cols-3 gap-0.5 text-xs">
        {Object.entries(chartData).map(([k, v]) => (
          <div className="bg-red-200 flex flex-col items-center">
            <h2>{k}</h2>
            <VictoryChart
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
      <div className="h-3/6 bg-gray-500">ActiveSession</div>
    </div>
  );
}

const MyChart = ({ payload }: any) => {
  return (
    <LineChart width={500} height={200} data={payload}>
      <XAxis dataKey="x"></XAxis>
      <YAxis />
      <Line dataKey="y" />
    </LineChart>
  );
};
