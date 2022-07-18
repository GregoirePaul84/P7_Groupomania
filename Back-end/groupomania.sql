-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 15 juil. 2022 à 15:00
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
) ENGINE=InnoDB AUTO_INCREMENT=1867 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `text`, `image_url`, `like_number`, `isLiked`, `dislike_number`, `isDisliked`, `created`) VALUES
(1864, 434, 31, 'com', NULL, 0, 0, 0, 0, '2022-07-12 10:49:19'),
(1865, 434, 38, 'salut', NULL, 0, 0, 0, 0, '2022-07-15 10:48:38'),
(1866, 439, 38, 'commentaire', NULL, 0, 0, 1, 0, '2022-07-15 11:53:51');

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
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment_image`
--

INSERT INTO `comment_image` (`comment_image_id`, `comment_id`, `image_url`, `user_id`, `created`) VALUES
(196, 1862, 'http://localhost:3000/images/comment/1536057558.jpgfile.jpg', 31, '2022-07-11 11:20:57');

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
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `dislikes`
--

INSERT INTO `dislikes` (`dislikes_id`, `post_id`, `comment_id`, `user_id`, `isDisliked`) VALUES
(368, 434, NULL, 38, 1),
(370, NULL, 1866, 38, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=1488 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`likes_id`, `post_id`, `comment_id`, `user_id`, `text_post`, `text_comment`, `isLiked`, `created`) VALUES
(1482, 441, NULL, 38, 'Bonjour', NULL, 1, '2022-07-15 11:40:17'),
(1485, 438, NULL, 38, 'svsv', NULL, 1, '2022-07-15 11:43:31'),
(1486, 439, NULL, 31, 'null', NULL, 1, '2022-07-15 13:48:05');

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
) ENGINE=InnoDB AUTO_INCREMENT=442 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `text`, `image_url`, `like_number`, `isLiked`, `dislike_number`, `isDisliked`, `comments_number`, `created`) VALUES
(433, 38, 'Salut', NULL, 2, 0, 0, 0, 0, '2022-07-11 12:53:16'),
(434, 38, NULL, 'http://localhost:3000/images/post/754A777FNLAUTQB32LAGZOTEJQ.jpgfile.jpg', 1, 0, 1, 1, 2, '2022-07-11 12:53:34'),
(435, 31, 'fafzr', 'http://localhost:3000/images/post/17936fca25be3c246a2c34b31d1149db.large.jpgfile.jpg', 0, 0, 0, 0, 0, '2022-07-12 14:56:59'),
(436, 31, NULL, 'http://localhost:3000/images/post/1536057558.jpgfile.jpg', 0, 0, 0, 0, 0, '2022-07-12 15:34:14'),
(437, 31, NULL, 'http://localhost:3000/images/post/Artemis_hera.pngfile.png', 0, 0, 0, 0, 0, '2022-07-12 15:34:29'),
(438, 31, 'svsv', NULL, 1, 1, 0, 0, 0, '2022-07-12 16:22:21'),
(439, 31, NULL, 'http://localhost:3000/images/post/50NuancesDeGrecs-2.jpgfile.jpg', 1, 1, 0, 0, 1, '2022-07-12 16:24:50'),
(440, 38, 'post', NULL, 0, 0, 0, 0, 0, '2022-07-15 10:48:43'),
(441, 22, 'Bonjour', NULL, 1, 1, 0, 0, 0, '2022-07-15 11:28:46');

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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `post_image`
--

INSERT INTO `post_image` (`post_image_id`, `post_id`, `image_url`, `user_id`, `created`) VALUES
(100, 434, 'http://localhost:3000/images/post/754A777FNLAUTQB32LAGZOTEJQ.jpgfile.jpg', 38, '2022-07-11 12:53:34'),
(101, 435, 'http://localhost:3000/images/post/17936fca25be3c246a2c34b31d1149db.large.jpgfile.jpg', 31, '2022-07-12 14:56:59'),
(102, 436, 'http://localhost:3000/images/post/1536057558.jpgfile.jpg', 31, '2022-07-12 15:34:14'),
(103, 437, 'http://localhost:3000/images/post/Artemis_hera.pngfile.png', 31, '2022-07-12 15:34:29'),
(104, 439, 'http://localhost:3000/images/post/50NuancesDeGrecs-2.jpgfile.jpg', 31, '2022-07-12 16:24:50');

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
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `date_naissance`, `email`, `password`, `tel`, `adresse`, `profil_pic`, `bio`, `created`) VALUES
(5, 'Hermès', 'Dieu des messagers', '2022-06-10', 'hermes@gmail.com', '$2b$10$Fan38y39Kyxqcb6whnJrLOFcn9IFDgZ2D1p8ch0w0se40xPWVCM1y', '0654782145', '10 rue mercure', 'http://localhost:3000/images/Hermès.PNGfile.png', 'Bio de Hermès', '2022-07-11 13:13:39'),
(20, 'Narcisse', 'Le narcissique', 'null', 'narcisse@gmail.com', '$2b$10$gTuopjg0uG4Han92KdxmpeoGiWQ.5QI7E5d39SprSMV5Okgrv4DJi', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:25:41'),
(21, 'Héphaïstos', 'Dieu des forgerons', 'null', 'hephaistos@gmail.com', '$2b$10$AycF9AVoHR9NnjF5PTKur.89V5cirzrY7WMfjpRhr13ifSOPV4NM2', 'null', 'null', 'http://localhost:3000/images/hephaistos.PNGfile.png', 'null', '2022-07-15 13:25:32'),
(23, 'Athéna', 'Déesse de la sagesse', 'null', 'athena@gmail.com', '$2b$10$WaBM4l65any0SiyWbQd3H.DPZ5lTqnac.OWFZ19UYq4LLHmG/LbyG', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:25:18'),
(24, 'Aphrodite', 'Déesse de l\'amour', '2022-06-17', 'aphrodite@gmail.com', '$2b$10$gOceqTvGIQcWtxKbaEYfe.2z.RoXsTASbNjVv91DdGP7CR53N1rLq', '0654782145', '2 rue Pégase', 'http://localhost:3000/images/Aphrodite.PNGfile.png', '', '2022-07-04 17:07:40'),
(25, 'Dieu du soleil', 'Apollon', 'null', 'apollon@gmail.com', '$2b$10$SqljZfRwYj.SaxpOJHkw2OGJMpSsd7xLr1.jgzvNAqPKEiyz3uDOy', 'null', 'null', 'http://localhost:3000/images/Apollon.PNGfile.png', 'null', '2022-07-15 13:25:04'),
(27, 'Dieu du vin', 'Dionysos', 'null', 'dionysos@gmail.com', '$2b$10$giVUvjwJ/afQskmHicheluk9iBpvCbsQHLw3GP3nUJkiaJPLTTvUC', 'null', 'null', 'http://localhost:3000/images/Dionysos.PNGfile.png', 'null', '2022-07-15 13:24:51'),
(28, 'Fille d\'Icarios', 'Pénélope', 'null', 'penelope@gmail.com', '$2b$10$9tKvw74LayOXw4ZN4UKmgeIGKf8kMhgFRxNbKJUKYHpFuUAMYcz0i', 'null', 'null', 'http://localhost:3000/images/penelope.PNGfile.png', 'null', '2022-07-15 13:24:35'),
(29, 'Artémis', 'Déesse de la chasse', 'null', 'artemis@gmail.com', '$2b$10$5hlTBKdkberDjjNmc4QhHeC6st4uK6QJNptiKsJvJJFCiL0CT/JBy', 'null', 'null', 'http://localhost:3000/images/artemis.PNGfile.png', 'null', '2022-07-15 13:24:16'),
(31, 'Poseidon', 'Dieu des mers', '2022-06-10', 'poseidon@gmail.com', '$2b$10$EzGCk36g/mih/bQnIR/83eZCEj8mtNCXvUaC1oit4ZUCst7JC0kx.', '0487512465', '15 rue de l\'hippocampe', 'http://localhost:3000/images/poseidon.PNGfile.png', 'Bonjour', '2022-07-07 15:28:39'),
(34, 'Héra', 'Déesse du mariage', '2022-06-16', 'hera@gmail.com', '$2b$10$9BxAv7BMKqkZvJYTy.E6KeoinGorV6CDiD/ZQwAm4BPHWGMforMu.', 'null', 'null', 'http://localhost:3000/images/Héra.PNGfile.png', 'null', '2022-07-15 13:23:57'),
(35, 'Eol', 'Dieu du vent', '2022-07-22', 'eol@gmail.com', '$2b$10$klj4O5VRoCfKU/XRugAhDebPMrRqGMzYz.b0s8PimgoxsdlrL9F2W', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:23:40'),
(36, 'Hadès', 'Dieu des enfers', 'null', 'hades@gmail.com', '$2b$10$n86pzx.v0tEzuLYa2XkQKutkflUI8futU2e.EeR4cgsaG5yIBnN4S', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:22:58'),
(38, 'Zeus', 'Dieu des dieux', 'null', 'zeus@gmail.com', '$2b$10$PVQcYHkt5RAySNli.qF3LefJUZajwPRGHADodt.6FObgLY./WcwiS', '0457816495', '2 rue Pégase', 'http://localhost:3000/images/zeus_arte.PNGfile.png', 'null', '2022-07-15 14:03:10'),
(39, 'Arès', 'Dieu de la guerre', 'null', 'ares@gmail.com', '$2b$10$RpyOdIlw9aUWbDY6EiIYbuuNzW9GGWMa5bcWkJywNyWkVpkKDJzl6', 'null', 'null', 'http://localhost:3000/images/empty_profil_pic.png', 'null', '2022-07-15 13:37:24');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
