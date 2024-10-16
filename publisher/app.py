import os
from google.cloud import pubsub_v1
from concurrent.futures import TimeoutError

project_id = "flaskgkeuploader"
topic_id = "my-topic"

# Publish messages to a Pub/Sub topic
def publish_messages():
    # TODO(developer)

    publisher = pubsub_v1.PublisherClient()
    # The `topic_path` method creates a fully qualified identifier
    # in the form `projects/{project_id}/topics/{topic_id}`
    topic_path = publisher.topic_path(project_id, topic_id)

    for n in range(1, 10):
        data_str = f"Message number {n}"
        # Data must be a bytestring
        data = data_str.encode("utf-8")
        # When you publish a message, the client returns a future.
        future = publisher.publish(topic_path, data)
        print(future.result())

    return(f"Published messages to {topic_path}.")

if __name__ == '__main__':
    publish_messages()
