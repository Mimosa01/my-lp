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
    id: "landing",
    name: "Лендинг",
    price: "10 000 ₽",
    period: "от 5 дней",
    description:
      "Одностраничный сайт с формой заявки. Заявки сразу в Telegram.",
    featured: false,
    buttonVariant: "outline",
    features: [
      { text: "Адаптив под телефон", emphasized: true },
      { text: "Форма → Telegram-уведомления", emphasized: true },
      { text: "Портфолио / примеры работ", emphasized: false },
      { text: "Домен и хостинг помогу настроить", emphasized: false },
      { text: "1 месяц поддержки", emphasized: false },
    ],
  },
  {
    id: "site-bot",
    name: "Сайт + бот",
    price: "20 000 ₽",
    period: "от 7 дней",
    description:
      "Сайт с Telegram-ботом. Заявки, запись, управление — всё с телефона.",
    featured: true,
    buttonVariant: "primary",
    features: [
      { text: "Всё из «Лендинга»", emphasized: true },
      { text: "Telegram-бот для управления", emphasized: true },
      { text: "Онлайн-запись клиентов", emphasized: true },
      { text: "Меняете цены и тексты через бота", emphasized: false },
      { text: "3 месяца поддержки", emphasized: false },
    ],
  },
  {
    id: "admin",
    name: "С админкой",
    price: "30 000 ₽",
    period: "от 14 дней",
    description:
      "Полноценная CMS. Редактируйте всё сами без разработчика.",
    featured: false,
    buttonVariant: "outline",
    features: [
      { text: "Всё из «Сайт + бот»", emphasized: true },
      { text: "Веб-панель управления", emphasized: true },
      { text: "Обучение за 30 минут", emphasized: false },
      { text: "Каталог товаров или услуг", emphasized: false },
      { text: "6 месяцев поддержки", emphasized: false },
    ],
  },
];
