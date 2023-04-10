import app from './app';
import helmet from 'helmet';
app.use(helmet())

const server = app.listen(3000, ()=> console.log("server started on port 3000"))

export default server ;