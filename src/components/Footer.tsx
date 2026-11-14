import Link from "next/link";
import Wordmark from "./Wordmark";
import { bodyFont } from "./fonts";
import { email } from "@/content/contact";

type FooterProps = {
  /** Show the CONTACT button above the email. */
  contactButton?: boolean;
  /** Warm grey (#E9E4DA) instead of #E4E4E1, to sit with /photography's cream page. */
  warm?: boolean;
};

function Email() {
  return (
    <p className="text-[#424242] text-[16px] sm:text-[18px] md:text-[20px] tracking-[0.05em]" style={bodyFont}>
      <a href={`mailto:${email}`} className="hover:text-[#626262] transition-colors">
        {email}
      </a>
    </p>
  );
}

/**
 * Grey footer with the large wordmark. The wordmark's font sizes are capped so it
 * always fits beside the email column (see CLAUDE.md, "Footer wordmark sizing");
 * recompute them if the email, the right-hand column or the padding changes.
 */
export default function Footer({ contactButton = false, warm = false }: FooterProps) {
  return (
    <footer className={`relative ${warm ? "bg-[#E9E4DA]" : "bg-[#E4E4E1]"} py-8 sm:py-12 md:py-16 mt-10 sm:mt-15 md:mt-20`}>
      <div className="pl-4 sm:pl-6 md:pl-8 flex flex-col sm:flex-row sm:items-end sm:justify-between pr-4 sm:pr-6 md:pr-8">
        <div className="text-left mb-4 sm:mb-0">
          <Wordmark
            as="h2"
            className="text-[#424242] text-[length:min(60px,calc((100vw_-_36px)/6.1))] sm:text-[length:min(90px,calc((100vw_-_344px)/6.1))] md:text-[length:min(120px,calc((100vw_-_388px)/6.1))] lg:text-[length:min(180px,calc((100vw_-_388px)/6.1))] font-black leading-none tracking-[0.05em] cursor-pointer hover:text-[#626262] transition-colors"
          />
        </div>

        {contactButton ? (
          <div className="text-left sm:text-right sm:pb-4 md:pb-6 flex flex-col items-start sm:items-end gap-4">
            <Link href="/contact">
              <button className="bg-[#424242] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-[14px] sm:text-[16px] font-bold tracking-[0.05em] hover:bg-[#333333] transition-colors" style={bodyFont}>
                CONTACT
              </button>
            </Link>
            <Email />
          </div>
        ) : (
          <div className="text-left sm:text-right sm:pb-4 md:pb-6">
            <Email />
          </div>
        )}
      </div>
    </footer>
  );
}
