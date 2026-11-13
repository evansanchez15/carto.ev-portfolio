// Static imports of every optimized photo, keyed by filename. Static imports give
// next/image the real dimensions and a blur placeholder. These are the original 30 frames;
// new photos go in a place folder instead (see places.generated.ts), which needs no line here.
import type { StaticImageData } from "next/image";
import photo1 from "../../public/assets/images/optimized/photography/photo1.jpg";
import photo2 from "../../public/assets/images/optimized/photography/photo2.jpg";
import photo3 from "../../public/assets/images/optimized/photography/photo3.jpg";
import photo4 from "../../public/assets/images/optimized/photography/photo4.jpg";
import photo5 from "../../public/assets/images/optimized/photography/photo5.jpg";
import photo6 from "../../public/assets/images/optimized/photography/photo6.jpg";
import photo7 from "../../public/assets/images/optimized/photography/photo7.jpg";
import photo8 from "../../public/assets/images/optimized/photography/photo8.jpg";
import photo9 from "../../public/assets/images/optimized/photography/photo9.jpg";
import photo10 from "../../public/assets/images/optimized/photography/photo10.jpg";
import photo11 from "../../public/assets/images/optimized/photography/photo11.jpg";
import photo12 from "../../public/assets/images/optimized/photography/photo12.jpg";
import photo13 from "../../public/assets/images/optimized/photography/photo13.jpg";
import photo14 from "../../public/assets/images/optimized/photography/photo14.jpg";
import photo15 from "../../public/assets/images/optimized/photography/photo15.jpg";
import photo16 from "../../public/assets/images/optimized/photography/photo16.jpg";
import photo17 from "../../public/assets/images/optimized/photography/photo17.jpg";
import photo18 from "../../public/assets/images/optimized/photography/photo18.jpg";
import photo19 from "../../public/assets/images/optimized/photography/photo19.jpg";
import photo20 from "../../public/assets/images/optimized/photography/photo20.jpg";
import photo21 from "../../public/assets/images/optimized/photography/photo21.jpg";
import photo22 from "../../public/assets/images/optimized/photography/photo22.jpg";
import photo23 from "../../public/assets/images/optimized/photography/photo23.jpg";
import photo24 from "../../public/assets/images/optimized/photography/photo24.jpg";
import photo25 from "../../public/assets/images/optimized/photography/photo25.jpg";
import photo26 from "../../public/assets/images/optimized/photography/photo26.jpg";
import photo27 from "../../public/assets/images/optimized/photography/photo27.jpg";
import photo28 from "../../public/assets/images/optimized/photography/photo28.jpg";
import photo29 from "../../public/assets/images/optimized/photography/photo29.jpg";
import photo30 from "../../public/assets/images/optimized/photography/photo30.jpg";
import contact from "../../public/assets/images/optimized/photography/contact.jpg";

export const photoImages = {
  "photo1.jpg": photo1,
  "photo2.jpg": photo2,
  "photo3.jpg": photo3,
  "photo4.jpg": photo4,
  "photo5.jpg": photo5,
  "photo6.jpg": photo6,
  "photo7.jpg": photo7,
  "photo8.jpg": photo8,
  "photo9.jpg": photo9,
  "photo10.jpg": photo10,
  "photo11.jpg": photo11,
  "photo12.jpg": photo12,
  "photo13.jpg": photo13,
  "photo14.jpg": photo14,
  "photo15.jpg": photo15,
  "photo16.jpg": photo16,
  "photo17.jpg": photo17,
  "photo18.jpg": photo18,
  "photo19.jpg": photo19,
  "photo20.jpg": photo20,
  "photo21.jpg": photo21,
  "photo22.jpg": photo22,
  "photo23.jpg": photo23,
  "photo24.jpg": photo24,
  "photo25.jpg": photo25,
  "photo26.jpg": photo26,
  "photo27.jpg": photo27,
  "photo28.jpg": photo28,
  "photo29.jpg": photo29,
  "photo30.jpg": photo30,
  "contact.jpg": contact,
} satisfies Record<string, StaticImageData>;

export type PhotoFile = keyof typeof photoImages;
