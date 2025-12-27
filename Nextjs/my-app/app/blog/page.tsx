import Link from "next/link";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = (await searchParams).filters;
  return (
    <>
      <p>{filters}</p>
      <Link href="/">Ir a inicio</Link>
    </>
  );
}
