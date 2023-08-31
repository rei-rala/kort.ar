import Link from "next/link";
import { getLinkByUsername } from "@/services/testLinks";
import Typography from "@mui/material/Typography/Typography";
import LinkList from "@/components/pages/profile/LinkList/LinkList";

const ProfilePageComponent: ExtendedComponent<{
  username: string;
  links: UserLink[];
}> = ({ username, links }) => {
  if (links.length === 0) {
    return (
      <>
        <Typography component={"h2"} variant="h4">
          Ups no encontramos a {username} =P
        </Typography>
        <div>
          <Link href="/">Ir a home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Typography component={"h2"} variant="h4">
        Los links de {username}
      </Typography>
      <div>
        <ul>
          <LinkList links={links} />
        </ul>
      </div>
    </>
  );
};

export default async function ProfilePage(req: ProfilePageReq) {
  const { username } = req.params;
  const linksFromProfile = await getLinkByUsername(username);

  let activeLinks = linksFromProfile.filter((l) => l.active);

  return (
    <main>
      <ProfilePageComponent username={username} links={activeLinks} />
    </main>
  );
}
