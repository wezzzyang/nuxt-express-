/*
MySQL Data Transfer
Source Host: localhost
Source Database: ctdms
Target Host: localhost
Target Database: ctdms
Date: 2020/7/1 17:10:20
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` char(12) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `bookID` varchar(255) NOT NULL,
  `bookName` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  `beiZhu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bookID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `saveUrl` varchar(255) NOT NULL,
  `uploader` varchar(255) NOT NULL,
  `uploadTime` datetime NOT NULL,
  `size` bigint(20) NOT NULL,
  `downloadUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` char(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` char(6) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '0001', '123456', '管理员', '人工智能');
INSERT INTO `book` VALUES ('acacac', 'acacac', 'acacac', 'acacac', 'acacac', 'acacac');
INSERT INTO `book` VALUES ('akak', 'akak', 'akak', 'akak', 'akak', 'akak');
INSERT INTO `book` VALUES ('kk', 'wf', 'kk', 'kk', 'kk', '');
INSERT INTO `book` VALUES ('kr', 'kr', 'kr', 'kr', 'kr', 'kr');
INSERT INTO `book` VALUES ('wafawf', 'awfawf', 'awfawf', 'wafawf', 'awfawfwaf', 'wfwf');
INSERT INTO `material` VALUES ('1', 'ps.png', 'E:\\aWork\\schoolNoWeb\\ctdms - 副本\\static\\1593518556966-ps.png', '杨晓龙', '2020-06-30 20:02:37', '227287', 'http://localhost:8080/api/material/download?id=1');
INSERT INTO `material` VALUES ('2', '头像9.png', 'E:\\aWork\\schoolNoWeb\\ctdms - 副本\\static\\1593518890636-头像9.png', '杨晓龙', '2020-06-30 20:08:11', '19479', 'http://localhost:8080/api/material/download?id=2');
INSERT INTO `material` VALUES ('4', '学习列表.md', 'E:\\aWork\\schoolNoWeb\\ctdms - 副本\\static\\1593572827650-学习列表.md', '管理员', '2020-07-01 11:07:08', '25', 'http://localhost:8080/api/material/download?id=4');
INSERT INTO `student` VALUES ('1', '201714600209', '12345678', '杨晓龙', '人工智能', '计算机科学与技术');
INSERT INTO `teacher` VALUES ('1', '000001', '123456', '老师', '人工智能');
