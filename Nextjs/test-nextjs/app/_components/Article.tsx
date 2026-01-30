type DocsArticleParams = {
  title: string;
  children: React.ReactNode;
};

export default function DocsArticle({ title, children }: DocsArticleParams) {
  return (
    <article className="m-5 bg-background">
      <h3 className="text-primary">{title}</h3>
      {children}
    </article>
  );
}
