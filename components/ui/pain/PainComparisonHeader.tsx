export default function PainComparisonHeader() {
  return (
    <div className="grid grid-cols-2 border-b border-border">
      <div className="border-r border-border bg-[#fef5f3] px-[18px] py-[11px] text-[10px] font-bold tracking-widest text-[#b44040] uppercase">
        ❌ Без сайта
      </div>
      <div className="bg-[#f3fef5] px-[18px] py-[11px] text-[10px] font-bold tracking-widest text-[#2a7a40] uppercase">
        ✓ С сайтом
      </div>
    </div>
  );
}
