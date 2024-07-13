import { getRedirectLinkByRedirectPage } from "@/services/redirectLink.services";
import { hexToRgba } from "@/utils/text";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RedirectLinkHeader, RedirectLinkBody } from "./redirectLinkPageComponents";

import styles from "./linkStyles.module.css";
import { BrandWatermark } from "@/components/shared";

const title = String(process.env.BRAND);
export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default async function LinkPage(req: LinkPageReq) {
  const { data: redirectLink } = await getRedirectLinkByRedirectPage(req.params.link);

  if (!redirectLink) {
    notFound();
  }

  return (
    <section className={styles.linkPage}>
      <main
        className={styles.linkPageInner}
        style={{ backgroundColor: hexToRgba(redirectLink?.color || "#000000", 0.05) }}
      >
        <RedirectLinkHeader redirectLink={redirectLink} />
        <RedirectLinkBody redirectLink={redirectLink} />
      </main>
      <BrandWatermark customBrand={title} />
    </section>
  );
}
