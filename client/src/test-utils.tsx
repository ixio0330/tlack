import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./App";

const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HistoryRouter history={history}>
      { children }
    </HistoryRouter>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };