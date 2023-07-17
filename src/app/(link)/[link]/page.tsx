import linksFromProfile from "@/app/testLinks";
import Link from "next/link";

export default async function LinkPage(req: LinkPageReq) {
  const { link: linkParam } = req.params;
  const linkParamLower = linkParam.toLowerCase();
  const found = linksFromProfile.find((link) => link.from.toLowerCase() === linkParamLower);

  linksFromProfile.forEach((l) => {
    console.log({
      from: l.from,
      linkParam,
    });
    console.log(l.from.toLowerCase() === linkParamLower);
  });

  if (!found) {
    return (
      <div>
        <h1>404: {linkParam}</h1>
      </div>
    );
  }

  const { owner, to, canReturnToProfile } = found;

  return (
    <div>
      <h2>
        {owner.name} quiere llevarte a &quot;{to}&quot;
      </h2>
      <div>
        <p>
          Click{" "}
          <Link href={to}>
            <b>aqui</b>
          </Link>{" "}
          para continuar
        </p>
      </div>
      {canReturnToProfile && (
        <div>
          <p>
            O visualiza todos sus links desde{" "}
            <Link href={`/profile/${owner.username}`}>
              <b>aqui</b>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
