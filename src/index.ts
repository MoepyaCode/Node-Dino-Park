import { AppDataSource } from "./data-source"
import { ZoneService } from "./services"
import app from './app'

const PORT = 3000

AppDataSource.initialize().then(async () => {

    const zoneService = new ZoneService()
    await zoneService.init()

    app.listen(PORT)
    console.log(`Running on http://localhost${PORT}`)
}).catch(error => console.log(error))
