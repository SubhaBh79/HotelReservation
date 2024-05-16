import amqp from 'amqplib';

let rabbitmqChannel = null;

export const amqpConnection = async () => {
  const connectionURL = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.AMQP_PORT}/${process.env.RABBITMQ_VHOST}`;
  const conn = await amqp.connect(connectionURL);
  console.log('connection established')
  rabbitmqChannel = await conn.createChannel();
  const $queues = [];
  process.env.AMQP_QUEUES.split(',').forEach((queueName: string)=>{
    $queues.push(rabbitmqChannel.assertQueue( queueName))
  })
  await Promise.all($queues)
};

export const amqpChannel = () => {
    return rabbitmqChannel;
}
