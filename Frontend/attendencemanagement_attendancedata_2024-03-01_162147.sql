/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS attendancedata;
CREATE TABLE `attendancedata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventname` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(15) DEFAULT NULL,
  `attendeename` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `entryby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO attendancedata(id,eventname,date,time,attendeename,status,entryby) VALUES('1','\'Workshop on AI\'','\'2024-02-15\'','\'10:00 AM\'','\'John Smith\'','\'Present\'','\'admin\''),('2','\'Workshop on AI\'','\'2024-02-15\'','\'10:00 AM\'','\'Emily Johnson\'','\'Present\'','\'admin\''),('3','\'Workshop on AI\'','\'2024-02-15\'','\'10:00 AM\'','\'Michael Brown\'','\'Absent\'','\'admin\''),('4','\'Seminar on Data\'','\'2024-02-20\'','\'02:00 PM\'','\'Sarah Lee\'','\'Present\'','\'admin\''),('5','\'Seminar on Data\'','\'2024-02-20\'','\'02:00 PM\'','\'Alex Kim\'','\'Present\'','\'admin\''),('6','\'Seminar on Data\'','\'2024-02-20\'','\'02:00 PM\'','\'Emma Garcia\'','\'Absent\'','\'admin\''),('7','\'Conference\'','\'2024-03-05\'','\'09:30 AM\'','\'Adam Smith\'','\'Present\'','\'admin\''),('8','\'Conference\'','\'2024-03-05\'','\'09:30 AM\'','\'Olivia Brown\'','\'Present\'','\'admin\''),('9','\'Conference\'','\'2024-03-05\'','\'09:30 AM\'','\'Daniel Johnson\'','\'Present\'','\'admin\''),('10','\'Conference\'','\'2024-03-05\'','\'09:30 AM\'','\'Sophia Davis\'','\'Absent\'','\'admin\'');