-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2021 at 05:09 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sample_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `addressLine2` varchar(255) NOT NULL,
  `cityMunicipality` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `addressType` enum('present','permanent') NOT NULL,
  `employeeId` int(11) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`identifier`, `createdDate`, `updatedDate`, `deleted`, `addressLine2`, `cityMunicipality`, `postalCode`, `country`, `addressType`, `employeeId`, `streetAddress`, `province`) VALUES
(1, '2021-01-14 14:57:39', '2021-01-14 14:57:39', 0, '', 'Bocaue', '2091', 'Philippines', 'present', 1, '', ''),
(2, '2021-01-14 14:57:39', '2021-01-14 14:57:39', 0, '', 'Bocaue', '2091', 'Philippines', 'permanent', 1, '', ''),
(3, '2021-01-14 14:59:14', '2021-01-14 14:59:14', 0, '', 'Bocaue', '2091', 'Philippines', 'permanent', 2, '', ''),
(4, '2021-01-14 14:59:14', '2021-01-14 14:59:14', 0, 'wtqwtqw', 'Daguioman', '2091', 'Philippines', 'present', 2, '123 eqwqwrq', 'Abra'),
(5, '2021-01-14 17:40:03', '2021-01-14 17:40:03', 0, '123 qwe', 'Caloocan', '61261212', 'Philippines', 'present', 4, '123 qtqwt', 'Metro Manila'),
(6, '2021-01-14 17:40:03', '2021-01-14 17:40:03', 0, '123 qwe', 'Caloocan', '61261212', 'Philippines', 'permanent', 4, '123 qtqwt', 'Metro Manila'),
(7, '2021-01-14 17:41:36', '2021-01-14 17:41:36', 0, '', 'Boliney', '2525', 'Philippines', 'permanent', 5, '41241 rqwtqw', 'Abra'),
(8, '2021-01-14 17:41:36', '2021-01-14 17:41:36', 0, '', 'Boliney', '2525', 'Philippines', 'present', 5, '41241 rqwtqw', 'Abra'),
(9, '2021-01-15 14:38:27', '2021-01-15 14:38:27', 0, '123 qwe', 'Las Piñas', '1231', 'Philippines', 'present', 6, '123 qtqwt', 'Metro Manila'),
(10, '2021-01-15 14:38:27', '2021-01-15 14:38:27', 0, '123 qwe', 'Las Piñas', '1231', 'Philippines', 'permanent', 6, '123 qtqwt', 'Metro Manila'),
(11, '2021-01-15 14:43:53', '2021-01-15 14:43:53', 0, '123 qwe', 'Bangued', '2425', 'Philippines', 'permanent', 7, '123 qtqwt', 'Abra'),
(12, '2021-01-15 14:43:53', '2021-01-15 14:43:53', 0, '123 qwe', 'Bangued', '2425', 'Philippines', 'present', 7, '123 qtqwt', 'Abra'),
(13, '2021-01-15 15:40:30', '2021-01-15 15:40:30', 0, '123 qwe', 'Las Piñas', '1231', 'Philippines', 'permanent', 8, '123 qtqwt', 'Metro Manila'),
(14, '2021-01-15 15:40:30', '2021-01-15 15:40:30', 0, '123 qwe', 'Las Piñas', '1231', 'Philippines', 'present', 8, '123 qtqwt', 'Metro Manila'),
(15, '2021-01-15 15:56:22', '2021-01-15 15:56:22', 0, '123 qwe', 'Las Piñas', '1241', 'Philippines', 'permanent', 9, '123 qtqwt', 'Metro Manila'),
(16, '2021-01-15 15:56:22', '2021-01-15 15:56:22', 0, '123 qwe', 'Las Piñas', '1241', 'Philippines', 'present', 9, '123 qtqwt', 'Metro Manila'),
(17, '2021-01-15 16:00:28', '2021-01-15 16:00:28', 0, 'tqwtwq 4422', 'Las Piñas', '6126', 'Philippines', 'permanent', 10, '123 eqw', 'Metro Manila'),
(18, '2021-01-15 16:00:28', '2021-01-15 16:00:28', 0, 'tqwtwq', 'Las Piñas', '6126', 'Philippines', 'present', 10, '123 eqw', 'Metro Manila'),
(19, '2021-01-15 16:48:53', '2021-01-15 16:48:53', 0, 'wqwtqw', 'Boliney', '6717', 'Philippines', 'permanent', 11, '123 qwqwtq', 'Abra'),
(20, '2021-01-15 16:48:53', '2021-01-15 16:48:53', 0, 'wqwtqw', 'Boliney', '6717', 'Philippines', 'present', 11, '123 qwqwtq', 'Abra'),
(21, '2021-01-15 16:54:27', '2021-01-15 16:54:27', 0, '123 qwe', 'Las Piñas', '6126', 'Philippines', 'present', 12, '123 qtqwt', 'Metro Manila'),
(22, '2021-01-15 16:54:27', '2021-01-15 16:54:27', 0, '123 qwe', 'Las Piñas', '6126', 'Philippines', 'permanent', 12, '123 qtqwt', 'Metro Manila'),
(23, '2021-01-24 07:16:24', '2021-01-24 07:16:24', 0, 'tqwtqw', 'Bangued', '2521', 'Philippines', 'present', 13, '123 tqwtqw', 'Abra'),
(24, '2021-01-24 07:16:24', '2021-01-24 07:16:24', 0, 'tqwtqw', 'Bangued', '2521', 'Philippines', 'permanent', 13, '123 tqwtqw', 'Abra'),
(25, '2021-01-24 07:33:22', '2021-01-24 07:33:22', 0, 'tqwtqw', 'Conner', '2521', 'Philippines', 'present', 14, '123 trqwtqw', 'Apayao'),
(26, '2021-01-24 07:33:22', '2021-01-24 07:33:22', 0, 'tqwtqw', 'Conner', '2521', 'Philippines', 'permanent', 14, '123 trqwtqw', 'Apayao'),
(27, '2021-01-24 07:39:33', '2021-01-24 07:39:33', 0, 'tqwtqw', 'Conner', '2521', 'Philippines', 'present', 15, '123 trqwtqw', 'Apayao'),
(28, '2021-01-24 07:39:33', '2021-01-24 07:39:33', 0, 'tqwtqw', 'Conner', '2521', 'Philippines', 'permanent', 15, '123 trqwtqw', 'Apayao'),
(29, '2021-02-18 15:06:16', '2021-02-18 15:06:16', 0, '', 'Hingyon', '5125', 'Philippines', 'present', 18, '123 qrwwq', 'Ifugao'),
(30, '2021-02-18 15:06:16', '2021-02-18 15:06:16', 0, '', 'Hingyon', '5125', 'Philippines', 'permanent', 18, '123 qrwwq', 'Ifugao'),
(31, '2021-02-18 15:06:51', '2021-02-18 15:06:51', 0, '', 'Hingyon', '5125', 'Philippines', 'present', 20, '123 qrwwq', 'Ifugao'),
(32, '2021-02-18 15:06:51', '2021-02-18 15:06:51', 0, '', 'Hingyon', '5125', 'Philippines', 'permanent', 20, '123 qrwwq', 'Ifugao'),
(33, '2021-02-18 15:15:06', '2021-02-18 15:15:06', 0, '', 'Mandaluyong', '1241', 'Philippines', 'present', 26, '123 qwe', 'Metro Manila'),
(34, '2021-02-18 15:15:06', '2021-02-18 15:15:06', 0, '', 'Mandaluyong', '1241', 'Philippines', 'permanent', 26, '123 qwe', 'Metro Manila'),
(35, '2021-02-18 15:17:42', '2021-02-18 15:17:42', 0, 'qweqwe', 'Hingyon', '', 'Philippines', 'permanent', 28, '123 qwe', 'Ifugao'),
(36, '2021-02-18 15:17:42', '2021-02-18 15:17:42', 0, 'qweqwe', 'Hingyon', '', 'Philippines', 'present', 28, '123 qwe', 'Ifugao'),
(37, '2021-02-18 15:49:10', '2021-02-18 15:49:10', 0, 'qwe', 'Balbalan', '2512', 'Philippines', 'permanent', 29, '123 qwe', 'Kalinga'),
(38, '2021-02-18 15:49:10', '2021-02-18 15:49:10', 0, 'qwe', 'Balbalan', '2512', 'Philippines', 'present', 29, '123 qwe', 'Kalinga'),
(39, '2021-02-18 16:01:54', '2021-02-18 16:01:54', 0, '', 'Hingyon', '5215', 'Philippines', 'present', 30, '123 qwe', 'Ifugao'),
(40, '2021-02-18 16:01:54', '2021-02-18 16:01:54', 0, '', 'Hingyon', '5215', 'Philippines', 'permanent', 30, '123 qwe', 'Ifugao');

