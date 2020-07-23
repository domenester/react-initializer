import { Matcher, MatcherOptions } from "@testing-library/react";

export type RenderTestFunction = (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement