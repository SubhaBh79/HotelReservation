import { amqpChannel } from "../connection/amqpConnection";

export class ReservationHandler {
  public reservationConsumption = () => {
    process.env.AMQP_QUEUES.split(",").forEach((queueName: string) => {
      this.consumeQueue(queueName);
    });
  };

  private consumeQueue = (queueName: string) => {
    amqpChannel().consume(queueName, (msg) => {
      if (msg) {
        console.log(`${queueName}:${msg.content.toString()}`);
        amqpChannel().ack(msg);
      }
    });
  };
}
