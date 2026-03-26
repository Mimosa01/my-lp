export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1100px] px-5">
      {children}
    </div>
  );
}