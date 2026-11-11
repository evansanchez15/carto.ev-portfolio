import Link from "next/link";
import { displayFont } from "./fonts";

type WordmarkProps = {
  /** Heading level: h1 in page headers and heroes, h2 in the footer. */
  as?: "h1" | "h2";
  /** Size, colour and hover classes for the heading; these differ per placement. */
  className: string;
  linkClassName?: string;
};

/** The CARTO.EV wordmark, linking home. */
export default function Wordmark({ as: Heading = "h1", className, linkClassName }: WordmarkProps) {
  return (
    <Link href="/" className={linkClassName}>
      <Heading className={className} style={displayFont}>
        CARTO.EV
      </Heading>
    </Link>
  );
}
