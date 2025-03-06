import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Bell, Calendar, ClipboardCheck, Info, CheckCircle2, Clock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Données d'exemple
const notifications = [
  {
    id: 1,
    title: "Nouvelle Évaluation Assignée",
    message: "Vous avez été assigné à une nouvelle évaluation pour John Doe (EMP001).",
    type: "Évaluation",
    date: "2023-06-15 09:30",
    status: "Non lu",
    priority: "Élevée",
    icon: ClipboardCheck
  },
  {
    id: 2,
    title: "Rappel de Session de Formation",
    message: "Rappel : La formation 'Service Client Avancé' commence demain à 9h00.",
    type: "Formation",
    date: "2023-06-14 14:15",
    status: "Non lu",
    priority: "Moyenne",
    icon: Calendar
  },
  {
    id: 3,
    title: "Feedback d'Évaluation Requis",
    message: "Veuillez fournir un feedback pour la formation 'Fondamentaux du Support Technique' que vous avez terminée.",
    type: "Évaluation",
    date: "2023-06-13 11:45",
    status: "Non lu",
    priority: "Moyenne",
    icon: ClipboardCheck
  },
  {
    id: 4,
    title: "Mise à Jour des Compétences",
    message: "Votre compétence 'Service Client' a été mise à jour au Niveau 4.",
    type: "Général",
    date: "2023-06-12 15:20",
    status: "Lu",
    priority: "Faible",
    icon: Info
  },
  {
    id: 5,
    title: "Confirmation d'Inscription à une Formation",
    message: "Vous avez été inscrit à la formation 'Techniques de Résolution de Problèmes' prévue pour la semaine prochaine.",
    type: "Formation",
    date: "2023-06-11 10:05",
    status: "Lu",
    priority: "Moyenne",
    icon: Calendar
  },
  {
    id: 6,
    title: "Évaluation Terminée",
    message: "Votre manager a terminé votre évaluation mensuelle. Cliquez pour voir les détails.",
    type: "Évaluation",
    date: "2023-06-10 16:30",
    status: "Lu",
    priority: "Élevée",
    icon: ClipboardCheck
  },
  {
    id: 7,
    title: "Maintenance du Système",
    message: "Le système sera en maintenance dimanche de 2h00 à 4h00.",
    type: "Général",
    date: "2023-06-09 09:15",
    status: "Lu",
    priority: "Faible",
    icon: Info
  },
  {
    id: 8,
    title: "Nouvelle Formation Disponible",
    message: "Une nouvelle formation optionnelle 'Gestion Avancée des Appels' est maintenant disponible pour inscription.",
    type: "Formation",
    date: "2023-06-08 13:45",
    status: "Lu",
    priority: "Faible",
    icon: Calendar
  },
  {
    id: 9,
    title: "Date Limite d'Évaluation Approchant",
    message: "Rappel : Il vous reste 2 jours pour compléter votre auto-évaluation.",
    type: "Évaluation",
    date: "2023-06-07 11:30",
    status: "Lu",
    priority: "Élevée",
    icon: ClipboardCheck
  },
  {
    id: 10,
    title: "Mise à Jour des Performances de l'Équipe",
    message: "Les métriques de performance globale de votre équipe pour le mois dernier sont maintenant disponibles.",
    type: "Général",
    date: "2023-06-06 15:10",
    status: "Lu",
    priority: "Moyenne",
    icon: Info
  }
];

interface NotificationsProps {
  onNotificationsRead?: () => void;
}

