export type PainThread = {
  avatar: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  avatarClass: string;
  rowClass?: string;
  previewClass?: string;
};

export type PainBubble = {
  side: "left" | "right";
  text: string;
  time: string;
  muted?: boolean;
};

export type PainClientNote = {
  name: string;
  lastContact: string;
  faded?: boolean;
};

export const painCard1Data = {
  headerTitle: "Сообщения",
  headerSubtitle: "4 непрочитанных",
  footerText: "Теряете заказы в куче уведомлений?",
  footerAccent: "Все заявки в одном окне вашего личного бота.",
  threads: [
    {
      avatar: "А",
      name: "Клиент из Авито",
      preview: "Здравствуйте, вы ещё делаете?",
      time: "10:14",
      unread: 2,
      avatarClass: "bg-orange-dim text-orange",
    },
    {
      avatar: "М",
      name: "Мама (просит зайти)",
      preview: "Ну когда ты уже зайдёшь? 🙂",
      time: "вчера",
      avatarClass: "bg-[#22c55e1a] text-[#16a34a]",
    },
    {
      avatar: "W",
      name: "Заказчик из WhatsApp",
      preview: "Ну что, договорились на пятницу?",
      time: "09:55",
      unread: 3,
      avatarClass: "bg-[#60a5fa33] text-[#205a94]",
    },
    {
      avatar: "?",
      name: "Неизвестный номер",
      preview: "Алло, мы вчера в директе договаривались, вы где?",
      time: "сейчас",
      unread: 1,
      avatarClass: "bg-surface text-muted",
      rowClass: "bg-[#fff4cc]",
      previewClass: "text-[#9a6a00] font-medium",
    },
  ] satisfies PainThread[],
};

export const painCard2Data = {
  headerAvatar: "КЛ",
  headerTitle: "Клиент",
  headerSubtitle: "был в сети 5 мин. назад",
  footerText: "Устали быть бесплатным калькулятором?",
  footerAccent: "Клиент считает цену сам — за 30 секунд на сайте.",
  chat: [
    { side: "left", text: "А замена труб сколько стоит?", time: "22:44" },
    {
      side: "left",
      text: "А если я со своими трубами приду?",
      time: "22:45",
    },
    {
      side: "left",
      text: "Скидку сделаете? У меня объём большой",
      time: "22:46",
    },
    {
      side: "right",
      text: "Значит так: замена трубы от 1500, если свои материалы — минус 400, объём от 3 точек — скидка 10%, но зависит от диаметра, если полипропилен то...",
      time: "23:28 ✓",
    },
    {
      side: "left",
      text: "Понял, спасибо. Подумаю",
      time: "23:29",
      muted: true,
    },
  ] satisfies PainBubble[],
  trailingNote: "...и больше не написал",
};

export const painCard3Data = {
  headerAvatar: "НК",
  headerTitle: "Новый клиент",
  headerSubtitle: "пишет впервые",
  footerText: "Тратите время на поиск старых фото?",
  footerAccent: "Портфолио на сайте продаёт вас, пока вы занимаетесь делом.",
  chat: [
    {
      side: "left",
      text: "Покажите фото, как вы делали ванную в хрущёвке?",
      time: "14:22",
    },
    {
      side: "right",
      text: "Щас пришлю, тут немного сложно найти среди личных фото...",
      time: "14:33 ✓",
    },
    {
      side: "left",
      text: "Ничего, я пока другого гляну",
      time: "14:34",
      muted: true,
    },
  ] satisfies PainBubble[],
  galleryTitle: "Галерея · 2 184 фото",
  galleryCellOpacities: [1, 0.8, 0.6, 0.4, 0.35, 0.3, 0.25, 0.2],
  galleryCaption: "листает уже 10 минут...",
};

export const painCard4Data = {
  headerTitle: "Заметки",
  headerSubtitle: "клиентская база",
  footerText: "Клиенты не возвращаются сами.",
  footerAccent: "Одна рассылка по базе — и запись на неделю вперёд.",
  notes: [
    { name: "Катя", lastContact: "3 месяца назад" },
    { name: "Сергей", lastContact: "4 месяца назад" },
    { name: "Ира", lastContact: "5 месяцев назад" },
    { name: "Света", lastContact: "полгода назад...", faded: true },
  ] satisfies PainClientNote[],
  outgoingText:
    "Надо написать старым клиентам... но руками каждому — это ж весь вечер 😮‍💨",
  outgoingTime: "думаю уже второй месяц",
  trailingNote: "...так и не написал",
  incomingText: "Привет! Нашла мастера ближе к дому, спасибо за всё 🙂",
  incomingTime: "спустя 5 месяцев · Катя",
};
