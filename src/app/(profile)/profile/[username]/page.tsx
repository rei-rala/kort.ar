import Link from "next/link";
import { getLinkByUsername } from "@/services/testLinks";

const ProfilePageComponent: ExtendedComponent<{
  username: string;
  links: UserLink[];
}> = ({ username, links }) => {
  if (links.length === 0) {
    return (
      <>
        <h2>Ups no encontramos a {username} =P</h2>
        <div>
          <Link href="/">Ir a home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Los links de {username}</h2>
      <div>
        <ul>
          {links.map((link) => (
            <li key={link.from}>
              <Link href={link.to}>{link.alias}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default async function ProfilePage(req: ProfilePageReq) {
  const { username } = req.params;
  const linksFromProfile = await getLinkByUsername(username);

  return (
    <main>
      <ProfilePageComponent username={username} links={linksFromProfile} />
    </main>
  );
}
