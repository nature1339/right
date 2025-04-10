import clsx from "clsx";
import { useState } from "react";
import {
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceDot,
  XAxis,
} from "recharts";

export default function CopyTradingRoiChart({ data }) {
  const [isVisibleDotReference, setIsVisibleDotReference] = useState(false);

  const minMaxData = data.reduce(
    (acc, curr) => {
      if (curr.profit > acc.max.profit) acc.max = curr;
      if (curr.profit < acc.min.profit) acc.min = curr;
      return acc;
    },
    { max: data[0], min: data[0] }
  );

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.profit));
    const dataMin = Math.min(...data.map((i) => i.profit));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <ResponsiveContainer
      className="!w-[calc(100%+24px)] -ml-[12px]"
      height={100}
    >
      <AreaChart
        data={data}
        onMouseEnter={() => setIsVisibleDotReference(true)}
        onMouseLeave={() => setIsVisibleDotReference(false)}
        margin={{
          top: 20,
          bottom: 10,
          left: 12,
          right: 12,
        }}
      >
        <XAxis dataKey="createAt" hide />
        <ReferenceDot
          y={minMaxData.min.profit}
          x={minMaxData.min.createAt}
          r={3}
          fill={minMaxData.min.profit > 0 ? "red" : "blue"}
          stroke="none"
          className={clsx(isVisibleDotReference ? "block" : "hidden")}
          label={{
            value: `${minMaxData.min.profit}%`,
            fontSize: 11,
            position: minMaxData.min.profit > 0 ? "top" : "bottom",
            fill: minMaxData.min.profit > 0 ? "red" : "blue",
          }}
        />
        <ReferenceDot
          y={minMaxData.max.profit}
          x={minMaxData.max.createAt}
          r={3}
          fill={minMaxData.max.profit > 0 ? "red" : "blue"}
          stroke="none"
          className={clsx(isVisibleDotReference ? "block" : "hidden")}
          label={{
            value: `${minMaxData.max.profit}%`,
            fontSize: 11,
            position: minMaxData.max.profit > 0 ? "top" : "bottom",
            fill: minMaxData.max.profit > 0 ? "red" : "blue",
          }}
        />
        <ReferenceLine y={0} stroke="#e3e3e3" strokeWidth={1} />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#f44a57" stopOpacity={1} />
            <stop
              offset={off}
              stopColor="#4f7ded"
              stroke="#4f7ded"
              stopOpacity={1}
            />
          </linearGradient>
          <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="red" />
            <stop offset={off} stopColor="#4169e1" />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="profit"
          stroke="url(#strokeColor)"
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
