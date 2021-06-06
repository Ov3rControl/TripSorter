import {useEffect, useMemo} from "react";
import {releaseProxy, wrap} from "comlink";
import TripSorterWorker from "../worker.ts?worker";

export const useWorker = <T>() => {
  const workerApiAndCleanup = useMemo(() => makeWorkerApiAndCleanup<T>(), []);

  useEffect(() => {
    const { cleanup } = workerApiAndCleanup;

    return () => {
      cleanup();
    };
  }, [workerApiAndCleanup]);

  return workerApiAndCleanup;
};

const makeWorkerApiAndCleanup = <T>() => {
  const worker = new TripSorterWorker();
  const workerApi = wrap<T>(worker);

  const cleanup = () => {
    workerApi[releaseProxy](); // Close the Proxyy
    worker.terminate();
  };

  return {workerApi, cleanup};
};
