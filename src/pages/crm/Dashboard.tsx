import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { Users, FileText, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { motion } from "motion/react"

const data = [
  { name: 'Пн', appeals: 40, resolved: 24, inProgress: 10 },
  { name: 'Вт', appeals: 30, resolved: 13, inProgress: 15 },
  { name: 'Ср', appeals: 20, resolved: 38, inProgress: 8 },
  { name: 'Чт', appeals: 27, resolved: 39, inProgress: 12 },
  { name: 'Пт', appeals: 18, resolved: 48, inProgress: 5 },
  { name: 'Сб', appeals: 23, resolved: 38, inProgress: 7 },
  { name: 'Вс', appeals: 34, resolved: 43, inProgress: 11 },
]

const categoryData = [
  { name: 'ЖКХ', value: 400 },
  { name: 'Дороги', value: 300 },
  { name: 'Благоустройство', value: 300 },
  { name: 'Транспорт', value: 200 },
  { name: 'Здравоохранение', value: 150 },
  { name: 'Образование', value: 100 },
]

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative z-10"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-400/20 transition-colors"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Всего обращений</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">1,245</p>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+12%</span>
                <span className="text-slate-400 ml-2">за неделю</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-400/20 transition-colors"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Решено</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">892</p>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 shadow-sm">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+5%</span>
                <span className="text-slate-400 ml-2">за неделю</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-400/20 transition-colors"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">В работе</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">312</p>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 shadow-sm">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-red-500 mr-1 rotate-180" />
                <span className="text-red-500 font-medium">-2%</span>
                <span className="text-slate-400 ml-2">за неделю</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-400/20 transition-colors"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Исполнителей</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">45</p>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 shadow-sm">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-400">Активны сейчас: 38</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-slate-800">Динамика обращений</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAppeals" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                      itemStyle={{ fontSize: '14px', fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="appeals" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorAppeals)" name="Поступило" animationDuration={1500} />
                    <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorResolved)" name="Решено" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-0 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-slate-800">По категориям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={40}>
                    <defs>
                      <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                    />
                    <Bar dataKey="value" fill="url(#colorBar)" radius={[8, 8, 8, 8]} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
