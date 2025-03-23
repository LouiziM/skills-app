"use client"

import { useState, useMemo, useCallback } from "react"
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay, addMonths, addWeeks, subMonths, subWeeks, startOfToday } from "date-fns"
import { fr } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, Clock, CheckCircle } from "lucide-react"

import type { Training } from "./types"
import { renderTrainingCardWithActions, getUniqueColor } from "./utils"

// Configure localizer
const locales = { fr }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
  getDay,
  locales,
})

interface TrainingCalendarProps {
  trainings: Training[]
  onViewDetails: (training: Training) => void
  onEditTraining?: (training: Training) => void
  onDeleteTraining?: (training: Training) => void
  onToggleVisibility?: (training: Training) => void
  isManagerOrHR?: boolean
}

export const TrainingCalendar = ({
  trainings,
  onViewDetails,
  onEditTraining,
  onDeleteTraining,
  onToggleVisibility,
  isManagerOrHR = false,
}: TrainingCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(startOfToday())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTrainings, setSelectedTrainings] = useState<Training[]>([])
  const [viewType, setViewType] = useState<"month" | "week">("month")

  // Memoized calendar events
  const calendarEvents = useMemo(
    () =>
      trainings.map((training) => ({
        id: training.id,
        title: training.title,
        start: new Date(training.startDate),
        end: new Date(training.endDate),
        resource: training,
        color: getUniqueColor(training.id, training.type, training.hidden),
      })),
    [trainings],
  )

  // Handle date selection
  const handleSelectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date)
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const filtered = trainings.filter((t) => {
        const start = new Date(t.startDate)
        const end = new Date(t.endDate)
        return start <= dayEnd && end >= dayStart
      })

      setSelectedTrainings(filtered)
    },
    [trainings],
  )

  // Navigation logic
  const handleNavigate = useCallback((newDate: Date, view?: "month" | "week") => {
    setCurrentDate(newDate)
    if (view) setViewType(view)
  }, [])

  // Custom toolbar component
  const Toolbar = ({ onNavigate, date }: { onNavigate: (date: Date) => void; date: Date }) => {
    const handleNavigation = (action: "prev" | "next" | "today") => {
      let newDate = date
      switch (action) {
        case "prev":
          newDate = viewType === "month" ? subMonths(date, 1) : subWeeks(date, 1)
          break
        case "next":
          newDate = viewType === "month" ? addMonths(date, 1) : addWeeks(date, 1)
          break
        case "today":
          newDate = startOfToday()
          break
      }
      onNavigate(newDate)
    }

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <div className="flex gap-2">
          <Button
            variant={viewType === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => handleNavigate(currentDate, "month")}
          >
            Mois
          </Button>
          <Button
            variant={viewType === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => handleNavigate(currentDate, "week")}
          >
            Semaine
          </Button>
        </div>

        <div className="text-lg font-semibold">{format(date, "MMMM yyyy", { locale: fr })}</div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleNavigation("prev")}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleNavigation("today")}>
            Aujourd'hui
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleNavigation("next")}>
            Suivant <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  // Custom event component
  const Event = ({ event }: { event: any }) => {
    const training = event.resource as Training
    const statusIcon = {
      planifié: <CalendarIcon className="h-4 w-4 mr-1" />,
      "en cours": <Clock className="h-4 w-4 mr-1" />,
      terminé: <CheckCircle className="h-4 w-4 mr-1" />,
    }[training.status.toLowerCase()]

    return (
      <div
        className={`truncate px-1 py-0.5 text-xs font-medium rounded flex items-center ${
          training.hidden ? "border border-gray-400 bg-white/70 text-gray-700" : "text-white"
        }`}
        style={{ backgroundColor: training.hidden ? "transparent" : event.color }}
      >
        {statusIcon}
        {training.title}
      </div>
    )
  }

  // Update the renderTrainingCard method to use the shared function and pass isManagerOrHR
  const renderTrainingCard = (training: Training) => {
    return renderTrainingCardWithActions(
      training,
      onViewDetails,
      isManagerOrHR ? onEditTraining : undefined,
      isManagerOrHR ? onDeleteTraining : undefined,
      isManagerOrHR ? onToggleVisibility : undefined,
      isManagerOrHR,
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:max-w-[1162px] xl:mx-auto xl:gap-4">
      <Card className="xl:col-span-2 shadow-lg pt-6 w-full bg-white">
        <CardContent>
          <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            date={currentDate}
            view={viewType}
            onView={(view) => setViewType(view)}
            onNavigate={handleNavigate}
            components={{
              toolbar: (props) => <Toolbar onNavigate={(date) => handleNavigate(date)} date={currentDate} />,
              event: Event,
            }}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectEvent={(event) => onViewDetails(event.resource)}
            onSelectSlot={({ start }) => handleSelectDate(start)}
            style={{ height: "80vh" }}
            messages={{
              today: "Aujourd'hui",
              previous: "Précédent",
              next: "Suivant",
              month: "Mois",
              week: "Semaine",
              noEventsInRange: "Aucune formation pour cette période",
              showMore: (total) => `+${total} autres`,
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
                borderColor: event.resource.hidden ? "#666" : "transparent",
              },
            })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-lg w-full bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {selectedDate
              ? `Formations du ${format(selectedDate, "dd MMMM yyyy", { locale: fr })}`
              : "Sélectionnez une date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh]">
            {selectedTrainings.length > 0 ? (
              selectedTrainings.map((training) => renderTrainingCard(training))
            ) : (
              <div className="text-center text-gray-500 p-4">
                {selectedDate ? "Aucune formation à cette date" : "Sélectionnez une date pour voir les formations"}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

