import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { MapPin, Filter, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import 'leaflet/dist/leaflet.css'
import { motion } from "motion/react"

// Mock data for heatmap points
const points = [
  { id: 1, lat: 56.1322, lng: 47.2518, category: 'ЖКХ', intensity: 0.8, address: "ул. Мира, 12" },
  { id: 2, lat: 56.1422, lng: 47.2418, category: 'Дороги', intensity: 0.5, address: "пр. Ленина, 45" },
  { id: 3, lat: 56.1222, lng: 47.2618, category: 'Благоустройство', intensity: 0.3, address: "ул. Гагарина, 8" },
  { id: 4, lat: 56.1352, lng: 47.2558, category: 'ЖКХ', intensity: 0.9, address: "ул. Николаева, 21" },
  { id: 5, lat: 56.1382, lng: 47.2458, category: 'Транспорт', intensity: 0.6, address: "Московский пр., 15" },
  { id: 6, lat: 56.1300, lng: 47.2600, category: 'ЖКХ', intensity: 0.7, address: "ул. Калинина, 10" },
  { id: 7, lat: 56.1450, lng: 47.2300, category: 'Дороги', intensity: 0.9, address: "ул. Энгельса, 2" },
  { id: 8, lat: 56.1250, lng: 47.2700, category: 'Благоустройство', intensity: 0.4, address: "Парк Победы" },
  { id: 9, lat: 56.1370, lng: 47.2500, category: 'Транспорт', intensity: 0.8, address: "Остановка 'Дом Мод'" },
  { id: 10, lat: 56.1400, lng: 47.2400, category: 'ЖКХ', intensity: 0.5, address: "ул. К. Маркса, 31" },
  { id: 11, lat: 56.1330, lng: 47.2580, category: 'Дороги', intensity: 0.2, address: "ул. Ярославская, 17" },
  { id: 12, lat: 56.1280, lng: 47.2650, category: 'Благоустройство', intensity: 0.6, address: "Сквер Чапаева" },
  { id: 13, lat: 56.1480, lng: 47.2250, category: 'ЖКХ', intensity: 0.9, address: "ул. Афанасьева, 9" },
  { id: 14, lat: 56.1200, lng: 47.2750, category: 'Транспорт', intensity: 0.4, address: "Автовокзал" },
  { id: 15, lat: 56.1390, lng: 47.2480, category: 'Дороги', intensity: 0.7, address: "Президентский бульвар" },
]

const getColor = (intensity: number) => {
  if (intensity > 0.7) return '#ef4444' // red
  if (intensity > 0.4) return '#f59e0b' // yellow
  return '#3b82f6' // blue
}

export default function Heatmap() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-100/50">
            <MapPin className="w-6 h-6 text-blue-600 animate-pulse-soft" />
          </div>
          Тепловая карта обращений
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-white/60 text-slate-700 hover:bg-white shadow-sm rounded-xl h-10 transition-all">
            <Filter className="w-4 h-4 mr-2" /> Фильтры
          </Button>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-white/60 text-slate-700 hover:bg-white shadow-sm rounded-xl h-10 transition-all">
            <Layers className="w-4 h-4 mr-2" /> Слои
          </Button>
        </div>
      </div>

      <motion.div className="flex-1 min-h-[600px] flex flex-col" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-md relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 z-10 py-4 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg text-slate-800">г. Чебоксары</CardTitle>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-100/50 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-sm shadow-red-200"></span> 
                  <span>Высокая плотность</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm shadow-amber-200"></span> 
                  <span>Средняя</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-sm shadow-blue-200"></span> 
                  <span>Низкая</span>
                </div>
              </div>
            </div>
          </CardHeader>
        <CardContent className="p-0 flex-1 relative z-0">
          {isMounted && (
            <MapContainer 
              center={[56.1322, 47.2518]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {points.map(point => (
                <CircleMarker
                  key={point.id}
                  center={[point.lat, point.lng]}
                  radius={point.intensity * 25}
                  fillColor={getColor(point.intensity)}
                  color={getColor(point.intensity)}
                  weight={2}
                  opacity={0.9}
                  fillOpacity={0.5}
                >
                  <Popup className="rounded-xl overflow-hidden shadow-lg border-0">
                    <div className="p-1">
                      <div className="font-semibold text-slate-900 mb-1 border-b border-slate-100 pb-2">{point.address}</div>
                      <div className="text-sm text-slate-600 mt-2 flex flex-col gap-1">
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-400">Категория:</span>
                          <span className="font-medium text-slate-800">{point.category}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-400">Интенсивность:</span>
                          <span className="font-medium text-slate-800">{Math.round(point.intensity * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          )}
        </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
