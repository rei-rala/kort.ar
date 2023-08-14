import Link from "next/link";
import { getLinkByAlias } from "@/services/testLinks";

const getLinkComponent = (link: string, profileLink: ProfileLink | null) => {
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
        {profileLink.owner.name} quiere llevarte a &quot;
        <Link href={`${profileLink.to}`}>{profileLink.to}</Link>&quot;
      </h2>
      {profileLink?.timerRedirect ? (
        <div>
          Redireccionando en <b id="redirectSeconds">3</b>
          {/* countdown XD */}...
        </div>
      ) : (
        <div>
          {profileLink.canReturnToProfile && !profileLink.timerRedirect && (
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
  const found: ProfileLink | null = await getLinkByAlias(req.params.link);
  const linkComponent = getLinkComponent(req.params.link, found);

  return <section>{linkComponent}</section>;
}
