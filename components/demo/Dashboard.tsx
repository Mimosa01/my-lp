// app/components/AdminDashboard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Типы данных
interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  duration: number;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  notes?: string;
}

interface Service {
  id: string;
  name: string;
  count: number;
  revenue: number;
}

const dateDaysAgo = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
  color: string;
};

type AppointmentsTableProps = {
  appointments: Appointment[];
  onStatusChange: (id: string, status: Appointment['status']) => void;
};

type RevenueChartProps = {
  appointments: Appointment[];
};

// Демо-данные
const demoAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Анна Смирнова',
    clientPhone: '+7 (999) 123-45-67',
    service: 'Маникюр',
    date: dateDaysAgo(0),
    time: '14:00',
    price: 1500,
    status: 'confirmed',
    duration: 60,
  },
  {
    id: '2',
    clientName: 'Ирина Козлова',
    clientPhone: '+7 (916) 234-56-78',
    service: 'Педикюр + покрытие',
    date: dateDaysAgo(0),
    time: '16:30',
    price: 2500,
    status: 'pending',
    duration: 90,
  },
  {
    id: '3',
    clientName: 'Мария Иванова',
    clientPhone: '+7 (905) 345-67-89',
    service: 'Окрашивание',
    date: dateDaysAgo(1),
    time: '11:00',
    price: 3500,
    status: 'confirmed',
    duration: 120,
  },
  {
    id: '4',
    clientName: 'Елена Петрова',
    clientPhone: '+7 (926) 456-78-90',
    service: 'Стрижка',
    date: dateDaysAgo(2),
    time: '15:00',
    price: 1200,
    status: 'completed',
    duration: 45,
  },
  {
    id: '5',
    clientName: 'Ольга Сидорова',
    clientPhone: '+7 (915) 567-89-01',
    service: 'Ресницы',
    date: dateDaysAgo(3),
    time: '10:00',
    price: 2500,
    status: 'completed',
    duration: 90,
  },
  {
    id: '6',
    clientName: 'Наталья Воробьева',
    clientPhone: '+7 (903) 678-90-12',
    service: 'Маникюр',
    date: dateDaysAgo(5),
    time: '12:00',
    price: 1500,
    status: 'cancelled',
    duration: 60,
  },
  {
    id: '7',
    clientName: 'Юлия Фролова',
    clientPhone: '+7 (901) 444-11-22',
    service: 'Маникюр + дизайн',
    date: dateDaysAgo(6),
    time: '18:00',
    price: 2200,
    status: 'completed',
    duration: 90,
  },
  {
    id: '8',
    clientName: 'Светлана Орлова',
    clientPhone: '+7 (902) 555-22-33',
    service: 'Педикюр',
    date: dateDaysAgo(8),
    time: '13:30',
    price: 2000,
    status: 'completed',
    duration: 75,
  },
  {
    id: '9',
    clientName: 'Ксения Белова',
    clientPhone: '+7 (903) 666-33-44',
    service: 'Стрижка',
    date: dateDaysAgo(12),
    time: '09:30',
    price: 1200,
    status: 'completed',
    duration: 45,
  },
  {
    id: '10',
    clientName: 'Виктория Новикова',
    clientPhone: '+7 (904) 777-44-55',
    service: 'Окрашивание',
    date: dateDaysAgo(16),
    time: '17:00',
    price: 3800,
    status: 'confirmed',
    duration: 120,
  },
  {
    id: '11',
    clientName: 'Дарья Романова',
    clientPhone: '+7 (905) 888-55-66',
    service: 'Ресницы',
    date: dateDaysAgo(21),
    time: '12:30',
    price: 2600,
    status: 'completed',
    duration: 90,
  },
  {
    id: '12',
    clientName: 'Татьяна Лебедева',
    clientPhone: '+7 (906) 999-66-77',
    service: 'Маникюр',
    date: dateDaysAgo(27),
    time: '19:00',
    price: 1500,
    status: 'pending',
    duration: 60,
  },
];

