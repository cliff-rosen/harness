import boto3
import os

url = 'https://sqs.us-east-2.amazonaws.com/183944926635/entries_new'


def send_message_to_sqs(queue_url, message_body):
    """
    Send a message to an AWS SQS queue.

    Parameters:
    - queue_url (str): The URL of the SQS queue.
    - message_body (str): The message body to send.

    Returns:
    - dict: Response from SQS.
    """
    
    # Create an SQS client
    sqs = boto3.client('sqs')
    
    # Send the message
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageBody=message_body
    )
    
    return response

'''
res = send_message_to_sqs(url, 'hello there')
print(res)
'''

def read_messages_from_sqs(
        queue_url,
        max_number_of_messages=2,
        wait_time_seconds=20
        ):
    """
    Read messages from an AWS SQS queue.

    Parameters:
    - queue_url (str): The URL of the SQS queue.
    - max_number_of_messages (int): The maximum number of messages to retrieve. Must be between 1 and 10. Default is 1.
    - wait_time_seconds (int): The duration (in seconds) for which the call will wait for a message to arrive 
                               in the queue before returning. Default is 20 seconds.

    Returns:
    - list: A list of messages retrieved from the queue.
    """
    
    # Create an SQS client
    sqs = boto3.client('sqs')
    
    # Retrieve messages
    response = sqs.receive_message(
        QueueUrl=queue_url,
        MaxNumberOfMessages=max_number_of_messages,
        WaitTimeSeconds=wait_time_seconds
    )
    
    # Return the list of messages
    return response.get('Messages', [])

messages = read_messages_from_sqs(url)

for message in messages:
    print("Message ID:", message['MessageId'])
    print("Message Body:", message['Body'])
    
    # If you want to delete the message after processing
    receipt_handle = message['ReceiptHandle']
    sqs = boto3.client('sqs')
    sqs.delete_message(QueueUrl=url, ReceiptHandle=receipt_handle)
