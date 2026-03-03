import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  FileText, 
  Paperclip, 
  Send, 
  AlertTriangle,
  Link as LinkIcon,
  Trash2,
  EyeOff,
  Sparkles,
  XCircle
} from "lucide-react"
import { motion } from "motion/react"

export default function AppealDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState("")

  // Mock data for the appeal
  const appeal = {
    id: id || "10234",
    status: "Новое",
    incomingNumber: "ВХ-2023-10-12-001",
    outgoingNumber: "-",
    source: "Государственный портал",
    category: "ЖКХ",
    subcategory: "Отопление",
    address: "г. Чебоксары, ул. Ленина, д. 15",
    date: "12.10.2023 14:30",
    author: "Иванов Иван Иванович",
    phone: "+7 (999) 123-45-67",
    email: "ivanov@example.com",
    text: "Нет отопления в 3 подъезде уже второй день. Звонили в УК, никто не берет трубку. Прошу разобраться в ситуации, дома маленькие дети.",
    tags: ["Срочно", "Требует проверки"],
    files: ["photo1.jpg", "photo2.jpg"],
    history: [
      { date: "12.10.2023 14:30", action: "Обращение зарегистрировано", user: "Система" },
      { date: "12.10.2023 14:45", action: "Назначен статус 'Новое'", user: "Система" },
    ],
    comments: [
      { author: "Петров А.С. (Администратор)", text: "Необходимо направить инспектора по адресу.", date: "12.10.2023 15:00" }
    ],
    duplicates: [
      { id: "10235", text: "Холодные батареи во всем доме", similarity: "95%" }
    ]
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/60">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/crm/appeals')} className="rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Обращение #{appeal.id}</h1>
            <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 border-0 px-3 py-1 text-sm shadow-sm">{appeal.status}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-600 border-slate-200 hover:bg-slate-50 rounded-xl transition-all">
            <EyeOff className="w-4 h-4 mr-2" /> Скрыть
          </Button>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all">
            <Trash2 className="w-4 h-4 mr-2" /> Удалить
          </Button>
        </div>
      </div>

      {/* Duplicate Warning */}
      {appeal.duplicates.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start shadow-sm">
          <div className="p-2 bg-amber-100 rounded-full mr-4 shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-amber-900">Обнаружены возможные дубликаты</h3>
            <div className="mt-2 text-sm text-amber-800">
              Система ИИ нашла похожие обращения. Вы можете объединить их.
              <ul className="mt-3 space-y-2">
                {appeal.duplicates.map(dup => (
                  <li key={dup.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
                    <span className="truncate max-w-md font-medium">#{dup.id} — <span className="text-slate-600 font-normal">{dup.text}</span></span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Совпадение {dup.similarity}
                      </Badge>
                      <Button size="sm" variant="secondary" className="h-8 text-xs rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border-0">
                        <LinkIcon className="w-3 h-3 mr-1.5" /> Объединить
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
              <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 pb-4">
                <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" /> Информация об обращении
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8 relative z-10">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                  <div>
                    <span className="text-slate-400 block mb-1 text-xs uppercase tracking-wider font-semibold">Источник</span>
                    <span className="font-medium text-slate-900">{appeal.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1 text-xs uppercase tracking-wider font-semibold">Дата поступления</span>
                    <span className="font-medium text-slate-900">{appeal.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1 text-xs uppercase tracking-wider font-semibold">Входящий номер</span>
                    <span className="font-medium text-slate-900">{appeal.incomingNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1 text-xs uppercase tracking-wider font-semibold">Исходящий номер</span>
                    <span className="font-medium text-slate-900">{appeal.outgoingNumber}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100/50 pt-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Текст обращения</h4>
                  <p className="text-slate-700 bg-slate-50/50 p-5 rounded-xl whitespace-pre-wrap leading-relaxed border border-slate-100/50 shadow-inner">
                    {appeal.text}
                  </p>
                </div>

                {appeal.files.length > 0 && (
                  <div className="border-t border-slate-100/50 pt-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Приложенные файлы</h4>
                    <div className="flex gap-3">
                      {appeal.files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2.5 rounded-xl text-sm cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all font-medium shadow-sm border border-blue-100/50">
                          <Paperclip className="w-4 h-4" /> {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Comments Section */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 pb-4">
                <CardTitle className="text-lg text-slate-800">Комментарии и работа</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  {appeal.comments.map((c, idx) => (
                    <div key={idx} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm text-slate-900">{c.author}</span>
                        <span className="text-xs text-slate-400 font-medium">{c.date}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-slate-100/50 pt-6">
                  <Textarea 
                    placeholder="Написать комментарий..." 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-3 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white resize-none min-h-[100px] transition-all focus:ring-blue-500/20"
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" className="rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                      <Paperclip className="w-4 h-4 mr-2" /> Прикрепить файл
                    </Button>
                    <Button size="sm" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all">
                      <Send className="w-4 h-4 mr-2" /> Отправить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Assistant (Bonus) */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-lg shadow-indigo-500/10 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/90 relative overflow-hidden backdrop-blur-md border border-indigo-100/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -mr-20 -mt-20 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-20 -mb-20 animate-blob animation-delay-2000"></div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-indigo-900 flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
                    <Sparkles className="w-4 h-4 text-white animate-pulse-soft" />
                  </div>
                  Помощник формирования ответа
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 relative z-10">
                <p className="text-sm text-indigo-900/80 mb-5 leading-relaxed font-medium">
                  Сгенерировать официальный ответ на основе шаблона и текста обращения. ИИ учтет все детали и подготовит документ.
                </p>
                <Button className="w-full bg-white/80 backdrop-blur-sm text-indigo-700 hover:bg-white border border-indigo-200 shadow-sm hover:shadow-md rounded-xl h-12 transition-all font-semibold">
                  Сгенерировать черновик ответа (Word)
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Controls */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 pb-4">
                <CardTitle className="text-lg text-slate-800">Управление</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-slate-700">Статус</label>
                  <Select defaultValue="new" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-colors">
                    <option value="new">Новое</option>
                    <option value="in_progress">В работе</option>
                    <option value="resolved">Решено</option>
                    <option value="rejected">Отклонено</option>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-slate-700">Передать подразделению</label>
                  <Select defaultValue="" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-colors">
                    <option value="" disabled>Выберите подразделение</option>
                    <option value="gkh">Управление ЖКХ</option>
                    <option value="roads">Управление дорог</option>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-slate-700">Внутренние теги</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {appeal.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1.5 bg-slate-100/80 text-slate-700 hover:bg-slate-200 rounded-lg py-1 px-2.5 border border-slate-200/50 shadow-sm">
                        {tag} <XCircle className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 transition-colors" />
                      </Badge>
                    ))}
                  </div>
                  <Select defaultValue="" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-colors">
                    <option value="" disabled>Добавить тег</option>
                    <option value="urgent">Срочно</option>
                    <option value="check">Требует проверки</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sender Info */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 pb-4">
                <CardTitle className="text-lg text-slate-800">Отправитель</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-full text-blue-600 shadow-sm border border-blue-100/50">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{appeal.author}</p>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-0.5">Заявитель</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm bg-slate-50/80 p-4 rounded-xl border border-slate-100/50 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="w-4 h-4 text-slate-400" /> <span className="font-medium">{appeal.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="w-4 h-4 text-slate-400" /> <span className="font-medium">{appeal.email}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-700 pt-3 mt-3 border-t border-slate-200/60">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" /> 
                    <span className="font-medium leading-tight">{appeal.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* History */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100/50 pb-4">
                <CardTitle className="text-lg text-slate-800">История</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-200 before:to-transparent">
                  {appeal.history.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-slate-200 group-[.is-active]:bg-gradient-to-br group-[.is-active]:from-blue-400 group-[.is-active]:to-indigo-500 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-slate-100/50 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between space-x-2 mb-1.5">
                          <div className="font-semibold text-slate-900 text-xs">{item.action}</div>
                          <time className="text-xs font-medium text-slate-400">{item.date.split(' ')[1]}</time>
                        </div>
                        <div className="text-slate-500 text-xs">{item.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
