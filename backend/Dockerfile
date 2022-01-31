FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE jett
ENV MYSQL_USER root
ENV MYSQL_PASSWORD password

RUN apt-get update && apt-get -y install vim

EXPOSE 3306

CMD ["mysqld"]