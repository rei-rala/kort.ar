import { getRedirectLinkByRedirectPage } from "@/services/redirectLink.services";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { RedirectLinkHeader, RedirectLinkBody } from "./redirectLinkPageComponents";

import styles from "./linkStyles.module.css";
import { BrandWatermark } from "@/components/shared";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: `${BRAND} - Link acortado`,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default async function LinkPage({
  params,
  searchParams: { skip },
}: {
  params: { link: string };
  searchParams: { skip: boolean };
}) {
  const { link } = params;
  if (!link) {
    notFound();
  }

  const { data: redirectLink } = await getRedirectLinkByRedirectPage(link);

  if (!redirectLink) {
    notFound();
  }

  if (skip) redirect(redirectLink.to);

  return (
    <section className={styles.linkPage}>
      <main className={styles.linkPageInner} style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>
        <RedirectLinkHeader redirectLink={redirectLink} />
        <RedirectLinkBody redirectLink={redirectLink} />
      </main>
      <BrandWatermark />
    </section>
  );
}
