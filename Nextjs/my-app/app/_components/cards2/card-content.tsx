type CardContentParams = {
  children: React.ReactNode;
};
export default function CardContent(props: CardContentParams): React.ReactNode {
  const { children } = props;
  return <div className="mb-4 text-sm">{children}</div>;
}
