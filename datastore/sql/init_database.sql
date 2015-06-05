CREATE DATABASE techtrend;
USE techtrend;

CREATE USER techtrend;

GRANT ALL ON techtrend.* TO techtrend;

CREATE TABLE `rssfeed` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `url` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `article` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `rssfeed_id` int(12) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `published_date` datetime DEFAULT NULL,
  `summary` text,
  `html` mediumtext,
  PRIMARY KEY (`id`),
  KEY `rssfeed_id` (`rssfeed_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`rssfeed_id`) REFERENCES `rssfeed` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

