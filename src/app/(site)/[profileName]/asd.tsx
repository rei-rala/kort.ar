"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage(req: ProfilePageReq) {
  const { profileName } = req.params;
  const router = useRouter();

  console.log(`Redireccionando a de /profile/${profileName}`);

  //router.push(`/profile/${profileName}`);
}
