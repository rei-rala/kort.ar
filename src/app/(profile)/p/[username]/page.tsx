import { redirect } from "next/navigation";

export default function ProfileShortcutPage(req: ProfilePageReq) {
  redirect("/profile/" + req.params.username);
}
