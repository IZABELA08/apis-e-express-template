import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses } from './database'
import { COURSE_STACK, TCourse } from './types'


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
})

app.get('/couses/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = q
        ? courses.filter(item => item.name.toLocaleLowerCase().includes(q.toLowerCase()))

        : courses;

    res.status(200).send(result)
})

app.post("/courses", (req: Request, res: Response) => {
    const id: string = req.body.id
    const name: string = req.body.name
    const lessons: number = req.body.lessons
    const stack: COURSE_STACK = req.body.stack

    const newCourse: TCourse = {
        id,name,lessons,stack
    }
courses.push(newCourse)

console.log("cursos", courses)

res.status(201).send("tudo ok")
})