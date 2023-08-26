import Link from "next/link";
import { getLinkByOrigin } from "@/services/testLinks";
import { removeHTTPPrefix } from "@/utils/text";
import { notFound } from "next/navigation";

const getLinkComponent = (link: string, profileLink: UserLink | null) => {
  if (!profileLink) {
    notFound();
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
      <footer>{link}</footer>
    </>
  );
};

export default async function LinkPage(req: LinkPageReq) {
  const found: UserLink | null = await getLinkByOrigin(req.params.link);
  const linkComponent = getLinkComponent(req.params.link, found);

  return <section>{linkComponent}</section>;
}
