import Link from "next/link";
type NavigationButtonParams = {
  route: string;
  children: React.ReactNode;
};
export default function NavigationButton({
  route,
  children,
}: NavigationButtonParams) {
  return (
    <Link
      href={route}
      className="
    inline-block
    px-4 py-2
    rounded-lg
    bg-primary
    text-text
    font-medium
    transition
    hover:bg-primary/90
    hover:scale-[1.02]
    active:scale-95
  "
    >
      {children}
    </Link>
  );
}
