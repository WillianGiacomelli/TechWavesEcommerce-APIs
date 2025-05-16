import * as amqp from 'amqplib';

export class CustomerEvent {

    private async _getChannel(): Promise<amqp.Channel> {
        const connection = await amqp.connect('amqp://localhost:5673');
        return connection.createChannel();
    }

    public async publishCustomerCreatedEvent(
        customerId: number,
        customerName: string,
    ){
        try{
            const channel = await this._getChannel();
            const queue = 'customer.created';
            const message = {
                customerId,
                customerName
            };

            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                persistent: true,
            });

            console.log(`Customer created event published: ${JSON.stringify(message)}`);
        } catch (error) {
            console.error('Error publishing event:', error);

            throw error;
        }
    }

}
