import DocsArticle from "./Article";
export type DocsSectionParams = {
  children:
    | React.ReactElement<typeof DocsArticle>[]
    | React.ReactElement<typeof DocsArticle>;
  title: string;
};
export default function DocsSection({ children, title }: DocsSectionParams) {
  return (
    <section className="bg-background">
      <h2 className="text-primary">{title}</h2>
      {children}
    </section>
  );
}
