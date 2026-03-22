import Nav from "../ui/Nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex h-13 max-w-[1100px] w-full items-center justify-between px-4">
      <div className="font-syne text-sm font-extrabold tracking-[-0.02em]">
        Тарачов<span className="text-orange">.</span>
      </div>
      <Nav />
      <div className="text-xs text-muted2">
        © {year} · Кирилл Тарачов · Чита
      </div>
    </footer>
  );
}
