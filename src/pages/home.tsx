import { Helmet } from "react-helmet-async";
import { TITLE } from "../const";

export default function Home() {
  return (
    <div className="h-full">
      <Helmet>
        <title>{`Home | ${TITLE}`}</title>
      </Helmet>
      <div className="h-3/6 bg-gray-500 grid grid-cols-3 gap-0.5">
        <div className="bg-red-200"></div>
        <div className="bg-red-200"></div>
        <div className="bg-red-200"></div>
        <div className="bg-red-200"></div>
        <div className="bg-red-200"></div>
        <div className="bg-red-200"></div>
      </div>
      <div>sessions</div>
    </div>
  );
}
