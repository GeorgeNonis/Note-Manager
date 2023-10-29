import React, { ReactNode } from "react";

export interface SvgProps extends React.HTMLAttributes<HTMLDivElement> {
  cond: boolean;
  First?: React.ComponentType<any>;
  Second?: React.ComponentType<any>;
}
