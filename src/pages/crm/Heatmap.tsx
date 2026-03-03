import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapPin, Flame, TrendingUp, AlertTriangle, Calendar, BarChart3 } from "lucide-react"
import 'leaflet/dist/leaflet.css'
import { motion, AnimatePresence } from "motion/react"
import HeatLayer from "@/components/HeatLayer"

type Category = 'ЖКХ' | 'Дороги' | 'Благоустройство' | 'Транспорт'
type TimePeriod = 'week' | 'month' | 'quarter' | 'year'

interface HeatPoint {
  id: number
  lat: number
  lng: number
  category: Category
  intensity: number
  address: string
  date: string
  count: number
}

const allPoints: HeatPoint[] = [
  { id: 1, lat: 56.1322, lng: 47.2518, category: 'ЖКХ', intensity: 0.8, address: "ул. Мира, 12", date: '2026-02-28', count: 14 },
  { id: 2, lat: 56.1422, lng: 47.2418, category: 'Дороги', intensity: 0.5, address: "пр. Ленина, 45", date: '2026-02-25', count: 8 },
  { id: 3, lat: 56.1222, lng: 47.2618, category: 'Благоустройство', intensity: 0.3, address: "ул. Гагарина, 8", date: '2026-02-20', count: 4 },
  { id: 4, lat: 56.1352, lng: 47.2558, category: 'ЖКХ', intensity: 0.9, address: "ул. Николаева, 21", date: '2026-03-01', count: 22 },
  { id: 5, lat: 56.1382, lng: 47.2458, category: 'Транспорт', intensity: 0.6, address: "Московский пр., 15", date: '2026-02-15', count: 9 },
  { id: 6, lat: 56.1300, lng: 47.2600, category: 'ЖКХ', intensity: 0.7, address: "ул. Калинина, 10", date: '2026-02-18', count: 11 },
  { id: 7, lat: 56.1450, lng: 47.2300, category: 'Дороги', intensity: 0.9, address: "ул. Энгельса, 2", date: '2026-03-02', count: 19 },
  { id: 8, lat: 56.1250, lng: 47.2700, category: 'Благоустройство', intensity: 0.4, address: "Парк Победы", date: '2026-01-10', count: 5 },
  { id: 9, lat: 56.1370, lng: 47.2500, category: 'Транспорт', intensity: 0.8, address: "Ост. 'Дом Мод'", date: '2026-02-22', count: 16 },
  { id: 10, lat: 56.1400, lng: 47.2400, category: 'ЖКХ', intensity: 0.5, address: "ул. К. Маркса, 31", date: '2026-01-28', count: 7 },
  { id: 11, lat: 56.1330, lng: 47.2580, category: 'Дороги', intensity: 0.2, address: "ул. Ярославская, 17", date: '2026-01-15', count: 3 },
  { id: 12, lat: 56.1280, lng: 47.2650, category: 'Благоустройство', intensity: 0.6, address: "Сквер Чапаева", date: '2026-02-05', count: 10 },
  { id: 13, lat: 56.1480, lng: 47.2250, category: 'ЖКХ', intensity: 0.9, address: "ул. Афанасьева, 9", date: '2026-03-01', count: 21 },
  { id: 14, lat: 56.1200, lng: 47.2750, category: 'Транспорт', intensity: 0.4, address: "Автовокзал", date: '2026-12-20', count: 6 },
  { id: 15, lat: 56.1390, lng: 47.2480, category: 'Дороги', intensity: 0.7, address: "Президентский бульвар", date: '2026-02-10', count: 13 },
  { id: 16, lat: 56.1340, lng: 47.2540, category: 'ЖКХ', intensity: 0.6, address: "ул. Композиторов Воробьёвых, 5", date: '2026-02-27', count: 10 },
  { id: 17, lat: 56.1410, lng: 47.2360, category: 'Транспорт', intensity: 0.7, address: "пр. Тракторостроителей, 32", date: '2026-03-01', count: 12 },
  { id: 18, lat: 56.1260, lng: 47.2680, category: 'Дороги', intensity: 0.8, address: "ул. Хевешская, 19", date: '2026-02-14', count: 15 },
  { id: 19, lat: 56.1360, lng: 47.2440, category: 'Благоустройство', intensity: 0.5, address: "Чебоксарский залив", date: '2026-02-08', count: 8 },
  { id: 20, lat: 56.1310, lng: 47.2560, category: 'ЖКХ', intensity: 0.85, address: "ул. Гузовского, 14", date: '2026-02-26', count: 18 },
  { id: 21, lat: 56.1440, lng: 47.2340, category: 'Дороги', intensity: 0.65, address: "Эгерский бульвар, 7", date: '2026-01-30', count: 11 },
  { id: 22, lat: 56.1290, lng: 47.2620, category: 'Транспорт', intensity: 0.45, address: "ост. Университет", date: '2026-02-12', count: 6 },
  { id: 23, lat: 56.1375, lng: 47.2520, category: 'ЖКХ', intensity: 0.75, address: "ул. Карла Маркса, 52", date: '2026-03-02', count: 13 },
  { id: 24, lat: 56.1430, lng: 47.2380, category: 'Благоустройство', intensity: 0.35, address: "парк Лакреевский лес", date: '2026-01-22', count: 5 },
  { id: 25, lat: 56.1240, lng: 47.2720, category: 'Дороги', intensity: 0.55, address: "ул. Пирогова, 22", date: '2026-02-03', count: 9 },
]

