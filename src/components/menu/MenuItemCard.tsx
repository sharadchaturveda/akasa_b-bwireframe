"use client";

import { memo } from 'react';
import { MenuItem } from '@/types/menu';
import BaseMenuItemCard from './BaseMenuItemCard';

interface MenuItemCardProps {
  item: MenuItem;
}

/**
 * MenuItemCard Component
 *
 * A component for displaying standard menu items.
 * Uses the BaseMenuItemCard component with default renderers.
 *
 * @param {MenuItemCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const MenuItemCard = memo(function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <BaseMenuItemCard item={item} />
  );
});

export default MenuItemCard;
