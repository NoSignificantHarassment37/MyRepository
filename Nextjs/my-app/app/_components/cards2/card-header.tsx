type CardHeaderParams = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};
export default function CardHeader(props: CardHeaderParams) {
  const { title, subtitle } = props;
  return (
    <header>
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
    </header>
  );
}
