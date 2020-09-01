import React from 'react';
import { Header } from '../Header';

export const Layout: React.FunctionComponent = ({ children }) => (
  <div>
    <Header />
    <div className="flex flex-col justify-center items-center">{children}</div>
  </div>
);