-- --------------------------------------------------------

--
-- Table structure for table `appraisal`
--

CREATE TABLE `appraisal` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `evaluationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `evaluatorName` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL DEFAULT '',
  `employeeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `divisionType` enum('manpower','pmo') NOT NULL,
  `location` varchar(255) NOT NULL,
  `divisionName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `division`
--

INSERT INTO `division` (`identifier`, `createdDate`, `updatedDate`, `deleted`, `divisionType`, `location`, `divisionName`, `description`) VALUES
(1, '2021-01-14 14:55:47', '2021-01-14 14:55:47', 0, 'pmo', 'Pasig', 'Pasig PMO', 'Kamehamewave'),
(2, '2021-01-14 14:56:03', '2021-01-14 14:56:03', 0, 'manpower', 'Makati', 'Makait Manpower', 'Company'),
(3, '2021-01-14 14:56:25', '2021-01-14 14:56:25', 0, 'pmo', 'Manila', 'Manila Bulletin PMO', 'Company'),
(4, '2021-01-14 14:57:15', '2021-01-14 14:57:15', 0, 'manpower', 'Luzviminda', 'Pagubayan Sir PMO', 'In the service of Filipino');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `image` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `employeeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`identifier`, `createdDate`, `updatedDate`, `deleted`, `image`, `name`, `description`, `employeeId`) VALUES
(1, '2021-03-25 15:32:02', '2021-03-25 15:32:02', 0, 'pic ko hehe-29db.jpg', 'Onboarding Document', 'Document for onboarding requirements', 2),
(2, '2021-03-25 15:48:03', '2021-03-25 15:48:03', 0, 'mt-e16c.jpg', 'Onboarding Document 2', 'Document for onboarding requirements 2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `employeeIdNumber` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `profilePicture` varchar(255) NOT NULL DEFAULT '',
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `civilStatus` enum('married','widowed','separated','divorced','single') NOT NULL DEFAULT 'single',
  `emailAddress` varchar(255) NOT NULL,
  `contactNumber` varchar(255) NOT NULL,
  `emergencyContactPerson` varchar(255) NOT NULL,
  `emergencyContactNumber` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `placeOfBirth` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `age` int(11) NOT NULL,
  `reportsTo` varchar(255) NOT NULL,
  `divisionType` enum('manpower','pmo') NOT NULL,
  `employmentStatus` enum('probationary','regular','floating','reliver','resigned','terminated') NOT NULL DEFAULT 'probationary',
  `startDate` date NOT NULL,
  `departureDate` date DEFAULT NULL,
  `divisionId` int(11) DEFAULT NULL,
  `salary` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`identifier`, `createdDate`, `updatedDate`, `deleted`, `employeeIdNumber`, `position`, `profilePicture`, `firstName`, `lastName`, `middleName`, `civilStatus`, `emailAddress`, `contactNumber`, `emergencyContactPerson`, `emergencyContactNumber`, `birthDate`, `placeOfBirth`, `gender`, `age`, `reportsTo`, `divisionType`, `employmentStatus`, `startDate`, `departureDate`, `divisionId`, `salary`) VALUES
