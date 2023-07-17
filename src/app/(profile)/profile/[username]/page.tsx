"use client";

import linksFromProfile from "@/app/testLinks";
import Link from "next/link";

export default function ProfilePage(req: ProfilePageReq) {
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
