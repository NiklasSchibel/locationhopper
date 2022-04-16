FROM openjdk:17

MAINTAINER Niklas Schibel <niklas.schibel@gmx.de>

ADD backend/target/restaurantmapp.jar restaurantmapp.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -jar /restaurantmapp.jar" ]