import CardFooter from "../_components/cards2/card-footer";
import CardContent from "../_components/cards2/card-content";
import CardHeader from "../_components/cards2/card-header";
import Card from "../_components/cards2/card";
export default function Page() {
  return (
    <>
      <Card>
        <CardHeader
          title="Hola!"
          subtitle="Mi nombre es Mateo Atehortúa"
        ></CardHeader>
        <CardContent>
          <p>
            Soy un aspirante a programador senior, me siento bien trabajando en
            equipo, discutiendo temas técnicos y resolviendo problemas.
          </p>
        </CardContent>
        <CardFooter>
          <p>Copyright Mateo Atehortúa, 2025</p>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1">
            Mi sitio web
          </a>
        </CardFooter>
      </Card>
    </>
  );
}
