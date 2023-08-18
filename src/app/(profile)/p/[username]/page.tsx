import { redirect } from "next/navigation";

export default function ProfilePage(req: ProfilePageReq) {
  redirect("/profile/" + req.params.username);
}
