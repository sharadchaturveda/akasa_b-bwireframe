"use client";

import Link from "next/link";
import { memo } from "react";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

interface MobileWhatsHappeningButtonProps {
  href: string;
  text: string;
}

/**
 * MobileWhatsHappeningButton Component
 *
 * A mobile-optimized button specifically for the WhatsHappeningSection
 * with proper text alignment and no overflow issues.
 */
const MobileWhatsHappeningButton = memo(function MobileWhatsHappeningButton({
  href,
  text
}: MobileWhatsHappeningButtonProps) {
  return (
    <Link href={href} className="w-full sm:w-auto">
      <MobilePrimaryButton
        className="w-full sm:w-[200px] md:w-[240px] text-center shadow-lg"
      >
        {text}
      </MobilePrimaryButton>
    </Link>
  );
});

export default MobileWhatsHappeningButton;
