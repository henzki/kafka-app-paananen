docker exec -it kafka /opt/bitnami/kafka-topics.sh \
--create \
--zookeeper zookeeper:2181 \
--replication factor 1 \
--partitions 1 \
--topic task