(1, '2021-01-14 14:57:39', '2021-01-14 14:57:39', 0, 'SVK-14256125', 'Manager', 'sophia-f4e8.jpg', 'Sophia', 'Coder', 'Murillo', 'married', 'sophiacodera@gmail.com', '099927758852', 'Ruby Pagubayan', '092592581858', '1998-12-03', 'Duhat, Bocaue, Bulacan', 'male', 23, 'Robin Pagubayan', 'pmo', 'probationary', '2020-04-04', NULL, 2, ''),
(2, '2021-01-14 14:59:14', '2021-01-29 03:52:05', 0, 'SVK-612612412', 'Asistant', 'profile-3714.png', 'Jomel', 'Ortega', 'Murillo', 'married', 'jomelorskie@gmail.com', '09992245621', 'Ruby Pagubayan', '0955292939333', '1997-03-04', 'Duhat, Bocaue, Bulacan', 'male', 23, 'Robin Pagubayan', 'pmo', 'probationary', '2020-04-04', NULL, 1, '6,222,525'),
(4, '2021-01-14 17:40:03', '2021-01-29 06:16:28', 1, 'SVK-25612612312', 'Manager', '', 'Miguel', 'Pagubayan', 'Miralles', 'married', 'miguelmiralles@gmail.com', '0942-095-0290', 'Ruby Pagubayan', '0924-920-9502', '2021-01-06', 'Sta. Maria', 'male', 23, 'Marge Abalos', 'manpower', 'probationary', '2021-01-04', NULL, 2, '11,111'),
(5, '2021-01-14 17:41:36', '2021-02-18 15:59:51', 1, 'SVK-52525122', 'manager', '', 'Ako lang to T', 'Hqahaha', 'Protacio', 'single', 'kahitano@tset.com', '0955-252-5266', 'Ruby Pagubayan', '0988-248-7282', '2021-01-16', 'Sta. Maria', 'male', 23, 'Marge Abalos', 'manpower', 'probationary', '2021-01-13', NULL, 4, '12,322'),
(6, '2021-01-15 14:38:27', '2021-01-15 14:38:27', 0, 'SVK-1217123123', 'Manager', 'background-ef88.jpg', 'Ailys', 'Pagubayan', 'Miralles', 'married', 'ailysyain@gmail.com', '0942-095-0290', 'Ruby Pagubayan', '0924-920-9502', '2021-01-13', 'Bulacan', 'female', 23, 'Marge Abalos', 'pmo', 'probationary', '2021-01-12', NULL, 1, '10,000'),
(7, '2021-01-15 14:43:53', '2021-01-29 06:16:11', 1, 'SVK-251626123', 'Manager', '', 'Zaki', 'Pagubayan', 'Miralles', 'married', 'zakipagubayan@gmail.com', '0942-095-0290', 'Ruby Pagubayan', '0924-920-9502', '2021-01-21', 'Sta. Maria', 'male', 23, 'Marge Abalos', 'manpower', 'probationary', '2021-01-04', NULL, 2, '10,000'),
(8, '2021-01-15 15:40:30', '2021-01-29 06:16:06', 1, 'SVK-21516126123', 'Manager', '', 'Codera', 'Sophia', 'Miralles', 'married', 'sophiasasd@cqtw.com', '7125-161-2612', 'Ruby Pagubayan', '0924-920-9502', '2021-01-07', 'Sta. maria', 'female', 23, 'Marge Abalos', 'manpower', 'probationary', '2021-01-04', NULL, 2, '10,000'),
(9, '2021-01-15 15:56:22', '2021-01-29 06:15:10', 1, 'SVK-1612612', 'Manager', '', 'Protacio', 'Pagubayan', 'qweqweqw', 'single', 'miguelmiralles@gmail.com', '0942-095-0290', 'Ruby Pagubayan', '0988-248-7282', '2021-01-05', 'Sta. Maria', 'female', 23, 'Marge Abalos', 'manpower', 'probationary', '2021-01-11', NULL, 2, '10,000'),
(10, '2021-01-15 16:00:28', '2021-01-29 06:11:40', 1, 'SVK-251612223222', 'Manager', 'sophia-de1f.jpg', 'miqweqwe', 'qwe', 'qweqwe', 'single', 'miguelmiralles@gmail.com', '0942-095-0290', 'Ruby Pagubayan', '0994-949-2929', '2021-01-13', 'qwrqwqtqw', 'female', 23, 'Marge Abalos', 'pmo', 'probationary', '2021-01-05', NULL, 1, '10,000'),
(11, '2021-01-15 16:48:53', '2021-02-18 15:03:55', 1, 'SVK-6126123123', 'Manager', 'background-053b.jpg', 'Ailys', 'rqwrqw', 'rqwrqw', 'married', 't6126@test.com', '6126-126-1261', 'Ruby Pagubayan', '0924-920-9502', '2021-01-06', 'Sta. Maria', 'male', 23, 'Marge Abalos', 'manpower', 'probationary', '2021-01-12', NULL, 2, '10,000'),
(12, '2021-01-15 16:54:27', '2021-02-18 15:59:05', 0, 'SVK-5256126124', 'manager', '131642691_3543093129072813_527034087517360528_n-b937.jpg', 'Jomel 2', 'Ortegs', '', 'single', '12512521qwew@t.setomc', '6126-124-1251', 'Ruby Pagubayan', '7125-125-1212', '2021-01-05', 'Sta. Maria', 'male', 23, 'Marge Abalos', 'manpower', 'regular', '2018-01-13', NULL, 4, '10,000'),
(13, '2021-01-24 07:16:24', '2021-01-24 07:16:24', 0, 'SVK-616212222', '15215', 'avataaars-bf81.png', 'Kalbo', 'rqwrqw', 'kablz', 'married', 'kalbz@gmail.com', '0959-292-8838', 'Rwqr qwoeqojwe', '0949-292-9292', '2021-01-06', 'qwrqwrq', 'male', 23, 'marge Abalos', 'manpower', 'floating', '2018-01-04', NULL, 2, '25,000'),
(14, '2021-01-24 07:33:14', '2021-01-24 07:33:14', 1, 'SVK-561612612', 'manager', 'avataaars-914c.png', 'Kalbo', 'Bokal', '121', 'married', 'kalbo@gmail.com', '0952-095-0232', 'roqwr qweoi', '0950-295-0290', '2021-01-13', 'QWE asd', 'male', 23, 'marge Abalos', 'manpower', 'probationary', '2021-01-05', NULL, 4, '24,222'),
(15, '2021-01-24 07:39:32', '2021-01-24 07:39:32', 0, 'SVK-561612623', 'manager', 'avataaars-0a78.png', 'Kalbo', 'Bokal', '121', 'married', 'kalbo@gmail.com', '0952-095-0232', 'roqwr qweoi', '0950-295-0290', '2021-01-13', 'QWE asd', 'male', 23, 'marge Abalos', 'manpower', 'probationary', '2021-01-05', NULL, 4, '24,222'),
(18, '2021-02-18 15:06:16', '2021-02-18 15:16:13', 1, 'SVK-442929292', 'Staff', '', 'Marge', 'Abalos', '', 'married', 'marg@tes.com', '0920-590-2929', 'Sir Jay', '0920-920-9393', '1980-02-06', 'Bulacan', 'female', 30, 'Sir Jay', 'pmo', 'probationary', '2021-02-18', NULL, 1, '10,000'),
(20, '2021-02-18 15:06:51', '2021-02-18 15:16:07', 1, 'SVK-4429292922', 'Staff', 'RYZEN T-8f6b.jpg', 'Marge', 'Abalos', '', 'married', 'marg@tes.com', '0920-590-2929', 'Sir Jay', '0920-920-9393', '1980-02-06', 'Bulacan', 'female', 30, 'Sir Jay', 'pmo', 'probationary', '2021-02-18', NULL, 1, '10,000'),
(26, '2021-02-18 15:15:06', '2021-02-18 15:56:33', 1, 'SVK-256126123123', '2qwe', '', 'qweqwewe', 'qweqweqw', 'wqeqwe', 'single', '123qwew@.testomc', '6126-124-12', 'qweqweqw', '0890-902-3490', '2021-02-11', 'qwe', 'male', 23, 'qweqwe', 'manpower', 'probationary', '2021-02-09', NULL, 4, '412,242'),
(28, '2021-02-18 15:17:42', '2021-02-18 15:56:51', 1, 'SVK-61232412512', 'qwe', '', 'qweqwe', 'eeeee', 'ee', 'married', 'rqwr@tset.com', '8678-678-6786', 'rqwrqwr', '2412-512-5122', '2021-02-03', 'qweqwe', 'male', 23, 'qwe', 'pmo', 'floating', '2021-02-02', NULL, 1, '124,124'),
(29, '2021-02-18 15:49:10', '2021-02-18 15:56:31', 1, 'SVK-52512512512', 'qweqwe', 'avatar-13a4.png', 'qweqwe', 'qweqwe', 'qweqwe', 'single', 'qwerqwr@est.com', '6216-126-1261', 'qweqweqwe', '1241-241-2412', '2021-02-02', 'qweqwe', 'male', 23, 'qweqwe', 'manpower', 'probationary', '2021-02-08', NULL, 4, '24,412'),
(30, '2021-02-18 16:01:54', '2021-02-18 17:58:41', 0, 'SVK-5216126122', 'qqwe', 'xiao-81010b.png', 'Marie', 'Abaalos', '', 'married', 'amrg@tset.com', '6716-126-1261', 'aqqwe', '6126-262-2226', '2021-02-17', 'qwe', 'female', 23, 'qwee', 'pmo', 'regular', '2021-02-09', NULL, 1, '10,000');

