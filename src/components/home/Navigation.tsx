import { memo } from 'react';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';

/**
 * Navigation Component
 *
 * A wrapper component that includes desktop navigation.
 * Mobile navigation is handled separately in the layout.
 *
 * @returns {JSX.Element} The rendered component
 */
const Navigation = memo(function Navigation() {
  return <DesktopNavigation />;
});

export default Navigation;
