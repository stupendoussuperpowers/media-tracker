FROM mysql:latest

ENV MYSQL_HOST db
ENV MYSQL_DATABASE mediatracker
ENV MYSQL_USER testuser
ENV MYSQL_PASSWORD root
ENV MYSQL_ROOT_PASSWORD root

EXPOSE 3306

COPY init_db.sql /docker-entrypoint-initdb.d