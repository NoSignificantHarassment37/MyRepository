import NavigationButton from "@/app/_components/NavigationButton";
export default function AuthNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavigationButton route="/">Inicio</NavigationButton>
        </li>
        <li>
          <NavigationButton route="/docs">Documentación</NavigationButton>
        </li>
        <li>
          <NavigationButton route="/about-me">Sobre mí</NavigationButton>
        </li>
      </ul>
    </nav>
  );
}
