import { createBrowserHistory, createMemoryHistory } from "history";
import { isNodeEnvTest } from "../utils";

const customHistory = (
  isNodeEnvTest() ?
  createMemoryHistory() :
  createBrowserHistory()
);

export default customHistory;