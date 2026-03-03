import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertCircle, CheckCircle2, Clock, XCircle, MapPin, User } from "lucide-react"
import { motion } from "motion/react"

const MOCK_APPEALS = [
  {
    id: "1",
    status: "Новое",
    category: "ЖКХ",
    subcategory: "Отопление",
    address: "ул. Ленина, д. 15",
    date: "12.10.2023 14:30",
    author: "Иванов И.И.",
    text: "Нет отопления в 3 подъезде уже второй день.",
    tags: ["Срочно", "Требует проверки"],
    duplicate: false
  },
  {
    id: "2",
    status: "В работе",
    category: "Дороги",
    subcategory: "Ямы",
    address: "пр. Тракторостроителей, д. 45",
    date: "11.10.2023 09:15",
    author: "Петров А.С.",
    text: "Огромная яма на дороге, пробил колесо.",
    tags: ["Передано в департамент"],
    duplicate: false
  },
  {
    id: "3",
    status: "Новое",
    category: "ЖКХ",
    subcategory: "Отопление",
    address: "ул. Ленина, д. 15",
    date: "12.10.2023 15:00",
    author: "Смирнова А.В.",
    text: "Холодные батареи во всем доме.",
    tags: ["Дубликат"],
    duplicate: true
  },
  {
    id: "4",
    status: "Решено",
    category: "Благоустройство",
    subcategory: "Озеленение",
    address: "Парк Победы",
    date: "10.10.2023 11:20",
    author: "Аноним",
    text: "Упало дерево на пешеходную дорожку.",
    tags: [],
    duplicate: false
  },
  {
    id: "5",
    status: "Отклонено",
    category: "Транспорт",
    subcategory: "Расписание",
    address: "Остановка 'Центральный рынок'",
    date: "09.10.2023 08:45",
    author: "Сидоров В.К.",
    text: "Автобус №15 не пришел по расписанию.",
    tags: [],
    duplicate: false
  },
  {
    id: "6",
    status: "В работе",
    category: "ЖКХ",
    subcategory: "Водоснабжение",
    address: "ул. Гагарина, д. 22",
    date: "13.10.2023 10:10",
    author: "Козлова М.И.",
    text: "Прорвало трубу в подвале, вода течет на улицу.",
    tags: ["Срочно", "Передано в департамент"],
    duplicate: false
  },
  {
    id: "7",
    status: "Новое",
    category: "Дороги",
    subcategory: "Светофоры",
    address: "Перекресток Мира и Строителей",
    date: "13.10.2023 16:20",
    author: "Аноним",
    text: "Не работает светофор, собирается пробка.",
    tags: ["Требует проверки"],
    duplicate: false
  },
  {
    id: "8",
    status: "Решено",
    category: "Благоустройство",
    subcategory: "Детские площадки",
    address: "ул. Солнечная, д. 5",
    date: "08.10.2023 14:00",
    author: "Николаева Е.А.",
    text: "Сломаны качели на детской площадке.",
    tags: [],
    duplicate: false
  },
  {
    id: "9",
    status: "В работе",
    category: "ЖКХ",
    subcategory: "Уборка двора",
    address: "пр. Московский, д. 10",
    date: "12.10.2023 09:30",
    author: "Васильев П.Р.",
    text: "Двор не убирают уже неделю, мусорные баки переполнены.",
    tags: ["Передано в департамент"],
    duplicate: false
  },
  {
    id: "10",
    status: "Новое",
    category: "Дороги",
    subcategory: "Разметка",
    address: "ул. Калинина, д. 40",
    date: "14.10.2023 11:15",
    author: "Морозов Д.С.",
    text: "Стерлась пешеходная разметка возле школы.",
    tags: ["Срочно"],
    duplicate: false
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Новое": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 shadow-sm"><AlertCircle className="w-3 h-3 mr-1"/> Новое</Badge>
    case "В работе": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 shadow-sm"><Clock className="w-3 h-3 mr-1"/> В работе</Badge>
    case "Решено": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 shadow-sm"><CheckCircle2 className="w-3 h-3 mr-1"/> Решено</Badge>
    case "Отклонено": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0 shadow-sm"><XCircle className="w-3 h-3 mr-1"/> Отклонено</Badge>
    default: return <Badge>{status}</Badge>
  }
}

export default function AppealsList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Обращения граждан</h1>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input 
                  placeholder="Поиск по обращениям, авторам, комментариям..." 
                  className="pl-11 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 shrink-0">
                <Select className="w-40 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white">
                  <option value="">Все статусы</option>
                  <option value="new">Новое</option>
                  <option value="in_progress">В работе</option>
                  <option value="resolved">Решено</option>
                  <option value="rejected">Отклонено</option>
                </Select>
                <Select className="w-40 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white">
                  <option value="">Все категории</option>
                  <option value="gkh">ЖКХ</option>
                  <option value="roads">Дороги</option>
                </Select>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-slate-500 mr-2 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Фильтры по тегам:
              </span>
              <Badge variant="outline" className="cursor-pointer hover:bg-red-50 border-red-200 text-red-700 rounded-lg py-1 transition-colors">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span> Срочно
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-50 border-amber-200 text-amber-700 rounded-lg py-1 transition-colors">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span> Требует проверки
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 border-blue-200 text-blue-700 rounded-lg py-1 transition-colors">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span> Передано в департамент
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 border-slate-300 text-slate-700 rounded-lg py-1 transition-colors">
                <span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span> Дубликат
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* List */}
      <div className="space-y-4">
        {MOCK_APPEALS.map((appeal, index) => (
          <motion.div
            key={appeal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.01, y: -2 }}
          >
            <Card 
              className="border-0 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm group relative overflow-hidden rounded-2xl"
              onClick={() => navigate(`/crm/appeals/${appeal.id}`)}
            >
              {/* Status Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2 ${
                appeal.status === 'Новое' ? 'bg-gradient-to-b from-blue-400 to-blue-600' :
                appeal.status === 'В работе' ? 'bg-gradient-to-b from-amber-400 to-amber-600' :
                appeal.status === 'Решено' ? 'bg-gradient-to-b from-emerald-400 to-emerald-600' : 'bg-gradient-to-b from-red-400 to-red-600'
              }`} />
              
              {/* Subtle background glow on hover */}
              <div className={`absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none -mr-20 -mt-20 ${
                appeal.status === 'Новое' ? 'bg-blue-500' :
                appeal.status === 'В работе' ? 'bg-amber-500' :
                appeal.status === 'Решено' ? 'bg-emerald-500' : 'bg-red-500'
              }`}></div>

              <CardContent className="p-5 sm:p-6 pl-6 sm:pl-8 relative z-10">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">#{appeal.id}</span>
                      {getStatusBadge(appeal.status)}
                      <Badge variant="secondary" className="bg-slate-100/80 text-slate-700 hover:bg-slate-200 border-0">{appeal.category}</Badge>
                      <span className="text-sm text-slate-300">•</span>
                      <span className="text-sm text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {appeal.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {appeal.text}
                    </h3>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <MapPin className="w-4 h-4 text-slate-400" /> {appeal.address}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <User className="w-4 h-4 text-slate-400" /> {appeal.author}
                      </span>
                    </div>
                    {appeal.tags.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {appeal.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs rounded-md border-slate-200 text-slate-600 bg-white shadow-sm">
                            {tag === "Дубликат" && <AlertCircle className="w-3 h-3 mr-1.5 text-red-500" />}
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
