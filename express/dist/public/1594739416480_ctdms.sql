/*
MySQL Data Transfer
Source Host: localhost
Source Database: ctdms
Target Host: localhost
Target Database: ctdms
Date: 2020/7/14 11:53:11
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
-- Table structure for companys
-- ----------------------------
DROP TABLE IF EXISTS `companys`;
CREATE TABLE `companys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `saveUrl` varchar(255) NOT NULL,
  `uploader` varchar(255) NOT NULL,
  `uploadTime` varchar(255) NOT NULL,
  `size` bigint(20) NOT NULL,
  `downloadUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
INSERT INTO `admin` VALUES ('1', '0001', 'admin', '管理员', '人工智能');
INSERT INTO `book` VALUES ('0010', '1111111', '宇哥最帅', '11111', '11111', '11111');
INSERT INTO `book` VALUES ('6666', '龙哥带你追富婆', '杨晓龙', '龙哥出版社', '计算机', '');
INSERT INTO `book` VALUES ('kr', 'kr', 'kr', 'kr', 'kr', 'kr');
INSERT INTO `material` VALUES ('17', 'gridAnimation.html', '1594266243965_gridAnimation.html', '管理员', '2020年6月9日11时44分3秒', '1839', 'http://ju.5gzvip.idcfengye.com/api/material/download?name=1594266243965_gridAnimation.html');
INSERT INTO `material` VALUES ('18', 'IMG_20180619_143341.jpg', '1594267473209_IMG_20180619_143341.jpg', '管理员', '2020年6月9日12时4分33秒', '1518731', 'http://ju.5gzvip.idcfengye.com/api/material/download?name=1594267473209_IMG_20180619_143341.jpg');
INSERT INTO `student` VALUES ('1', '201714600209', '12345678', '杨晓龙', '人工智能', '计算机科学与技术');
INSERT INTO `student` VALUES ('2', '201714600201', '123456', '杨林龙', '人工智能', '计算机科学与技术');
INSERT INTO `teacher` VALUES ('1', '000001', '123456', '老师', '人工智能');
