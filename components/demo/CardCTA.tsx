import Button from "../ui/Button";

export default function CardCTA() {
  return (
    <div className="rounded-2xl bg-orange p-5 text-white h-full text-center">
      <p className="m-0 text-lg font-bold leading-tight">Тут ваш уникальный виджет</p>
      <Button
        href="#order"
        size="sm"
        variant="custom"
        className="mt-3 w-full bg-white text-orange hover:opacity-90"
      >
        Хочу так же
      </Button>
    </div>
  );
}