-- --------------------------------------------------------

--
-- Table structure for table `government_id`
--

CREATE TABLE `government_id` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `idNumber` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `employeeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `government_id`
--

INSERT INTO `government_id` (`identifier`, `createdDate`, `updatedDate`, `deleted`, `idNumber`, `image`, `name`, `employeeId`) VALUES
(1, '2021-01-15 16:54:34', '2021-01-15 16:54:34', 0, '5126-1261-2612', '132003924_3543093802406079_5870639738555514895_n-9621.jpg', 'pagibig', 12),
(2, '2021-01-15 16:54:34', '2021-01-15 16:54:34', 0, '16-2612612-4', '132001341_3543093689072757_1416384626553829412_n-0bd9.jpg', 'sss', 12),
(3, '2021-01-15 16:54:34', '2021-01-15 16:54:34', 0, '1712-5412-5612', '131937726_3543093585739434_5810274949638053519_n-d29a.jpg', 'philhealth', 12),
(4, '2021-01-15 16:54:34', '2021-01-15 16:54:34', 0, '612-612-312-412', '131771078_3543093245739468_8482862111163747821_n-3d3d.jpg', 'tin', 12),
(5, '2021-01-24 07:33:31', '2021-01-24 07:33:31', 0, '12-6126126-1', 'Screenshot_20210111_072539_com-73f2.jpg', 'sss', 14),
(6, '2021-01-24 07:33:31', '2021-01-24 07:33:31', 0, '261-261-212-121', 'Screenshot_20210120_061631_com-d7b2.jpg', 'tin', 14),
(7, '2021-01-24 07:39:42', '2021-01-24 07:39:42', 0, '12-6126126-1', 'Screenshot_20210111_072539_com-bd6d.jpg', 'sss', 15),
(8, '2021-01-24 07:39:42', '2021-01-24 07:39:42', 0, '261-261-212-121', 'Screenshot_20210120_061631_com-2088.jpg', 'tin', 15),
(9, '2021-01-24 07:39:42', '2021-01-24 07:39:42', 0, '6126-1261-2612', 'background-79410.jpg', 'pagibig', 15),
(10, '2021-01-24 07:39:42', '2021-01-24 07:39:42', 0, '1261-2612-6126', 'background-f002.jpg', 'philhealth', 15),
(11, '2021-01-29 02:31:26', '2021-01-29 02:31:26', 0, '51-2512312-3', 'Screenshot_20210127_205127_com-74d0.jpg', 'sss', 10),
(12, '2021-01-29 02:31:26', '2021-01-29 02:31:26', 0, '745-754-234-214', 'Screenshot_20210127_205124_com-69ce.jpg', 'tin', 10),
(13, '2021-01-29 02:31:26', '2021-01-29 02:31:26', 0, '6126-1261-2612', 'Screenshot_20210127_204955_com-1e101.jpg', 'philhealth', 10),
(14, '2021-01-29 02:32:55', '2021-01-29 02:32:55', 0, '5151-2512-5555', 'Screenshot_20210127_205127_com-cdf9.jpg', 'pagibig', 10),
(15, '2021-01-29 03:44:58', '2021-01-29 03:44:58', 0, '2112-3123-1231', 'RYZEN T-b96f.jpg', 'philhealth', 6),
(16, '2021-01-29 03:44:58', '2021-01-29 03:44:58', 0, '9678-9678-6787', 'RYZEN T-f4b9.jpg', 'pagibig', 6),
(17, '2021-01-29 03:44:58', '2021-01-29 03:44:58', 0, '678-678-678-678', 'RYZEN T-6e9a.jpg', 'tin', 6),
(18, '2021-01-29 03:44:58', '2021-01-29 03:44:58', 0, '12-3123455-2', 'RYZEN T-2fc9.jpg', 'sss', 6),
(19, '2021-02-18 15:06:51', '2021-02-18 15:06:51', 0, '12-5126126-2', 'Screenshot_20210127_204955_com-0f31.jpg', 'sss', 20),
(20, '2021-02-18 15:06:51', '2021-02-18 15:06:51', 0, '6126-1261-2123', 'Screenshot_20210127_205119_com-1b53.jpg', 'philhealth', 20),
(21, '2021-02-18 15:06:51', '2021-02-18 15:06:51', 0, '677-124-124-124', 'Screenshot_20210203_210814_com-d323.jpg', 'tin', 20),
(22, '2021-02-18 15:49:25', '2021-02-18 15:49:25', 0, '1251-2512-2', 'Screenshot_20210127_205124_com-58eb.jpg', 'pagibig', 29),
(23, '2021-02-18 15:49:25', '2021-02-18 15:49:25', 0, '512-512-222-22', 'Screenshot_20210127_205115_com-5d97.jpg', 'tin', 29),
(24, '2021-02-18 15:49:25', '2021-02-18 15:49:25', 0, '12-5125125-1', 'Screenshot_20210127_205124_com-c9d5.jpg', 'sss', 29),
(25, '2021-02-18 15:49:25', '2021-02-18 15:49:25', 0, '1231-2512-5125', 'Screenshot_20210203_210814_com-c3ab.jpg', 'philhealth', 29),
(26, '2021-02-18 16:02:00', '2021-02-18 16:02:00', 0, '6126-1231-2323', 'Screenshot_20210127_004933_com-87cc.jpg', 'pagibig', 30),
(27, '2021-02-18 16:02:00', '2021-02-18 16:02:00', 0, '61-2612612-6', 'Screenshot_20210127_205124_com-0a02.jpg', 'sss', 30),
(28, '2021-02-18 16:02:00', '2021-02-18 16:02:00', 0, '5125-1251-2521', 'Screenshot_20210203_014152_com-a33d.jpg', 'philhealth', 30),
(29, '2021-02-18 16:02:00', '2021-02-18 16:02:00', 0, '612-612-312-322', 'Screenshot_20210111_065609_com-7b7c.jpg', 'tin', 30);

-- --------------------------------------------------------

--
-- Table structure for table `leave`
--

CREATE TABLE `leave` (
  `identifier` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `leaveType` enum('vacation leave','service incentive leave','sick leave') NOT NULL,
  `requestDate` date NOT NULL,
  `leaveStartDate` date NOT NULL,
  `leaveEndDate` date NOT NULL,
  `totalDaysPaid` int(11) NOT NULL,
  `reasonForLeave` varchar(255) NOT NULL,
  `status` enum('pending','rejected','approved') NOT NULL,
  `employeeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leave`
--

INSERT INTO `leave` (`identifier`, `createdDate`, `updatedDate`, `deleted`, `leaveType`, `requestDate`, `leaveStartDate`, `leaveEndDate`, `totalDaysPaid`, `reasonForLeave`, `status`, `employeeId`) VALUES
(1, '2021-02-13 01:36:17', '2021-03-17 12:21:44', 0, 'vacation leave', '2020-12-27', '2021-02-06', '2021-01-07', 2, 'Lagnat', 'rejected', 2),
(2, '2021-02-13 04:56:02', '2021-02-13 04:56:02', 0, 'sick leave', '2021-01-03', '2021-02-13', '2021-01-14', 2, 'HAHAHHA', 'approved', 1),
(3, '2021-02-13 04:56:42', '2021-03-17 12:21:52', 0, 'sick leave', '2020-12-29', '2021-02-08', '2021-01-09', 1, 'HAHAHHA123', 'rejected', 2),
(4, '2021-02-13 08:59:09', '2021-02-13 08:59:09', 0, 'sick leave', '2021-01-03', '2021-02-13', '2021-01-14', 1, 'HAHAHHA', 'approved', 4),
(6, '2021-02-13 09:16:41', '2021-02-13 09:16:41', 0, 'sick leave', '2021-02-13', '2021-02-17', '2021-02-18', 1, 'wee', 'approved', 2),
(7, '2021-02-13 09:18:53', '2021-02-13 09:18:53', 0, 'sick leave', '2021-02-13', '2021-02-02', '2021-02-04', 2, 'qq', 'pending', 6),
(8, '2021-02-13 09:19:37', '2021-02-13 09:19:37', 0, 'sick leave', '2021-02-13', '2021-02-08', '2021-02-09', 1, 'Wala lang po', 'pending', 1),
(9, '2021-02-13 09:20:41', '2021-02-13 09:20:41', 0, 'sick leave', '2021-02-13', '2021-02-23', '2021-02-24', 1, 'qweee', 'approved', 1),
(10, '2021-02-14 13:22:24', '2021-02-14 13:22:24', 0, 'service incentive leave', '2021-02-14', '2021-02-08', '2021-02-09', 1, 'qwee', 'approved', 12),
(11, '2021-02-14 13:22:38', '2021-02-14 13:22:38', 0, 'service incentive leave', '2021-02-14', '2021-02-16', '2021-02-17', 1, 'qwee', 'approved', 12),
(12, '2021-02-18 16:05:20', '2021-03-17 12:21:59', 0, 'sick leave', '2021-02-14', '2021-02-20', '2021-02-21', 1, 'wweqeqeqqq', 'pending', 2),
(22, '2021-03-16 15:14:55', '2021-03-16 15:14:55', 0, 'sick leave', '2021-03-16', '2021-03-17', '2021-03-18', 2, 'qweee', 'approved', 1),
(23, '2021-03-16 15:16:13', '2021-03-17 14:37:30', 1, 'sick leave', '2021-03-06', '2021-04-10', '2021-04-11', 2, 'qweee112333', 'approved', 2),
(24, '2021-03-16 15:17:42', '2021-03-17 12:31:30', 0, 'vacation leave', '2021-03-10', '2021-03-17', '2021-03-20', 4, 'qweeqqq', 'approved', 1),
(25, '2021-03-17 12:22:11', '2021-03-17 14:32:27', 1, 'vacation leave', '2021-03-17', '2021-03-23', '2021-03-25', 3, 'weqweqwee', 'approved', 2),
(26, '2021-03-17 12:33:50', '2021-03-17 14:33:12', 1, 'sick leave', '2021-03-17', '2021-03-25', '2021-03-26', 2, '', 'approved', 2),
(27, '2021-03-17 14:42:03', '2021-03-17 14:42:03', 0, 'service incentive leave', '2021-03-17', '2021-03-16', '2021-03-19', 4, '', 'approved', 12),
(28, '2021-03-17 14:42:52', '2021-03-17 15:02:03', 0, 'service incentive leave', '0000-00-00', '0000-00-00', '0000-00-00', 3, 'eqwrqrq', 'pending', 12),
(29, '2021-03-17 15:05:15', '2021-03-17 15:05:15', 0, 'service incentive leave', '0000-00-00', '0000-00-00', '0000-00-00', 3, 'qwe', 'approved', 12),
(30, '2021-03-17 15:06:17', '2021-03-17 15:06:57', 0, 'service incentive leave', '2021-03-31', '2021-04-02', '2021-04-02', 1, 'weeqeeeqeq', 'pending', 12);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `identifier` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePicture` varchar(255) NOT NULL DEFAULT '',
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`identifier`, `username`, `password`, `profilePicture`, `firstName`, `lastName`) VALUES
(1, 'admin1', '$argon2i$v=19$m=4096,t=3,p=1$ELnXdKDUbIdED2LdGPOpYg$/ecyxEEPF0WF/5uTCK4SdhqbWy20Dhtrq5jZOJ1ZNxk', '65878755_1104899483052704_1577647234210594816_o-42cc.jpg', 'Jomel', 'Ortega');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `FK_9b44dcf8132ae6af5d0efcaec1c` (`employeeId`);

