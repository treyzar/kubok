import { useEffect, useMemo, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapPin, Flame, TrendingUp, AlertTriangle, Calendar, BarChart3 } from "lucide-react"
import 'leaflet/dist/leaflet.css'
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react"
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

const categories: { key: Category; label: string; color: string; bgClass: string; borderClass: string; textClass: string; dotClass: string; shadowClass: string; glowColor: string }[] = [
  { key: 'ЖКХ', label: 'ЖКХ', color: '#ef4444', bgClass: 'bg-red-50', borderClass: 'border-red-200', textClass: 'text-red-700', dotClass: 'bg-red-500', shadowClass: 'hover:shadow-red-500/10', glowColor: 'bg-red-400' },
  { key: 'Дороги', label: 'Дороги', color: '#f59e0b', bgClass: 'bg-amber-50', borderClass: 'border-amber-200', textClass: 'text-amber-700', dotClass: 'bg-amber-500', shadowClass: 'hover:shadow-amber-500/10', glowColor: 'bg-amber-400' },
  { key: 'Благоустройство', label: 'Благоустройство', color: '#10b981', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-200', textClass: 'text-emerald-700', dotClass: 'bg-emerald-500', shadowClass: 'hover:shadow-emerald-500/10', glowColor: 'bg-emerald-400' },
  { key: 'Транспорт', label: 'Транспорт', color: '#3b82f6', bgClass: 'bg-blue-50', borderClass: 'border-blue-200', textClass: 'text-blue-700', dotClass: 'bg-blue-500', shadowClass: 'hover:shadow-blue-500/10', glowColor: 'bg-blue-400' },
]

const timePeriods: { key: TimePeriod; label: string }[] = [
  { key: 'week', label: 'Неделя' },
  { key: 'month', label: 'Месяц' },
  { key: 'quarter', label: 'Квартал' },
  { key: 'year', label: 'Год' },
]

function getDateThreshold(period: TimePeriod): Date {
  const now = new Date(2026, 2, 2)
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

/* Animated counter component */
function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )
  const [display, setDisplay] = useState(decimals > 0 ? "0.0" : "0")

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    const unsub = rounded.on("change", (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [value, motionVal, rounded])

  return <>{display}</>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col relative z-10"
      style={{ minHeight: 'calc(100vh - 140px)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5"
      >
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight flex items-center gap-2">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-100/50"
          >
            <MapPin className="w-6 h-6 text-blue-600" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Тепловая карта обращений
          </motion.span>
        </h1>
      </motion.div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { icon: <BarChart3 className="w-5 h-5 text-blue-600" />, label: "Всего обращений", value: stats.total, accent: "blue", decimals: 0 },
          { icon: <MapPin className="w-5 h-5 text-emerald-600" />, label: "Точек на карте", value: stats.pointCount, accent: "emerald", decimals: 0 },
          { icon: <TrendingUp className="w-5 h-5 text-amber-600" />, label: "Ср. на точку", value: stats.avg, accent: "amber", decimals: 1 },
          { icon: <AlertTriangle className="w-5 h-5 text-red-600" />, label: "Макс. точка", value: stats.maxPoint?.count ?? 0, accent: "red", decimals: 0, subtitle: stats.maxPoint?.address },
        ].map((card, i) => (
          <StatCard key={card.label} index={i} {...card} />
        ))}
      </div>

      {/* Main content area */}
      <div className="flex flex-col xl:flex-row gap-5 flex-1">
        {/* Map area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Filters bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map((cat, i) => {
                const isActive = activeCategories.has(cat.key)
                return (
                  <motion.button
                    key={cat.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCategory(cat.key)}
                    className={`
                      flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium 
                      transition-all duration-200 border cursor-pointer relative overflow-hidden
                      ${isActive
                        ? `${cat.bgClass} ${cat.borderClass} ${cat.textClass} shadow-sm`
                        : 'bg-white/60 border-slate-200/60 text-slate-400 hover:bg-slate-50'
                      }
                    `}
                  >
                    {/* Active glow background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.15, scale: 2 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute inset-0 ${cat.glowColor} rounded-xl pointer-events-none`}
                          style={{ filter: 'blur(20px)' }}
                        />
                      )}
                    </AnimatePresence>
                    <motion.span
                      animate={{
                        scale: isActive ? [1, 1.4, 1] : 1,
                        backgroundColor: isActive ? cat.color : '#cbd5e1',
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-2.5 h-2.5 rounded-full relative z-10"
                      style={{ backgroundColor: isActive ? cat.color : '#cbd5e1' }}
                    />
                    <span className="relative z-10">{cat.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Time period */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-1 shadow-sm relative"
            >
              <Calendar className="w-4 h-4 text-slate-400 ml-2 mr-1 shrink-0" />
              {timePeriods.map(tp => (
                <button
                  key={tp.key}
                  onClick={() => setTimePeriod(tp.key)}
                  className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap z-10"
                  style={{ color: timePeriod === tp.key ? '#fff' : '#64748b' }}
                >
                  {timePeriod === tp.key && (
                    <motion.div
                      layoutId="timePeriodIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tp.label}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Card className="h-full flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 rounded-2xl bg-white/90 backdrop-blur-md min-h-[500px] relative group">
              {/* Subtle top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 opacity-80" />
              <CardContent className="p-0 flex-1 relative z-0">
                <AnimatePresence mode="wait">
                  {isMounted && (
                    <motion.div
                      key={`${timePeriod}-${Array.from(activeCategories).join(',')}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <MapContainer
                        center={[56.1340, 47.2500]}
                        zoom={13}
                        style={{ height: '100%', width: '100%', minHeight: '500px' }}
                        className="z-0 rounded-b-2xl"
                        attributionControl={false}
                        zoomControl={true}
                      >
                        <TileLayer
                          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                        <HeatLayer points={heatPoints} />
                      </MapContainer>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Points counter overlay */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-slate-100/80"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      <AnimatedNumber value={stats.pointCount} /> точек
                    </span>
                  </div>
                </motion.div>

                {/* Legend overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-100/80"
                >
                  <p className="text-xs font-semibold text-slate-600 mb-2">Плотность обращений</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Низкая</span>
                    <div className="w-28 h-2.5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
                        style={{
                          background: 'linear-gradient(to right, #3b82f6, #06b6d4, #f59e0b, #f97316, #ef4444)',
                          transformOrigin: 'left',
                        }}
                        className="absolute inset-0 rounded-full"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400">Высокая</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Side stats panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="xl:w-72 flex flex-col gap-4"
        >
          {/* Category breakdown */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-md overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100/50">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 1, repeat: 0 }}
                  >
                    <Flame className="w-4 h-4 text-orange-500" />
                  </motion.div>
                  По категориям
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {stats.byCat
                      .sort((a, b) => b.count - a.count)
                      .map((cat, i) => (
                      <motion.div
                        key={cat.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ delay: i * 0.06, type: "spring", stiffness: 250, damping: 25 }}
                        className="flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                              className={`w-2.5 h-2.5 rounded-full ${cat.dotClass}`}
                            />
                            <span className="text-sm font-medium text-slate-700">{cat.label}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            <AnimatedNumber value={cat.count} />
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: cat.color }}
                            initial={{ width: 0 }}
                            animate={{ width: stats.total > 0 ? `${(cat.count / stats.total) * 100}%` : '0%' }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 + i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top addresses */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-md overflow-hidden flex-1">
              <div className="px-5 py-4 border-b border-slate-100/50">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </motion.div>
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
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{
                            delay: 0.7 + i * 0.08,
                            type: "spring",
                            stiffness: 250,
                            damping: 25,
                          }}
                          whileHover={{
                            x: 4,
                            backgroundColor: "rgba(248, 250, 252, 0.8)",
                            transition: { duration: 0.2 },
                          }}
                          className="flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-default"
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
                            className={`
                              w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                              ${i === 0 ? 'bg-red-100 text-red-700' : i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}
                            `}
                          >
                            {i + 1}
                          </motion.span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{point.address}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${cat?.dotClass ?? 'bg-slate-300'}`} />
                              <span className="text-xs text-slate-500">{point.category}</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-slate-900 shrink-0">
                            <AnimatedNumber value={point.count} />
                          </span>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* Stat Card mini component */
function StatCard({ icon, label, value, subtitle, accent, index, decimals = 0 }: {
  icon: React.ReactNode
  label: string
  value: number
  subtitle?: string
  accent: string
  index: number
  decimals?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const bgMap: Record<string, string> = {
    blue: 'from-blue-50 to-blue-100/50',
    emerald: 'from-emerald-50 to-emerald-100/50',
    amber: 'from-amber-50 to-amber-100/50',
    red: 'from-red-50 to-red-100/50',
  }
  const glowMap: Record<string, string> = {
    blue: 'bg-blue-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    red: 'bg-red-400',
  }
  const shadowMap: Record<string, string> = {
    blue: 'hover:shadow-blue-500/10',
    emerald: 'hover:shadow-emerald-500/10',
    amber: 'hover:shadow-amber-500/10',
    red: 'hover:shadow-red-500/10',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.1 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ y: -5 }}
    >
      <Card className={`border-0 shadow-sm hover:shadow-xl ${shadowMap[accent]} transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden relative group`}>
        {/* Hover glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${glowMap[accent]} opacity-0 group-hover:opacity-10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity duration-500 pointer-events-none`} />
        <CardContent className="p-4 relative z-10">
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.25 + index * 0.1, type: "spring", stiffness: 300, damping: 15 }}
              className={`p-2.5 rounded-xl bg-gradient-to-br ${bgMap[accent]} shrink-0`}
            >
              {icon}
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-500 truncate">{label}</p>
              <p className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                <AnimatedNumber value={value} decimals={decimals} />
              </p>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-[11px] text-slate-400 truncate mt-0.5"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
