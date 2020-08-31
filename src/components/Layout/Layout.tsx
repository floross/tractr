import React from 'react';
import { Header } from '../Header';

export const Layout: React.FunctionComponent = ({ children }) => (
  <div>
    <Header />
    <div className="flex justify-center items-center">{children}</div>
  </div>
);
