'use client';

import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWeekend,
  isBefore,
  startOfToday,
} from 'date-fns';
import { ru } from 'date-fns/locale';

interface Service {
  id: string;
  name: string;
  duration: number; // в минутах
  price: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const services: Service[] = [
  { id: '1', name: 'Маникюр (классический)', duration: 60, price: 1500 },
  { id: '2', name: 'Маникюр + покрытие', duration: 90, price: 2500 },
  { id: '3', name: 'Педикюр', duration: 60, price: 2000 },
  { id: '4', name: 'Комплекс (маникюр + педикюр)', duration: 120, price: 4000 },
];

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    // Детерминированная доступность, чтобы SSR и hydration совпадали.
    const hourAvailable = hour % 3 !== 0;
    const halfHourAvailable = (hour + 1) % 4 !== 0;
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: hourAvailable,
    });
    if (hour !== 20) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:30`,
        available: halfHourAvailable,
      });
    }
  }
  return slots;
};

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'service' | 'datetime' | 'form' | 'success'>('service');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
  });

  const today = startOfToday();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const timeSlots = generateTimeSlots();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep('datetime');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Запись:', {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      client: formData,
    });
    setStep('success');
  };

  const resetBooking = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep('service');
    setFormData({ name: '', phone: '', comment: '' });
  };

  // Проверка, можно ли выбрать дату
  const isDateSelectable = (date: Date) => {
    if (isBefore(date, today) && !isSameDay(date, today)) return false;
    if (isWeekend(date)) return false; // Не работаем в выходные
    return true;
  };

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl h-full">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-pink-600 px-4 py-4 sm:px-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Онлайн-запись на прием
        </h2>
        <p className="mt-1 text-sm text-purple-100">
          Выберите услугу и удобное время
        </p>
      </div>

      {/* Progress Steps */}
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
          {['Услуга', 'Дата и время', 'Контакты', 'Готово'].map((label, index) => (
            <div key={label} className="flex items-center sm:flex-1">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:h-8 sm:w-8 sm:text-sm ${
                  index === 0 && step === 'service'
                    ? 'bg-purple-600 text-white'
                    : index === 1 && step === 'datetime'
                    ? 'bg-purple-600 text-white'
                    : index === 2 && step === 'form'
                    ? 'bg-purple-600 text-white'
                    : index === 3 && step === 'success'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-xs sm:text-sm ${
                  index === 0 && step === 'service'
                    ? 'text-purple-600 font-medium'
                    : index === 1 && step === 'datetime'
                    ? 'text-purple-600 font-medium'
                    : index === 2 && step === 'form'
                    ? 'text-purple-600 font-medium'
                    : index === 3 && step === 'success'
                    ? 'text-purple-600 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {label}
              </span>
              {index < 3 && (
                <div className="mx-2 hidden h-px flex-1 bg-gray-200 sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Step 1: Выбор услуги */}
        {step === 'service' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Выберите услугу
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left group"
                >
                  <div className="font-medium text-gray-900 group-hover:text-purple-700">
                    {service.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {service.duration} мин • {service.price.toLocaleString()} ₽
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Выбор даты и времени */}
        {step === 'datetime' && selectedService && (
          <div>
            <button
              onClick={() => setStep('service')}
              className="text-purple-600 text-sm mb-4 hover:text-purple-700"
            >
              ← Назад к услугам
            </button>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {/* Календарь */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Выберите дату
                </h3>
                <div className="rounded-lg border p-3 sm:p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      onClick={prevMonth}
                      className="rounded p-1.5 hover:bg-gray-100 sm:p-2"
                    >
                      ←
                    </button>
                    <span className="text-sm font-semibold capitalize sm:text-base">
                      {format(currentMonth, 'LLLL yyyy', { locale: ru })}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="rounded p-1.5 hover:bg-gray-100 sm:p-2"
                    >
                      →
                    </button>
                  </div>

                  <div className="mb-2 grid grid-cols-7 gap-1">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                      <div key={day} className="py-1 text-center text-[11px] text-gray-500 sm:py-2 sm:text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((day) => {
                      const isCurrentMonth = isSameMonth(day, currentMonth);
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isSelectable = isDateSelectable(day);

                      return (
                        <button
                          key={day.toString()}
                          onClick={() => isSelectable && handleDateSelect(day)}
                          disabled={!isSelectable || !isCurrentMonth}
                          className={`
                            rounded-lg p-1.5 text-center text-xs sm:p-2 sm:text-sm
                            ${!isCurrentMonth && 'text-gray-300'}
                            ${isSelectable && isCurrentMonth && 'hover:bg-purple-100 cursor-pointer'}
                            ${!isSelectable && 'text-gray-300 cursor-not-allowed'}
                            ${isSelected && 'bg-purple-600 text-white hover:bg-purple-700'}
                          `}
                        >
                          {format(day, 'd')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Время */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Выберите время
                </h3>
                {selectedDate ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      {format(selectedDate, 'd MMMM yyyy', { locale: ru })}
                    </p>
                    <div className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:max-h-96 sm:grid-cols-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={`
                            rounded-lg border p-2 text-sm transition-all
                            ${
                              slot.available
                                ? 'border-gray-200 hover:border-purple-500 hover:bg-purple-50 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }
                            ${selectedTime === slot.time && 'bg-purple-600 text-white border-purple-600'}
                          `}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    Сначала выберите дату
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Форма контактов */}
        {step === 'form' && selectedService && selectedDate && selectedTime && (
          <div>
            <button
              onClick={() => setStep('datetime')}
              className="text-purple-600 text-sm mb-4 hover:text-purple-700"
            >
              ← Назад к выбору времени
            </button>

            <div className="mx-auto max-w-md">
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Вы записываетесь на:</p>
                <p className="font-medium">{selectedService.name}</p>
                <p className="text-sm">
                  {format(selectedDate, 'd MMMM yyyy', { locale: ru })}, {selectedTime}
                </p>
                <p className="text-lg font-bold text-purple-600 mt-2">
                  {selectedService.price.toLocaleString()} ₽
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Комментарий
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Дополнительные пожелания..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Записаться
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: Успех */}
        {step === 'success' && (
          <div className="py-10 text-center sm:py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 sm:h-20 sm:w-20">
              <svg
                className="h-8 w-8 text-green-600 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Запись подтверждена!
            </h3>
            <p className="text-gray-600 mb-6">
              Мы отправили детали записи на ваш телефон
            </p>
            <button
              onClick={resetBooking}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Записаться еще раз
            </button>
          </div>
        )}
      </div>

      {/* Демо-информация */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 sm:px-6">
        ⚡️ Живой пример: выберите услугу, дату и заполните форму. Данные никуда не
        отправляются — это демо-версия.
      </div>
    </div>
  );
}