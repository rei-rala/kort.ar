import React from "react";

declare global {
  type OptionalPropsOf<T> = {
    [K in keyof T]?: T[K];
  };

  type ApiResponse<T> = {
    message: string;
    status: number;
    data: T | null;
    success: boolean;
    error?: string;
  };

  type User = {
    id?: string;
    name: string;
    username: string;
    email: string;
    emailVerified?: string;
    image: String;
    createdAt?: Date;
    updatedAt?: Date;
  };

  type RedirectLink = {
    id?: string;
    userEmail: string;
    alias: string;
    from?: string;
    to: string;
    icon: string;
    color: string;
    hitCount: number;
    active?: boolean;
    public?: boolean;
    canReturnToProfile?: boolean;
    flaggedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    owner: User;
  };

  type Hit = {
    id?: string;
    date?: Date | null;
    ip: string | null;
    userAgent: string | null;
    referer: string | null;
    userEmail: string | null;
    originalUsername?: string | null;
    loggedUserEmail: string | null;
    user: User | null;

    redirectLinkId?: string | null;
    redirectLink?: RedirectLink | null;
    originalFrom?: String;
    originalDestiny?: String;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;

    visitedLink?: string;
    visitedProfile?: string;
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
    public?: boolean;
  };

  type DefaultComponentProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
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
