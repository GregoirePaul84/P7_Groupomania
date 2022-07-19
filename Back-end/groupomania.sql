-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 19 juil. 2022 à 09:06
-- Version du serveur : 8.0.28
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `like_number` int NOT NULL DEFAULT '0',
  `isLiked` tinyint(1) NOT NULL DEFAULT '0',
  `dislike_number` int NOT NULL DEFAULT '0',
  `isDisliked` tinyint(1) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1875 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `comment_image`
--

DROP TABLE IF EXISTS `comment_image`;
CREATE TABLE IF NOT EXISTS `comment_image` (
  `comment_image_id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dislikes`
--

DROP TABLE IF EXISTS `dislikes`;
CREATE TABLE IF NOT EXISTS `dislikes` (
  `dislikes_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `isDisliked` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dislikes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `likes_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `text_post` varchar(255) DEFAULT NULL,
  `text_comment` varchar(255) DEFAULT NULL,
  `isLiked` tinyint(1) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`likes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1518 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `like_number` int NOT NULL DEFAULT '0',
  `isLiked` tinyint(1) NOT NULL DEFAULT '0',
  `dislike_number` int NOT NULL DEFAULT '0',
  `isDisliked` tinyint(1) NOT NULL DEFAULT '0',
  `comments_number` int NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=451 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `post_image`
--

DROP TABLE IF EXISTS `post_image`;
CREATE TABLE IF NOT EXISTS `post_image` (
  `post_image_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `profil_image`
--

DROP TABLE IF EXISTS `profil_image`;
CREATE TABLE IF NOT EXISTS `profil_image` (
  `profil_image_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`profil_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `profil_image`
--

INSERT INTO `profil_image` (`profil_image_id`, `image_url`, `user_id`, `created`) VALUES
(12, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:23:59'),
(13, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:24:18'),
(14, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg+\"_profil\"', 9, '2022-05-09 14:26:35'),
(15, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:27:25'),
(16, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:58:09'),
(17, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:59:13'),
(18, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:59:37'),
(19, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 14:59:53'),
(20, 'http://localhost:3000/images/fjLgKisQ_400x400.jpgfile.jpg', 9, '2022-05-09 15:03:14'),
(21, 'http://localhost:3000/images/zeus.pngfile.png', 9, '2022-05-09 15:13:35');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_naissance` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `profil_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `date_naissance`, `email`, `password`, `tel`, `adresse`, `profil_pic`, `bio`, `created`, `isAdmin`) VALUES
(5, 'Hermès', 'Dieu des messagers', '2022-06-10', 'hermes@gmail.com', '$2b$10$Fan38y39Kyxqcb6whnJrLOFcn9IFDgZ2D1p8ch0w0se40xPWVCM1y', '0654782145', '10 rue mercure', 'http://localhost:3000/images/Hermès.PNGfile.png', 'Bio de Hermès', '2022-07-11 13:13:39', 0),
(20, 'Narcisse', 'Le narcissique', 'null', 'narcisse@gmail.com', '$2b$10$gTuopjg0uG4Han92KdxmpeoGiWQ.5QI7E5d39SprSMV5Okgrv4DJi', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:25:41', 0),
(21, 'Héphaïstos', 'Dieu des forgerons', 'null', 'hephaistos@gmail.com', '$2b$10$AycF9AVoHR9NnjF5PTKur.89V5cirzrY7WMfjpRhr13ifSOPV4NM2', 'null', 'null', 'http://localhost:3000/images/hephaistos.PNGfile.png', 'null', '2022-07-15 13:25:32', 0),
(23, 'Athéna', 'Déesse de la sagesse', 'null', 'athena@gmail.com', '$2b$10$WaBM4l65any0SiyWbQd3H.DPZ5lTqnac.OWFZ19UYq4LLHmG/LbyG', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:25:18', 0),
(24, 'Aphrodite', 'Déesse de l\'amour', '2022-06-17', 'aphrodite@gmail.com', '$2b$10$gOceqTvGIQcWtxKbaEYfe.2z.RoXsTASbNjVv91DdGP7CR53N1rLq', '0654782145', '2 rue Pégase', 'http://localhost:3000/images/Aphrodite.PNGfile.png', '', '2022-07-04 17:07:40', 0),
(25, 'Dieu du soleil', 'Apollon', 'null', 'apollon@gmail.com', '$2b$10$SqljZfRwYj.SaxpOJHkw2OGJMpSsd7xLr1.jgzvNAqPKEiyz3uDOy', 'null', 'null', 'http://localhost:3000/images/Apollon.PNGfile.png', 'null', '2022-07-15 13:25:04', 0),
(27, 'Dieu du vin', 'Dionysos', 'null', 'dionysos@gmail.com', '$2b$10$giVUvjwJ/afQskmHicheluk9iBpvCbsQHLw3GP3nUJkiaJPLTTvUC', 'null', 'null', 'http://localhost:3000/images/Dionysos.PNGfile.png', 'null', '2022-07-15 13:24:51', 0),
(28, 'Fille d\'Icarios', 'Pénélope', 'null', 'penelope@gmail.com', '$2b$10$9tKvw74LayOXw4ZN4UKmgeIGKf8kMhgFRxNbKJUKYHpFuUAMYcz0i', 'null', 'null', 'http://localhost:3000/images/penelope.PNGfile.png', 'null', '2022-07-15 13:24:35', 0),
(29, 'Artémis', 'Déesse de la chasse', 'null', 'artemis@gmail.com', '$2b$10$5hlTBKdkberDjjNmc4QhHeC6st4uK6QJNptiKsJvJJFCiL0CT/JBy', 'null', 'null', 'http://localhost:3000/images/artemis.PNGfile.png', 'null', '2022-07-15 13:24:16', 0),
(31, 'Poseidon', 'Dieu des mers', '2022-06-10', 'poseidon@gmail.com', '$2b$10$EzGCk36g/mih/bQnIR/83eZCEj8mtNCXvUaC1oit4ZUCst7JC0kx.', '0487512465', '15 rue de l\'hippocampe', 'http://localhost:3000/images/poseidon.PNGfile.png', 'Bonjour', '2022-07-07 15:28:39', 0),
(34, 'Héra', 'Déesse du mariage', '2022-06-16', 'hera@gmail.com', '$2b$10$9BxAv7BMKqkZvJYTy.E6KeoinGorV6CDiD/ZQwAm4BPHWGMforMu.', 'null', 'null', 'http://localhost:3000/images/Héra.PNGfile.png', 'null', '2022-07-15 13:23:57', 0),
(35, 'Eol', 'Dieu du vent', '2022-07-22', 'eol@gmail.com', '$2b$10$klj4O5VRoCfKU/XRugAhDebPMrRqGMzYz.b0s8PimgoxsdlrL9F2W', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:23:40', 0),
(36, 'Hadès', 'Dieu des enfers', 'null', 'hades@gmail.com', '$2b$10$n86pzx.v0tEzuLYa2XkQKutkflUI8futU2e.EeR4cgsaG5yIBnN4S', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:22:58', 0),
(38, 'Zeus', 'Dieu des dieux', 'null', 'zeus@gmail.com', '$2b$10$PVQcYHkt5RAySNli.qF3LefJUZajwPRGHADodt.6FObgLY./WcwiS', '0457816495', '2 rue Pégase', 'http://localhost:3000/images/zeus_arte.PNGfile.png', 'null', '2022-07-15 14:03:10', 0),
(39, 'Arès', 'Dieu de la guerre', 'null', 'ares@gmail.com', '$2b$10$RpyOdIlw9aUWbDY6EiIYbuuNzW9GGWMa5bcWkJywNyWkVpkKDJzl6', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:37:24', 0),
(47, 'Groupomania', 'Admin', 'null', 'groupomania@gmail.com', '$2b$10$oTDL/21KevHRskU4C02.Ouo6ps8NBlM7wFfrQ9xYgH9h.y4.Y40QO', 'null', 'null', 'http://localhost:3000/images/icon.pngfile.png', 'Admin chez Groupomania', '2022-07-18 17:46:21', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
