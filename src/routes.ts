import { DinoController, EventController, ZoneController } from "./controllers"

export const Routes = [
    /**
     * Dino Controller
     */
    {
        method: "get",
        route: "/dinos",
        controller: DinoController,
        action: "getAllDino"
    },
    {
        method: "get",
        route: "/dinos/:id",
        controller: DinoController,
        action: "getDinoById"
    },

    /**
     * Zone Controller
     */
    {
        method: "get",
        route: "/zones/",
        controller: ZoneController,
        action: "getAllZones"
    },
    {
        method: "get",
        route: "/zones/:location",
        controller: ZoneController,
        action: "getZoneByLocation"
    },

    /**
     * Event Controller
     */
    {
        method: "post",
        route: "/events/sync",
        controller: EventController,
        action: "syncFeed"
    },
    {
        method: "post",
        route: "/events/add/dinos/",
        controller: EventController,
        action: "addDino"
    },
    {
        method: "patch",
        route: "/events/feed/dinos/:id",
        controller: EventController,
        action: "feedDino"
    },
    {
        method: "patch",
        route: "/events/location_update/dinos/:id",
        controller: EventController,
        action: "updateDinoLocation"
    },
    {
        method: "patch",
        route: "/events/maintenance/zones/:location",
        controller: EventController,
        action: "maintenancePerformed"
    },
    {
        method: "delete",
        route: "/events/remove/dinos/:id",
        controller: EventController,
        action: "removeDinoById"
    },
]