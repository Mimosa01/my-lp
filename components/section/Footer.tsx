import Logo from "../ui/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex h-13 max-w-[1100px] w-full items-center px-4">
      <Logo />
      <div className="text-xs text-muted2">
        © {year} · Кирилл Тарачов · Чита
      </div>
    </footer>
  );
}
