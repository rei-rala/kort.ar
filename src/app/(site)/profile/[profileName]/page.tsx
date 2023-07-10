"use client";

export default function ProfilePage(req: ProfilePageReq) {
  return <main>profile {req.params.profileName}</main>;
}
