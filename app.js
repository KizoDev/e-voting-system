const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// middleware
const userRouter = require('./routes/user')
const electionBodyRouter = require('./routes/electionbody')
const electionBodyAdminRouter = require('./routes/electionBodyAdmin')
const electionRouter = require('./routes/election')
const voterRouter = require('./routes/voters')
const voteRouter = require('./routes/votes')
const umpireRouter = require('./routes/umpire')
const supportTicketrouter = require('./routes/supportTicket')
const electionCandidateRouter = require('./routes/electionCandidates')
const photoRouter = require('./routes/profilePicture')
const resetPasswordRouter = require('./routes/resetPassword')
const addNewPasswordRouter = require('./routes/addNewPassword')




app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/', userRouter)
app.use('/', electionBodyRouter)
app.use('/', electionBodyAdminRouter)
app.use('/', electionRouter)
app.use('/', voterRouter)
app.use('/', voteRouter)
app.use('/', umpireRouter)
app.use('/', supportTicketrouter)
app.use('/', electionCandidateRouter)
app.use('/', photoRouter)
app.use('/', resetPasswordRouter)
app.use('/', addNewPasswordRouter)



app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
