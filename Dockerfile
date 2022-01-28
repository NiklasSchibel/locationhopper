FROM openjdk:17

MAINTAINER Niklas Schibel <niklas.schibel@gmx.de>

ADD backend/target/agamebc.jar agamebc.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGO_DB_URI -jar /agamebc.jar" ]