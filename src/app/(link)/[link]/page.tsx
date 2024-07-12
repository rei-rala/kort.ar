import { getRedirectLinkByRedirectPage } from "@/services/testLinks";
import { removeHTTPPrefix } from "@/utils/text";
import { Link } from "@mui/material";
import { notFound } from "next/navigation";

type LinkDisplayProps = {
  redirectLink?: RedirectLink | null;
};

const LinkDisplay = ({ redirectLink }: LinkDisplayProps) => {
  if (!redirectLink) {
    notFound();
  }

  return (
    <>
      <h2>
        {redirectLink.owner?.name} quiere llevarte a{" "}
        <Link href={`${redirectLink.to}`} target="_blank">
          {removeHTTPPrefix(redirectLink.to)}
        </Link>
      </h2>
      {redirectLink?.canReturnToProfile ? (
        <div>
          Redireccionando en <b id="redirectSeconds">3</b>
          {/* countdown XD */}...
        </div>
      ) : (
        <div>
          {redirectLink.canReturnToProfile && (
            <div>
              <p>
                O visualiza todos sus links desde{" "}
                <Link href={`/profile/${redirectLink.owner?.name}`}>
                  <b>aqui</b>
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
      <footer>
        <pre>
          <code>{JSON.stringify(redirectLink, null, 2)}</code>
        </pre>
      </footer>
    </>
  );
};

export default async function LinkPage(req: LinkPageReq) {
  const { data: redirectLink } = await getRedirectLinkByRedirectPage(req.params.link);
  return <LinkDisplay redirectLink={redirectLink} />;
}
