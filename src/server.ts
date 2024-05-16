import express from 'express';
import dotenv from 'dotenv';
import { amqpChannel, amqpConnection } from './connection/amqpConnection';
import { ReservationHandler } from './consumer/amqpConsumer';

dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(process.env.APP_PORT, async () => {
    await amqpConnection();
    new ReservationHandler().reservationConsumption();
    console.log('app is runnings')
    setTimeout(()=>{
        amqpChannel().sendToQueue('tableFor4',Buffer.from('hello from the other side'))
    },9000)
})
