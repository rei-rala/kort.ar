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
    username: string | null;
    email: string;
    emailVerified?: string;
    image: string | null;
    public: boolean;
    hitCount: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    flaggedAt?: Date | null;
  };

  type RedirectLink = {
    id?: string;
    alias: string;
    from: string;
    to: string;
    icon: string;
    color: string;
    canReturnToProfile?: boolean;
    active?: boolean;
    hitCount: number;
    public?: boolean;
    flaggedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    owner?: UserCreateNestedOneWithoutRedirectLinksInput | User | null;
    hits?: HitCreateNestedManyWithoutRedirectLinkInput | Hit[] | null;
  };

  type FeaturedUser = Pick<User, "username" | "image" | "hitCount">;
  type FeaturedLink = Pick<RedirectLink, "alias" | "from" | "to" | "hitCount">;
  type Featured = {
    featuredLink: FeaturedLink;
    featuredUser: FeaturedUser;
  };

  type Hit = {
    id?: string;
    date?: Date | string;
    ip?: string | null;
    userAgent?: string | null;
    referer?: string | null;
    visitedUserId?: string | null;
    originalFrom?: string | null;
    originalTo?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user?: UserCreateNestedOneWithoutHitsInput | User | null;
    redirectLink?: RedirectLinkCreateNestedOneWithoutHitsInput | RedirectLink | null;
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
