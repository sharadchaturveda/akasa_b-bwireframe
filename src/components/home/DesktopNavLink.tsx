import Link from 'next/link';

interface DesktopNavLinkProps {
  name: string;
  path: string;
}

export default function DesktopNavLink({ name, path }: DesktopNavLinkProps) {
  return (
    <Link 
      href={path}
      className="text-white text-sm md:text-base font-montserrat tracking-widest uppercase hover:opacity-70 transition-opacity duration-300"
    >
      {name}
    </Link>
  );
}