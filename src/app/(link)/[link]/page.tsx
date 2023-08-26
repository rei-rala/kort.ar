import Link from "next/link";
import { getLinkByAlias } from "@/services/testLinks";
import { removeHTTPPrefix } from "@/utils/text";

const getLinkComponent = (link: string, profileLink: UserLink | null) => {
  if (!profileLink) {
    return (
      <div>
        <h1>404: {link}</h1>
      </div>
    );
  }

  return (
    <>
      <h2>
        {profileLink.owner.name} quiere llevarte a{" "}
        <Link href={`${profileLink.to}`} target="_blank">
          {removeHTTPPrefix(profileLink.to)}
        </Link>
      </h2>
      {profileLink?.canReturnToProfile ? (
        <div>
          Redireccionando en <b id="redirectSeconds">3</b>
          {/* countdown XD */}...
        </div>
      ) : (
        <div>
          {profileLink.canReturnToProfile && (
            <div>
              <p>
                O visualiza todos sus links desde{" "}
                <Link href={`/profile/${profileLink.owner.username}`}>
                  <b>aqui</b>
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default async function LinkPage(req: LinkPageReq) {
  const found: UserLink | null = await getLinkByAlias(req.params.link);
  const linkComponent = getLinkComponent(req.params.link, found);

  return <section>{linkComponent}</section>;
}