const categories: { key: Category; label: string; color: string; bgClass: string; borderClass: string; textClass: string; dotClass: string }[] = [
  { key: 'ЖКХ', label: 'ЖКХ', color: '#ef4444', bgClass: 'bg-red-50', borderClass: 'border-red-200', textClass: 'text-red-700', dotClass: 'bg-red-500' },
  { key: 'Дороги', label: 'Дороги', color: '#f59e0b', bgClass: 'bg-amber-50', borderClass: 'border-amber-200', textClass: 'text-amber-700', dotClass: 'bg-amber-500' },
  { key: 'Благоустройство', label: 'Благоустройство', color: '#10b981', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-200', textClass: 'text-emerald-700', dotClass: 'bg-emerald-500' },
  { key: 'Транспорт', label: 'Транспорт', color: '#3b82f6', bgClass: 'bg-blue-50', borderClass: 'border-blue-200', textClass: 'text-blue-700', dotClass: 'bg-blue-500' },
]

const timePeriods: { key: TimePeriod; label: string }[] = [
  { key: 'week', label: 'Неделя' },
  { key: 'month', label: 'Месяц' },
  { key: 'quarter', label: 'Квартал' },
  { key: 'year', label: 'Год' },
]

function getDateThreshold(period: TimePeriod): Date {
  const now = new Date(2026, 2, 2) // March 2, 2026
  switch (period) {
    case 'week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case 'month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case 'quarter':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    case 'year':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
  }
}

export default function Heatmap() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(['ЖКХ', 'Дороги', 'Благоустройство', 'Транспорт'])
  )
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('quarter')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleCategory = (cat: Category) => {
    setActiveCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const filteredPoints = useMemo(() => {
    const threshold = getDateThreshold(timePeriod)
    return allPoints.filter(p =>
      activeCategories.has(p.category) && new Date(p.date) >= threshold
    )
  }, [activeCategories, timePeriod])

  const heatPoints = useMemo((): Array<[number, number, number]> => {
    return filteredPoints.map(p => [p.lat, p.lng, p.intensity])
  }, [filteredPoints])

  const stats = useMemo(() => {
    const total = filteredPoints.reduce((s, p) => s + p.count, 0)
    const avg = filteredPoints.length > 0 ? total / filteredPoints.length : 0
    const maxPoint = filteredPoints.reduce((max, p) => p.count > max.count ? p : max, filteredPoints[0] || { address: '-', count: 0 })
    const byCat = categories.map(c => ({
      ...c,
      count: filteredPoints.filter(p => p.category === c.key).reduce((s, p) => s + p.count, 0),
      points: filteredPoints.filter(p => p.category === c.key).length,
    }))
    const topAddresses = [...filteredPoints].sort((a, b) => b.count - a.count).slice(0, 5)
    return { total, avg, maxPoint, byCat, topAddresses, pointCount: filteredPoints.length }
  }, [filteredPoints])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col relative z-10"
      style={{ minHeight: 'calc(100vh - 140px)' }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-100/50">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          Тепловая карта обращений
        </h1>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard
          icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
          label="Всего обращений"
          value={stats.total}
          accent="blue"
        />
        <StatCard
          icon={<MapPin className="w-5 h-5 text-emerald-600" />}
          label="Точек на карте"
          value={stats.pointCount}
          accent="emerald"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
          label="Ср. на точку"
          value={stats.avg.toFixed(1)}
          accent="amber"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
          label="Макс. точка"
          value={stats.maxPoint?.count ?? 0}
          subtitle={stats.maxPoint?.address}
          accent="red"
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-col xl:flex-row gap-5 flex-1">
        {/* Map area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map(cat => {
                const isActive = activeCategories.has(cat.key)
                return (
                  <button
                    key={cat.key}
                    onClick={() => toggleCategory(cat.key)}
                    className={`
                      flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium 
                      transition-all duration-200 border cursor-pointer
                      ${isActive
                        ? `${cat.bgClass} ${cat.borderClass} ${cat.textClass} shadow-sm`
                        : 'bg-white/60 border-slate-200/60 text-slate-400 hover:bg-slate-50'
                      }
                    `}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? cat.dotClass : 'bg-slate-300'}`} />
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Time period */}
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-1 shadow-sm">
              <Calendar className="w-4 h-4 text-slate-400 ml-2 mr-1 shrink-0" />
              {timePeriods.map(tp => (
                <button
                  key={tp.key}
                  onClick={() => setTimePeriod(tp.key)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap
                    ${timePeriod === tp.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  {tp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Card */}
          <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-sm rounded-2xl bg-white/90 backdrop-blur-md min-h-[500px]">
            <CardContent className="p-0 flex-1 relative z-0">
              {isMounted && (
                <MapContainer
                  center={[56.1340, 47.2500]}
                  zoom={13}
                  style={{ height: '100%', width: '100%', minHeight: '500px' }}
                  className="z-0 rounded-2xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  <HeatLayer points={heatPoints} />
                </MapContainer>
              )}
              {/* Legend overlay */}
              <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-100/80">
                <p className="text-xs font-semibold text-slate-600 mb-2">Плотность обращений</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Низкая</span>
                  <div className="w-28 h-2.5 rounded-full" style={{
                    background: 'linear-gradient(to right, #3b82f6, #06b6d4, #f59e0b, #f97316, #ef4444)'
                  }} />
                  <span className="text-[11px] text-slate-400">Высокая</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side stats panel */}
        <div className="xl:w-72 flex flex-col gap-4">
          {/* Category breakdown */}
          <Card className="border-0 shadow-sm rounded-2xl bg-white/90 backdrop-blur-md overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100/50">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                По категориям
              </h3>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <AnimatePresence mode="popLayout">
                  {stats.byCat
                    .sort((a, b) => b.count - a.count)
                    .map(cat => (
                    <motion.div
                      key={cat.key}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${cat.dotClass}`} />
                          <span className="text-sm font-medium text-slate-700">{cat.label}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{cat.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                          initial={{ width: 0 }}
                          animate={{ width: stats.total > 0 ? `${(cat.count / stats.total) * 100}%` : '0%' }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Top addresses */}
          <Card className="border-0 shadow-sm rounded-2xl bg-white/90 backdrop-blur-md overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-slate-100/50">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Топ-5 адресов
              </h3>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2.5">
                <AnimatePresence mode="popLayout">
                  {stats.topAddresses.map((point, i) => {
                    const cat = categories.find(c => c.key === point.category)
                    return (
                      <motion.div
                        key={point.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors"
                      >
                        <span className={`
                          w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                          ${i === 0 ? 'bg-red-100 text-red-700' : i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}
                        `}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{point.address}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cat?.dotClass ?? 'bg-slate-300'}`} />
                            <span className="text-xs text-slate-500">{point.category}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-900 shrink-0">{point.count}</span>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

/* Stat Card mini component */
function StatCard({ icon, label, value, subtitle, accent }: {
  icon: React.ReactNode
  label: string
  value: string | number
  subtitle?: string
  accent: string
}) {
  const bgMap: Record<string, string> = {
    blue: 'from-blue-50 to-blue-100/50',
    emerald: 'from-emerald-50 to-emerald-100/50',
    amber: 'from-amber-50 to-amber-100/50',
    red: 'from-red-50 to-red-100/50',
  }
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${bgMap[accent]} shrink-0`}>
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-500 truncate">{label}</p>
              <p className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">{value}</p>
              {subtitle && <p className="text-[11px] text-slate-400 truncate mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
