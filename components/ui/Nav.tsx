import NavItem from "./NavItem";

export default function Nav() {
  return (
    <nav
      id="navLinks"
      className="hidden min-[900px]:flex list-none flex-wrap items-center justify-center gap-5 mr-20"
    >
      <NavItem href="#pain">Зачем сайт</NavItem>
      <NavItem href="#packages">Цены</NavItem>
      <NavItem href="#portfolio">Примеры</NavItem>
    </nav>
  );
}
