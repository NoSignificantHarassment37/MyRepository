type CardParams = {
  children: React.ReactNode;
  title: React.ReactNode;
};
export default function Card({ children, title }: CardParams) {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
}
