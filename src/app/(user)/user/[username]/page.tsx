import { getRedirectLinksByUsername } from "@/services/redirectLink.services";
import Typography from "@mui/material/Typography";
import LinkList from "@/components/profile/LinkList/LinkList";
import { Link } from "@mui/material";
import { BrandWatermark } from "@/components/shared";

// Define the props for the ProfilePageComponent
type ProfilePageComponentProps = {
  username: string;
  links?: RedirectLink[] | null;
};

// ProfilePageComponent: Renders the profile page with user links or an error message
const ProfilePageComponent: ExtendedComponent<ProfilePageComponentProps> = ({
  username,
  links = [],
}) => {
  if (!links || links.length === 0) {
    return (
      <div>
        <Typography component="h2" variant="h4">
          Ups, no encontramos a {username} =P
        </Typography>
        <div>
          <Link href="/">Ir a home</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Typography component="h2" variant="h4">
        Links de {username}
      </Typography>
      <LinkList links={links} />
    </div>
  );
};

// ProfilePage: Fetches user links and renders the ProfilePageComponent
export default async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const { data: profileRedirectLinks } = await getRedirectLinksByUsername(username);

  return (
    <main>
      <ProfilePageComponent username={username} links={profileRedirectLinks} />
      <BrandWatermark />
    </main>
  );
}
