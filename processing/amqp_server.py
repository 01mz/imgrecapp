# python3 amqp_server.py
# based on https://www.rabbitmq.com/tutorials/tutorial-six-python.html
import pika
import json
import os

import predict2

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=os.environ['RABBITMQ_HOST']))
channel = connection.channel()
channel.queue_declare(queue='rpc_queue')


def make_prediction(request):
    result = predict2.make_prediction(request['imageData'])
    return {'result': str(result)}


def on_request(ch, method, props, body):
    try:
        request = json.loads(body.decode('utf-8'))
    except json.decoder.JSONDecodeError:
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print('Bad request:', body)
        return
    print(body)
    print(request)
    print(request['imageData'])
    response = make_prediction(request)
    body = json.dumps(response).encode('utf-8')

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=body)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

print("Awaiting RPC requests")
channel.start_consuming()
