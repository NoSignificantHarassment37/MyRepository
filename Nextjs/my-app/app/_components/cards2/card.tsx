type CardParams = {
  children: React.ReactNode;
};
export default function Card({ children }: CardParams) {
  return <div className="rounded-lg border p-4 shadow-sm">{children}</div>;
}
