import SectionHeader from "@/components/ui/SectionHeader";
import BookingCalendar from "../demo/Calendar";
import PriceCalculator from "../demo/Calculator";
import BeforeAfterSlider from "../demo/BeforeAfterSlider";
import AdminDashboard from "../demo/Dashboard";

export default function Portfolio() {
  return (
    <section className="bg-bg py-[72px] md:py-24" id="portfolio">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionHeader
            eyebrow="Примеры"
            title={
              <>
                Примеры <span>виджетов</span>
              </>
            }
          />
        </div>
        <div className="mt-9 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="col-span-1 md:row-span-2">
            <BookingCalendar />
          </div>
          <div className="md:col-span-1 md:row-span-3">
            <PriceCalculator />
          </div>
          <div className="md:col-span-1 md:row-span-2">
            <BeforeAfterSlider />
          </div>
          <div className="md:col-span-2 md:row-span-2">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
