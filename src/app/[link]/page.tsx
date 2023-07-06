"use client";

import Link from "next/link";
import { useRouter } from "next/router";

export default function LinkPage() {
  const router = useRouter();
  const { link } = router.query;
  console.log({ link });
  return (
    <main>
      <Link href={String(link)}>Redireccion</Link>
    </main>
  );
}
