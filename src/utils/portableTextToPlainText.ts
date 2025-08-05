import { PortableTextBlock } from 'sanity';

export function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  return blocks.slice(0,3)
    .map((block) => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        return block.children.map((child) => child.text).join('');
      }
      return '';
    })
    .join(' ')                     // Join all blocks into a single string
    .replace(/\s+/g, ' ')          // Normalize multiple spaces/newlines/tabs into one space
    .trim();                       // Remove leading/trailing spaces
}
