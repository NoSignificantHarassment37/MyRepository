type Post = {
  id: number;
  title: string;
  content: string;
};
function getPost(slug: string, cantidad: number): Post[] {
  const acumulador: Post[] = [];
  for (let i = 0; i < cantidad; i++) {
    acumulador.push({
      title: slug,
      content: "XDDD",
      id: i,
    });
  }
  return acumulador;
}
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPost(slug, 5);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