// Статистика
const calculateStats = (appointments: Appointment[]) => {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today && a.status !== 'cancelled');
  const confirmedToday = todayAppointments.filter(a => a.status === 'confirmed').length;
  const pendingToday = todayAppointments.filter(a => a.status === 'pending').length;
  
  const thisMonth = appointments.filter(a => {
    const date = new Date(a.date);
    const now = new Date();
    return date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear() &&
           a.status !== 'cancelled';
  });
  
  const totalRevenue = thisMonth.reduce((sum, a) => sum + a.price, 0);
  const uniqueClients = new Set(thisMonth.map(a => a.clientName)).size;
  
  return {
    todayTotal: todayAppointments.length,
    confirmedToday,
    pendingToday,
    monthlyRevenue: totalRevenue,
    monthlyClients: uniqueClients,
  };
};

// Компонент карточки статистики
const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  </div>
);

// Компонент таблицы записей
const AppointmentsTable = ({ appointments, onStatusChange }: AppointmentsTableProps) => {
  const [filter, setFilter] = useState<'all' | Appointment['status']>('all');
  const [search, setSearch] = useState('');
  
  const filteredAppointments = appointments.filter((a: Appointment) => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (search && !a.clientName.toLowerCase().includes(search.toLowerCase()) &&
        !a.clientPhone.includes(search)) return false;
    return true;
  });

  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabels = {
    confirmed: 'Подтвержден',
    pending: 'Ожидает',
    completed: 'Выполнен',
    cancelled: 'Отменен',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Последние записи
          </h3>
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as 'all' | Appointment['status'])
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Все записи</option>
              <option value="confirmed">Подтвержденные</option>
              <option value="pending">Ожидают</option>
              <option value="completed">Выполненные</option>
              <option value="cancelled">Отмененные</option>
            </select>
            <input
              type="text"
              placeholder="Поиск по имени или телефону"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Услуга</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата и время</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Стоимость</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAppointments.map((app: Appointment) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{app.clientName}</div>
                  <div className="text-sm text-gray-500">{app.clientPhone}</div>
                </td>
                <td className="px-6 py-4 text-gray-900">{app.service}</td>
                <td className="px-6 py-4">
                  <div>{new Date(app.date).toLocaleDateString('ru-RU')}</div>
                  <div className="text-sm text-gray-500">{app.time}</div>
                </td>
                <td className="px-6 py-4 font-medium">{app.price.toLocaleString()} ₽</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                    {statusLabels[app.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onStatusChange(app.id, 'confirmed')}
                      className="text-green-600 hover:text-green-800 text-sm"
                      title="Подтвердить"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => onStatusChange(app.id, 'cancelled')}
                      className="text-red-600 hover:text-red-800 text-sm"
                      title="Отменить"
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Компонент графика выручки
const RevenueChart = ({ appointments }: RevenueChartProps) => {
  const [view, setView] = useState<'week' | 'month'>('week');
  
  const getLastDays = (days: number) => {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const dates = view === 'week' ? getLastDays(7) : getLastDays(30);
  
  const revenueByDate = dates.map(date => {
    const dayAppointments = appointments.filter((a: Appointment) => 
      a.date === date && a.status !== 'cancelled'
    );
    return dayAppointments.reduce<number>((sum, a) => sum + a.price, 0);
  });

  const maxRevenue = Math.max(...revenueByDate, 1);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Динамика выручки</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded-lg text-sm ${
              view === 'week' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Неделя
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg">
        <div className="flex h-48 items-end gap-1 px-1">
        {revenueByDate.map((revenue, index) => {
          const height = (revenue / maxRevenue) * 100;
          return (
            <div key={index} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1 overflow-hidden">
              <div className="w-full overflow-hidden rounded-t-lg bg-purple-100" style={{ height: `${Math.max(height, 2)}%` }}>
                <div
                  className="w-full bg-purple-600 transition-all duration-500"
                  style={{ height: '100%' }}
                />
              </div>
              <span className="w-full truncate text-center text-[10px] leading-none text-gray-500">
                {dates[index].slice(5)}
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

// Компонент популярных услуг
const PopularServices = ({ services }: { services: Service[] }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярные услуги</h3>
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.id}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{service.name}</span>
            <span className="font-medium">{service.revenue.toLocaleString()} ₽</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 rounded-full h-2 transition-all duration-500"
              style={{ width: `${(service.revenue / services[0].revenue) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{service.count} записей</div>
        </div>
      ))}
    </div>
  </div>
);

// Основной компонент
export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments);
  const [selectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  
  const stats = calculateStats(appointments);
  
  // Статистика по услугам
  const serviceStats = appointments
    .filter(a => a.status !== 'cancelled')
    .reduce((acc, a) => {
      const existing = acc.find(s => s.name === a.service);
      if (existing) {
        existing.count++;
        existing.revenue += a.price;
      } else {
        acc.push({ id: a.service, name: a.service, count: 1, revenue: a.price });
      }
      return acc;
    }, [] as Service[])
    .sort((a, b) => b.revenue - a.revenue);
  
  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Панель управления
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Добро пожаловать! Сегодня {new Date().toLocaleDateString('ru-RU', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  🔔
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                А
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Записей сегодня"
            value={stats.todayTotal}
            icon="📅"
            color="bg-blue-100"
          />
          <StatCard
            title="Подтверждено"
            value={stats.confirmedToday}
            icon="✅"
            color="bg-green-100"
          />
          <StatCard
            title="Ожидают"
            value={stats.pendingToday}
            icon="⏳"
            color="bg-yellow-100"
          />
          <StatCard
            title="Выручка за месяц"
            value={`${stats.monthlyRevenue.toLocaleString()} ₽`}
            icon="💰"
            color="bg-purple-100"
          />
        </div>
        
        {/* Графики и услуги */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart appointments={appointments} />
          </div>
          <div>
            <PopularServices services={serviceStats.slice(0, 5)} />
          </div>
        </div>
        
        {/* Таблица записей */}
        <div className="mb-8">
          <AppointmentsTable
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        </div>
        
        {/* Быстрые действия */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium text-gray-900">Новая запись</div>
            <div className="text-sm text-gray-500">Добавить вручную</div>
          </button>
          <button className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-gray-900">Отчет за месяц</div>
            <div className="text-sm text-gray-500">Скачать Excel</div>
          </button>
          <button className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium text-gray-900">Настройки</div>
            <div className="text-sm text-gray-500">Услуги и цены</div>
          </button>
          <button className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium text-gray-900">Рассылка</div>
            <div className="text-sm text-gray-500">Отправить рекламу</div>
          </button>
        </div>
        
        {/* Демо-информация */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="shrink-0 text-blue-600">💡</div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Демо-версия админ-панели</p>
              <p>Здесь показаны примеры статистики, управления записями и аналитики. В реальном проекте все данные будут подгружаться из вашей базы клиентов. Вы сможете менять статусы записей, добавлять клиентов и получать уведомления о новых заявках.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Модальное окно карточки клиента (упрощенное) */}
      <AnimatePresence>
        {showClientModal && selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowClientModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedClient.name}</h3>
              <div className="space-y-3 mb-6">
                <p className="text-gray-600">📞 {selectedClient.phone}</p>
                <p className="text-gray-600">📊 Визитов: {selectedClient.totalVisits}</p>
                <p className="text-gray-600">💰 Потрачено: {selectedClient.totalSpent.toLocaleString()} ₽</p>
                <p className="text-gray-600">📅 Последний визит: {selectedClient.lastVisit}</p>
                {selectedClient.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Заметки:</p>
                    <p className="text-sm text-gray-600">{selectedClient.notes}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Записать
                </button>
                <button
                  onClick={() => setShowClientModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}