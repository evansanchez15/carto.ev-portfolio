import Link from "next/link";
import { bodyFont } from "./fonts";

/** One line and the CONTACT button, closing the photography pages. Draft copy (see CLAUDE.md). */
export default function ContactPrompt() {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5">
      <p className="text-[#424242] text-[18px] sm:text-[20px] md:text-[24px] font-bold tracking-[0.05em] leading-snug" style={bodyFont}>
        Working on a campaign or shoot? Let&apos;s talk.
      </p>
      <Link
        href="/contact"
        className="bg-[#424242] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-[14px] sm:text-[16px] font-bold tracking-[0.05em] hover:bg-[#333333] transition-colors"
        style={bodyFont}
      >
        CONTACT
      </Link>
    </div>
  );
}
