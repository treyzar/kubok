import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle2, TrendingUp, TrendingDown, Filter, AlertCircle } from "lucide-react"
import { motion } from "motion/react"

const DEPARTMENTS = [
  { name: "Управление ЖКХ", total: 450, overdue: 12, avgTime: "4.2 дня", trend: "up" },
  { name: "Управление дорог", total: 320, overdue: 5, avgTime: "3.1 дня", trend: "down" },
  { name: "Благоустройство", total: 280, overdue: 2, avgTime: "2.5 дня", trend: "down" },
  { name: "Транспорт", total: 195, overdue: 8, avgTime: "5.0 дней", trend: "up" },
  { name: "Здравоохранение", total: 150, overdue: 1, avgTime: "1.8 дня", trend: "down" },
  { name: "Образование", total: 110, overdue: 0, avgTime: "2.0 дня", trend: "down" },
  { name: "Социальная защита", total: 90, overdue: 3, avgTime: "3.5 дня", trend: "up" },
]

const OVERDUE_APPEALS = [
  { id: "10112", dept: "Управление ЖКХ", days: 3, text: "Ремонт крыши по ул. Мира 12" },
  { id: "10145", dept: "Транспорт", days: 2, text: "Изменение маршрута №45" },
  { id: "10188", dept: "Управление ЖКХ", days: 1, text: "Затопление подвала" },
  { id: "10205", dept: "Управление дорог", days: 4, text: "Яма на проезжей части, ул. Ленина" },
  { id: "10211", dept: "Социальная защита", days: 2, text: "Задержка выплат многодетной семье" },
  { id: "10234", dept: "Благоустройство", days: 1, text: "Сломаны качели во дворе дома 5" },
]

export default function Monitoring() {
  const [filter, setFilter] = useState("all")

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Мониторинг исполнения</h1>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Select className="w-full md:w-48 h-11 rounded-xl bg-white/80 backdrop-blur-sm border-white/60 shadow-sm focus:bg-white transition-all">
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
            <option value="year">За год</option>
          </Select>
          <Select className="w-full md:w-48 h-11 rounded-xl bg-white/80 backdrop-blur-sm border-white/60 shadow-sm focus:bg-white transition-all">
            <option value="all">Все департаменты</option>
            <option value="gkh">Управление ЖКХ</option>
            <option value="roads">Управление дорог</option>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-md hover:shadow-lg transition-all duration-300 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Среднее время ответа</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">3.4 <span className="text-lg text-slate-500 font-medium">дня</span></p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl text-blue-600 shadow-sm border border-blue-100/50">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingDown className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">-0.2 дня</span>
                <span className="text-slate-400 ml-2">к прошлой неделе</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-md hover:shadow-lg transition-all duration-300 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Просрочено</p>
                  <p className="text-3xl font-bold text-red-600 tracking-tight">27</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl text-red-600 shadow-sm border border-red-100/50">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">+5</span>
                <span className="text-slate-400 ml-2">к прошлой неделе</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-md hover:shadow-lg transition-all duration-300 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Индекс удовлетворенности</p>
                  <p className="text-3xl font-bold text-emerald-600 tracking-tight">4.8 <span className="text-lg text-slate-500 font-medium">/ 5</span></p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100/50">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+0.1</span>
                <span className="text-slate-400 ml-2">к прошлой неделе</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Departments Table */}
        <motion.div className="lg:col-span-2" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-slate-800">Показатели подразделений</CardTitle>
              <button className="text-slate-500 hover:text-slate-700 flex items-center text-sm font-medium transition-colors">
                <Filter className="w-4 h-4 mr-2" /> Фильтр
              </button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/30 border-b border-slate-100/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Подразделение</th>
                      <th className="px-6 py-4 font-semibold text-center">Всего в работе</th>
                      <th className="px-6 py-4 font-semibold text-center">Просрочено</th>
                      <th className="px-6 py-4 font-semibold text-center">Ср. время</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/50">
                    {DEPARTMENTS.map((dept, i) => (
                      <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{dept.name}</td>
                        <td className="px-6 py-4 text-center text-slate-600">{dept.total}</td>
                        <td className="px-6 py-4 text-center">
                          {dept.overdue > 0 ? (
                            <Badge variant="destructive" className="bg-gradient-to-r from-red-100 to-rose-100 text-red-700 hover:from-red-200 hover:to-rose-200 border-0 shadow-sm">{dept.overdue}</Badge>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-medium text-slate-700">{dept.avgTime}</span>
                            {dept.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Critical Appeals */}
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-red-50/80 to-rose-50/80 border-b border-red-100/50 pb-4">
              <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 animate-pulse-soft" /> Критические просрочки
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100/50">
                {OVERDUE_APPEALS.map((appeal, i) => (
                  <div key={i} className="p-5 hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">#{appeal.id}</span>
                      <Badge variant="destructive" className="bg-gradient-to-r from-red-100 to-rose-100 text-red-700 hover:from-red-200 hover:to-rose-200 border-0 text-xs shadow-sm">
                        {appeal.days} {appeal.days === 1 ? 'день' : 'дня'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 line-clamp-2 mb-3 group-hover:text-slate-900 transition-colors">{appeal.text}</p>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{appeal.dept}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100/50 bg-slate-50/30 text-center">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Смотреть все (27)</a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