--
-- Indexes for table `appraisal`
--
ALTER TABLE `appraisal`
  ADD PRIMARY KEY (`identifier`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`identifier`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `FK_79168b6c01d01766f5b99dcd741` (`employeeId`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`identifier`),
  ADD UNIQUE KEY `IDX_3303a7ddb027e045d41573dbfb` (`employeeIdNumber`),
  ADD KEY `FK_ec50cda58bc1e0e8510033b1632` (`divisionId`);

--
-- Indexes for table `government_id`
--
ALTER TABLE `government_id`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `FK_00d197c3abcea4aeb07348e1d06` (`employeeId`);

--
-- Indexes for table `leave`
--
ALTER TABLE `leave`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `FK_b8ff759530cff3e5f39f7dd0102` (`employeeId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`identifier`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `appraisal`
--
ALTER TABLE `appraisal`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `government_id`
--
ALTER TABLE `government_id`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `leave`
--
ALTER TABLE `leave`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_9b44dcf8132ae6af5d0efcaec1c` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`identifier`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `FK_79168b6c01d01766f5b99dcd741` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`identifier`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FK_ec50cda58bc1e0e8510033b1632` FOREIGN KEY (`divisionId`) REFERENCES `division` (`identifier`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `government_id`
--
ALTER TABLE `government_id`
  ADD CONSTRAINT `FK_00d197c3abcea4aeb07348e1d06` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`identifier`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `leave`
--
ALTER TABLE `leave`
  ADD CONSTRAINT `FK_b8ff759530cff3e5f39f7dd0102` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`identifier`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
