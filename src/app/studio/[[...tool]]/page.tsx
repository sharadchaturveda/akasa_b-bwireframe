/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <>
      {/* Inject CSS to hide floating action buttons specifically in Sanity Studio */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide the WhatsApp button */
        .fixed.left-4.md\\:left-6.z-50.transition-all.duration-300 {
          display: none !important;
        }

        /* Hide the Book Now button */
        .fixed.right-4.md\\:right-6.z-50.transition-all.duration-300 {
          display: none !important;
        }
      `}} />
      <NextStudio config={config} />
    </>
  );
}
