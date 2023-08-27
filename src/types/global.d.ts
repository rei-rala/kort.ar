/* eslint-disable no-unused-vars */
import React from "react";

declare global {
  type UserLink = {
    id: string;
    owner: Account;
    alias: string;
    from: string;
    to: string;
    icon: string;
    color: string;
    canReturnToProfile: boolean;
    active: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };

  type AccountNotification = {
    id: string;
    title: string;
    description: string;
    date: Date;
    read: Boolean;
  };

  type Communications = {
    notifications: AccountNotification[];
  };

  type Account = {
    name: string;
    email: string;
    username: string;
    avatarUrl: string;
    communications?: Communications;
  };
  type DefaultComponentProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };

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
      linkId: string;
    };
  };
}
