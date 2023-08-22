/* eslint-disable no-unused-vars */
import React from "react";

declare global {
  type ProfileLink = {
    id: string;
    owner: Account;
    alias: string;
    from: string;
    to: string;
    icon: string;
    color: string;
    canReturnToProfile: boolean;
    timerRedirect: boolean;
  };
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
    username: string;
    avatarUrl: string;
    communications?: Communications;
  }
  interface DefaultComponentProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }

  type DefaultComponent = React.FC<DefaultComponentProps>;
  type ExtendedComponent<T> = React.FC<DefaultComponentProps & T>;

  type PageReq = {
    params: {
      [key: string]: string;
    };
    searchParams: {
      [key: string]: string;
    };
  };

  type ProfilePageReq = PageReq & {
    params: {
      username: string;
    };
  };

  type LinkPageReq = PageReq & {
    params: {
      link: string;
    };
  };
}

// Overriding variants for material UI components with module augmentation (TypeScript)
// ref: https://mui.com/material-ui/customization/theme-components/
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navbar: true;
  }
}
