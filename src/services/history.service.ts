import { createBrowserHistory, createMemoryHistory } from "history";
import { isNodeEnvTest } from "../utils/tests";

const customHistory = (
  isNodeEnvTest() ?
  createMemoryHistory() :
  createBrowserHistory()
);

export default customHistory;