export default function Notifications({ onNotificationsRead }: NotificationsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  // Filtrer les notifications en fonction du terme de recherche et des filtres
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || notification.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || notification.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(notification => notification.status === "Non lu").length;

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(notification => notification.id));
    }
  };

  const handleSelect = (id: number) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(notificationId => notificationId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const markAsRead = () => {
    // Dans une application réelle, cela mettrait à jour le backend
    if (onNotificationsRead) {
      onNotificationsRead();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'élevée':
        return 'bg-red-100 text-red-800';
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'faible':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'non lu':
        return 'bg-blue-100 text-blue-800';
      case 'lu':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'évaluation':
        return <ClipboardCheck className="h-5 w-5 text-blue-500" />;
      case 'formation':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'général':
        return <Info className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {unreadCount} Non lues
          </Badge>
          <Button variant="outline" size="sm" onClick={markAsRead}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher des notifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les Types</SelectItem>
            <SelectItem value="évaluation">Évaluation</SelectItem>
            <SelectItem value="formation">Formation</SelectItem>
            <SelectItem value="général">Général</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les Statuts</SelectItem>
            <SelectItem value="non lu">Non lu</SelectItem>
            <SelectItem value="lu">Lu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Toutes les Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all">Tout sélectionner</Label>
            </div>
          </div>
          <CardDescription>
            Vous avez {unreadCount} notifications non lues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="unread">Non lues</TabsTrigger>
              <TabsTrigger value="évaluation">Évaluations</TabsTrigger>
              <TabsTrigger value="formation">Formations</TabsTrigger>
              <TabsTrigger value="général">Général</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border ${notification.status === 'Non lu' ? 'bg-muted/50' : ''}`}
                  >
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => handleSelect(notification.id)}
                      className="mt-1"
                    />
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon && <notification.icon className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getStatusColor(notification.status)}>
                            {notification.status}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {notification.date}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification trouvée</h3>
                  <p className="text-sm text-muted-foreground">
                    Essayez d'ajuster vos filtres ou votre terme de recherche
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-4">
              {filteredNotifications.filter(n => n.status === "Non lu").length > 0 ? (
                filteredNotifications
                  .filter(n => n.status === "Non lu")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border bg-muted/50"
                    >
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelect(notification.id)}
                        className="mt-1"
                      />
                      <div className="flex-shrink-0 mt-1">
                        {notification.icon && <notification.icon className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification non lue</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous êtes à jour !
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="évaluation" className="space-y-4">
              {filteredNotifications.filter(n => n.type === "Évaluation").length > 0 ? (
                filteredNotifications
                  .filter(n => n.type === "Évaluation")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${notification.status === 'Non lu' ? 'bg-muted/50' : ''}`}
                    >
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelect(notification.id)}
                        className="mt-1"
                      />
                      <div className="flex-shrink-0 mt-1">
                        <ClipboardCheck className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification d'évaluation</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez aucune notification liée aux évaluations
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="formation" className="space-y-4">
              {filteredNotifications.filter(n => n.type === "Formation").length > 0 ? (
                filteredNotifications
                  .filter(n => n.type === "Formation")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${notification.status === 'Non lu' ? 'bg-muted/50' : ''}`}
                    >
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelect(notification.id)}
                        className="mt-1"
                      />
                      <div className="flex-shrink-0 mt-1">
                        {notification.icon && <notification.icon className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification non lue</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous êtes à jour !
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-4">
              {filteredNotifications.filter(n => n.type === "Evaluation").length > 0 ? (
                filteredNotifications
                  .filter(n => n.type === "Evaluation")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${notification.status === 'Unread' ? 'bg-muted/50' : ''}`}
                    >
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelect(notification.id)}
                        className="mt-1"
                      />
                      <div className="flex-shrink-0 mt-1">
                        <ClipboardCheck className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification d'évaluation</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez aucune notification liée à une évaluation
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="training" className="space-y-4">
              {filteredNotifications.filter(n => n.type === "Training").length > 0 ? (
                filteredNotifications
                  .filter(n => n.type === "Training")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${notification.status === 'Unread' ? 'bg-muted/50' : ''}`}
                    >
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelect(notification.id)}
                        className="mt-1"
                      />
                      <div className="flex-shrink-0 mt-1">
                        <Calendar className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification de formation</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez aucune notification liée à une formation
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              {filteredNotifications.filter(n => n.type === "General").length > 0 ? (
                filteredNotifications
                  .filter(n => n.type === "General")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${notification.status === 'Unread' ? 'bg-muted/50' : ''}`}
                    >
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelect(notification.id)}
                        className="mt-1"
                      />
                      <div className="flex-shrink-0 mt-1">
                        <Info className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Info className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification générale</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez aucune notification générale
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedNotifications.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm font-medium">{selectedNotifications.length} sélectionnées</span>
          <Button size="sm" variant="outline" onClick={() => setSelectedNotifications([])}>
            Annuler
          </Button>
          <Button size="sm">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Marquer comme lu
          </Button>
        </div>
      )}
    </div>

  )
}
