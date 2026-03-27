// app/components/PriceCalculator.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Типы услуг для разных ниш
type BusinessType = 'beauty' | 'cleaning' | 'repair' | 'tutor';

interface Service {
  id: string;
  name: string;
  basePrice: number;
  unit?: 'sqm' | 'hour' | 'item';
  unitPrice?: number;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface BusinessConfig {
  title: string;
  icon: string;
  services: Service[];
  addons: Addon[];
  discountRules: {
    type: 'bulk' | 'first' | 'subscription';
    description: string;
    calculate: (total: number, quantity?: number) => number;
  }[];
}

// Конфигурации для разных типов бизнеса
const businessConfigs: Record<BusinessType, BusinessConfig> = {
  beauty: {
    title: 'Салон красоты',
    icon: '💅',
    services: [
      { id: '1', name: 'Маникюр', basePrice: 1500 },
      { id: '2', name: 'Педикюр', basePrice: 2000 },
      { id: '3', name: 'Стрижка', basePrice: 1200 },
      { id: '4', name: 'Окрашивание', basePrice: 3500 },
      { id: '5', name: 'Ресницы (наращивание)', basePrice: 2500 },
    ],
    addons: [
      { id: 'a1', name: 'Покрытие гель-лак', price: 500, description: 'Стойкое покрытие до 3 недель' },
      { id: 'a2', name: 'Дизайн ногтей', price: 300, description: 'Рисунок или стразы' },
      { id: 'a3', name: 'SPA-уход', price: 800, description: 'Пилинг и массаж' },
    ],
    discountRules: [
      {
        type: 'first',
        description: 'Скидка 10% на первый визит',
        calculate: (total) => total * 0.1,
      },
      {
        type: 'subscription',
        description: 'Абонемент на 4 визита (скидка 15%)',
        calculate: (total) => total * 0.15,
      },
    ],
  },
  cleaning: {
    title: 'Клининг',
    icon: '🧹',
    services: [
      { id: '1', name: 'Поддерживающая уборка', basePrice: 1500, unit: 'sqm', unitPrice: 150 },
      { id: '2', name: 'Генеральная уборка', basePrice: 2500, unit: 'sqm', unitPrice: 250 },
      { id: '3', name: 'Уборка после ремонта', basePrice: 4000, unit: 'sqm', unitPrice: 400 },
    ],
    addons: [
      { id: 'a1', name: 'Мойка окон', price: 1500, description: 'До 5 окон' },
      { id: 'a2', name: 'Чистка ковров', price: 2000, description: 'Площадь до 20м²' },
      { id: 'a3', name: 'Мытье холодильника', price: 500, description: 'Внутри и снаружи' },
    ],
    discountRules: [
      {
        type: 'bulk',
        description: 'Регулярная уборка (скидка 20%)',
        calculate: (total) => total * 0.2,
      },
      {
        type: 'first',
        description: 'Скидка 15% на первую уборку',
        calculate: (total) => total * 0.15,
      },
    ],
  },
  repair: {
    title: 'Ремонт и отделка',
    icon: '🔨',
    services: [
      { id: '1', name: 'Косметический ремонт', basePrice: 5000, unit: 'sqm', unitPrice: 500 },
      { id: '2', name: 'Капитальный ремонт', basePrice: 10000, unit: 'sqm', unitPrice: 1000 },
      { id: '3', name: 'Отделка под ключ', basePrice: 15000, unit: 'sqm', unitPrice: 1500 },
    ],
    addons: [
      { id: 'a1', name: 'Электромонтажные работы', price: 5000, description: 'Под ключ' },
      { id: 'a2', name: 'Сантехнические работы', price: 4000, description: 'Установка и подключение' },
      { id: 'a3', name: 'Дизайн-проект', price: 8000, description: '3D-визуализация' },
    ],
    discountRules: [
      {
        type: 'bulk',
        description: 'Комплексный ремонт (скидка 10%)',
        calculate: (total) => total * 0.1,
      },
    ],
  },
  tutor: {
    title: 'Репетитор',
    icon: '📚',
    services: [
      { id: '1', name: 'Индивидуальное занятие', basePrice: 1500, unit: 'hour', unitPrice: 1500 },
      { id: '2', name: 'Занятие в паре', basePrice: 1000, unit: 'hour', unitPrice: 1000 },
      { id: '3', name: 'Мини-группа (3-5 чел)', basePrice: 800, unit: 'hour', unitPrice: 800 },
    ],
    addons: [
      { id: 'a1', name: 'Домашнее задание с проверкой', price: 500, description: 'В неделю' },
      { id: 'a2', name: 'Пробный урок', price: 0, description: 'Первое занятие бесплатно' },
      { id: 'a3', name: 'Экспресс-подготовка к экзамену', price: 2000, description: 'Интенсив' },
    ],
    discountRules: [
      {
        type: 'subscription',
        description: 'Абонемент на 8 занятий (скидка 15%)',
        calculate: (total) => total * 0.15,
      },
      {
        type: 'bulk',
        description: 'Пакет 4 занятия (скидка 10%)',
        calculate: (total) => total * 0.1,
      },
    ],
  },
};

export default function PriceCalculator() {
  const [businessType, setBusinessType] = useState<BusinessType>('beauty');
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [area, setArea] = useState<number>(50);
  const [hours, setHours] = useState<number>(1);
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  const config = businessConfigs[businessType];

  // Расчет стоимости
  const calculateTotal = () => {
    let total = 0;
    const details: { name: string; price: number }[] = [];

    // Основные услуги
    Object.entries(selectedServices).forEach(([serviceId, quantity]) => {
      const service = config.services.find(s => s.id === serviceId);
      if (service && quantity > 0) {
        let price = service.basePrice;
        
        // Если есть поминутная/почасовая оплата
        if (service.unit === 'sqm') {
          price = service.unitPrice! * area;
        } else if (service.unit === 'hour') {
          price = service.unitPrice! * hours;
        } else {
          price = service.basePrice * quantity;
        }
        
        total += price;
        details.push({
          name: `${service.name}${quantity > 1 ? ` x${quantity}` : ''}${service.unit === 'sqm' ? ` (${area} м²)` : ''}${service.unit === 'hour' ? ` (${hours} ч)` : ''}`,
          price: price,
        });
      }
    });

    // Дополнительные услуги
    Object.entries(selectedAddons).forEach(([addonId, isSelected]) => {
      if (isSelected) {
        const addon = config.addons.find(a => a.id === addonId);
        if (addon) {
          total += addon.price;
          details.push({ name: addon.name, price: addon.price });
        }
      }
    });

    // Скидки
    let discountAmount = 0;
    if (selectedDiscount) {
      const discountRule = config.discountRules.find(r => r.type === selectedDiscount);
      if (discountRule) {
        discountAmount = discountRule.calculate(total);
        total -= discountAmount;
      }
    }

    return { total: Math.round(total), discountAmount: Math.round(discountAmount), details };
  };

  const { total, discountAmount, details } = calculateTotal();

  // Переключение типа бизнеса
  const handleBusinessChange = (type: BusinessType) => {
    setBusinessType(type);
    setSelectedServices({});
    setSelectedAddons({});
    setSelectedDiscount('');
    setArea(50);
    setHours(1);
  };

  // Добавление/удаление услуги
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      const newState = { ...prev };
      if (newState[serviceId]) {
        delete newState[serviceId];
      } else {
        newState[serviceId] = 1;
      }
      return newState;
    });
  };

  // Изменение количества услуги
  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      const newState = { ...selectedServices };
      delete newState[serviceId];
      setSelectedServices(newState);
    } else {
      setSelectedServices(prev => ({ ...prev, [serviceId]: quantity }));
    }
  };

  // Добавление/удаление доп. услуги
  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  // Проверка, нужен ли ввод площади/часов
  const needsArea = config.services.some(s => s.unit === 'sqm');
  const needsHours = config.services.some(s => s.unit === 'hour');

  return (
    <div className="mx-auto w-full h-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-4 sm:px-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Калькулятор стоимости
        </h2>
        <p className="mt-1 text-sm text-blue-100">
          Рассчитайте стоимость услуг онлайн
        </p>
      </div>

      {/* Переключатель ниш */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(Object.keys(businessConfigs) as BusinessType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleBusinessChange(type)}
              className={`
                flex min-w-[156px] shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:min-w-0 sm:px-4 sm:text-sm
                ${businessType === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              <span className="text-base sm:text-xl">{businessConfigs[type].icon}</span>
              <span className="truncate">{businessConfigs[type].title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6">
        {/* Левая колонка - выбор услуг */}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Выберите услуги
          </h3>

          {/* Основные услуги */}
          <div className="space-y-3 mb-6">
            {config.services.map((service) => (
              <div
                key={service.id}
                className={`cursor-pointer rounded-lg border p-3 transition-all sm:p-4 ${
                  selectedServices[service.id]
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleService(service.id)}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{service.name}</div>
                    {service.unit === 'sqm' && (
                      <div className="text-sm text-gray-500">
                        от {service.unitPrice} ₽/м²
                      </div>
                    )}
                    {service.unit === 'hour' && (
                      <div className="text-sm text-gray-500">
                        {service.unitPrice} ₽/час
                      </div>
                    )}
                    {!service.unit && (
                      <div className="text-sm text-gray-500">
                        {service.basePrice.toLocaleString()} ₽
                      </div>
                    )}
                  </div>
                  {selectedServices[service.id] && (
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateServiceQuantity(service.id, selectedServices[service.id] - 1);
                        }}
                        className="h-8 w-8 rounded-full border border-gray-300 bg-white text-lg leading-none hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {selectedServices[service.id]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateServiceQuantity(service.id, selectedServices[service.id] + 1);
                        }}
                        className="h-8 w-8 rounded-full border border-gray-300 bg-white text-lg leading-none hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Дополнительные услуги */}
          {config.addons.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Дополнительные услуги
              </h4>
              <div className="space-y-2">
                {config.addons.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons[addon.id] || false}
                      onChange={() => toggleAddon(addon.id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{addon.name}</div>
                      {addon.description && (
                        <div className="text-sm text-gray-500">{addon.description}</div>
                      )}
                      <div className="text-sm font-medium text-blue-600 mt-1">
                        {addon.price === 0 ? 'Бесплатно' : `${addon.price.toLocaleString()} ₽`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Параметры для площади/времени */}
          {(needsArea || needsHours) && (
            <div className="rounded-lg bg-gray-50 p-4">
              {needsArea && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Площадь помещения: {area} м²
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20 м²</span>
                    <span>200 м²</span>
                  </div>
                </div>
              )}
              {needsHours && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество часов: {hours} ч
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 ч</span>
                    <span>10 ч</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Правая колонка - итог */}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Итоговая стоимость
          </h3>

          {/* Скидки */}
          {config.discountRules.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Применить скидку
              </label>
              <select
                value={selectedDiscount}
                onChange={(e) => setSelectedDiscount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Без скидки</option>
                {config.discountRules.map((rule) => (
                  <option key={rule.type} value={rule.type}>
                    {rule.description}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Детали расчета */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mb-4 flex items-center gap-1 text-left text-sm text-blue-600 hover:text-blue-700"
          >
            {showDetails ? '▼' : '▶'} Показать детали расчета
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                  {details.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-3 text-sm">
                      <span className="flex-1 text-gray-600">{item.name}</span>
                      <span className="shrink-0 font-medium">{item.price.toLocaleString()} ₽</span>
                    </div>
                  ))}
                  {discountAmount > 0 && (
                    <div className="mt-2 flex justify-between border-t pt-2 text-sm text-green-600">
                      <span>Скидка</span>
                      <span>-{discountAmount.toLocaleString()} ₽</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Итоговая сумма */}
          <div className="mb-6 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 p-4 text-white sm:p-6">
            <div className="mb-1 text-sm opacity-90">Итого к оплате</div>
            <div className="text-3xl font-bold sm:text-4xl">
              {total.toLocaleString()} ₽
            </div>
            {discountAmount > 0 && (
              <div className="mt-2 text-sm opacity-90">
                Сэкономлено {discountAmount.toLocaleString()} ₽
              </div>
            )}
          </div>

          {/* Кнопка действия */}
          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            disabled={Object.keys(selectedServices).length === 0}
            onClick={() => {
              alert(`Демо-версия: предварительная стоимость ${total.toLocaleString()} ₽. В реальной версии здесь будет отправка заявки.`);
            }}
          >
            Записаться на услугу
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            ⚡️ Демо-версия: вы можете изменять параметры и видеть, как меняется стоимость
          </p>
        </div>
      </div>
    </div>
  );
}