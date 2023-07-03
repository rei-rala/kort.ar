/* eslint-disable no-unused-vars */

import React from "react";

declare global {
  interface AccountNotification {
    id: string;
    title: string;
    description: string;
    date: Date;
    read: Boolean;
  }
  interface Communications {
    notifications: AccountNotification[];
  }

  interface Account {
    name: string;
    email: string;
    avatarUrl: string;
    communications: Communications;
  }
  interface DefaultComponentProps {
    children?: React.ReactNode;
    className?: string | undefined;
  }

  type DefaultComponent = React.FC<DefaultComponentProps>;

  // eslint-disable-next-line no-shadow
  enum Breakpoint {
    XS = 0,
    SM = 600,
    MD = 900,
    LG = 1200,
    XL = 1536,
  }
}
