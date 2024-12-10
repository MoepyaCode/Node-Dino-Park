import express = require('express')
import bodyParser = require('body-parser')
import { Request, Response } from "express"
import { Routes } from "./routes"
import morgan = require("morgan")

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())

/**
 * Routes register
 */
Routes.forEach(route => {
    (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
        try {
            const result = await (new (route.controller as any))[route.action](req, res, next)
            res.json(result)
        } catch (error) {
            next(error)
        }
    })
})

/**
 * Middleware
 */
app.use((error: any, request: Request, response: Response, next: Function) => {
    response.status(error.statusCode || 500).json({ message: error.message })
})


export default app