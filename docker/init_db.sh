#!/bin/bash

set -e
set -x

mysql_install_db

/usr/sbin/mysqld &
mysql_pid=$!

until mysqladmin ping >/dev/null 2>&1; do
    echo -n "."; sleep 0.2
done

mysql -e "GRANT ALL ON *.* TO root@'%' IDENTIFIED BY '' WITH GRANT OPTION"

mysql < /tmp/init_db.sql

mysqladmin shutdown

wait $mysql_pid

tar czvf default_mysql.tar.gz /var/lib/mysql
