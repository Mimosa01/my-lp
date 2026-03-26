export type PkgFeatureLine = {
  text: string;
  emphasized: boolean;
};

export type PkgCardContent = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: readonly PkgFeatureLine[];
  /** Карточка «Хит» и полная ширина в сетке пакетов */
  featured?: boolean;
  /** primary — оранжевая CTA; outline — нейтральная кнопка как btn-g в макете */
  buttonVariant?: "primary" | "outline";
};

export const PKG_PACKAGES: readonly PkgCardContent[] = [
  {
    id: "standart",
    name: "Свой сайт под ключ",
    price: "15 000 ₽",
    period: "Разово",
    description:
      "Профессиональная витрина, которая продаёт ваши услуги 24/7 и бережёт ваше время.",
    featured: false,
    buttonVariant: "outline",
    features: [
      { text: "Портфолио, ЧаВо и форма заявки", emphasized: true },
      { text: "1 полезный виджет (напр. Калькулятор)", emphasized: true },
      { text: "База клиентов и рассылки в кармане", emphasized: true },
      { text: "Уведомления о заявках", emphasized: false },
      { text: "Помощь с доменом и хостингом", emphasized: false },
    ],
  },
  {
    id: "subscription",
    name: "Бизнес на автопилоте",
    price: "2 000 ₽",
    period: "в месяц",
    description:
      "Максимальный фарш без больших вложений. Запуск системы всего за 5 000 ₽.",
    featured: true,
    buttonVariant: "primary",
    features: [
      { text: "ВСЕ виджеты без ограничений", emphasized: true },
      { text: "Приоритетная поддержка 24/7", emphasized: true },
      { text: "Бесплатный хостинг и обслуживание", emphasized: true },
      { text: "Выкуп сайта в собственность через год", emphasized: false },
      { text: "Обновления функций — бесплатно", emphasized: false },
    ],
  },
  {
    id: "widgets",
    name: "Конструктор функций",
    price: "+ 1 500 ₽",
    period: "за модуль",
    description:
      "Масштабируйте сайт по мере роста бизнеса. Добавляйте только то, что нужно сейчас.",
    featured: false,
    buttonVariant: "outline",
    features: [
      { text: "Онлайн-календарь записи", emphasized: true },
      { text: "Интерактивная карта выезда", emphasized: true },
      { text: "Галерея работ «До / После»", emphasized: false },
      { text: "Сбор отзывов одной кнопкой", emphasized: false },
      { text: "Любые кастомные расчеты", emphasized: false },
    ],
  },
];

