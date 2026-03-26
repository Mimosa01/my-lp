import LinkButton from "../ui/Button";
import Logo from "../ui/Logo";
import Nav from "../ui/Nav";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-200 border-b border-border backdrop-blur-16 bg-surface">
      <div className="mx-auto flex h-13 max-w-[1100px] items-center px-4">
        <Logo />
        <Nav />
        <LinkButton size="sm" href="#order">
          Заказать сайт
        </LinkButton>
      </div>
    </header>
  );
}
