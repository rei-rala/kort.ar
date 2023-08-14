import Link from "next/link";
import { getLinkByUsername } from "@/services/testLinks";

export default async function ProfilePage(req: ProfilePageReq) {
  let linksFromProfile = await getLinkByUsername(req.params.username);

  return (
    <main>
      <h2>Los links de {req.params.username}</h2>
      <ul>
        {linksFromProfile.map((link) => (
          <li key={link.from}>
            <Link href={link.to}>{link.alias}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
