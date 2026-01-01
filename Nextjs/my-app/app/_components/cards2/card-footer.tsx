type CardFooterParams = {
  children: React.ReactNode;
};
export default function CardFooter(props: CardFooterParams) {
  const { children } = props;
  return <div className="flex justify-end gap-2">{children}</div>;
}
