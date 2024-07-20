-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2024 at 11:47 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eccomerce_makan`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `id_player` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `quantity` int(100) NOT NULL,
  `price` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `id_player`, `ProductName`, `gambar`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(135, 17, 'Lumpia Udang', 'uploads/1719216083658-image_2024-06-24_150121997.png', 1, '200000', '2024-07-02 07:33:42', '2024-07-02 07:33:42'),
(138, 17, 'Pizza', 'uploads/1719403214037-image_2024-06-26_185953117.png', 1, '100000', '2024-07-12 14:05:17', '2024-07-12 14:05:17'),
(148, 21, 'Risoles Mayo', 'uploads/1721465834086-image_2024-07-20_155549433.png', 3, '25000', '2024-07-20 09:45:19', '2024-07-20 09:45:41');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id_player` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `birth` date NOT NULL,
  `gender` enum('Laki - Laki','Perempuan') NOT NULL,
  `phone` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `role` varchar(200) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id_player`, `name`, `email`, `password`, `birth`, `gender`, `phone`, `refresh_token`, `role`, `profile`, `address`, `createdAt`, `updatedAt`) VALUES
(2, 'putra', 'putra@gmail.com', '$2b$10$XXNln8Vdpcly1gU1/1jwbus1ZODALd1R8b.yv7CGmnTq16vLANQHG', '2024-06-06', 'Laki - Laki', '123321232', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MiwibmFtZSI6InB1dHJhIiwiZW1haWwiOiJwdXRyYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJhZGRyZXNzIjoiIiwiaWF0IjoxNzIxNDYxODU5LCJleHAiOjE3MjE1NDgyNTl9.grWLH6p9DeT5kFRZK-ENyXpxfCXBhV-H5bgK80T5J_s', 'admin', '0', '', '2024-06-25 16:00:35', '2024-07-20 07:50:59'),
(17, 'User', 'user@gmail.com', '$2b$10$evdGD3BsVsVDo9BAstKNYupUiZYlH8sScwH7hsVAOz18AzInKzYz2', '2024-06-01', 'Laki - Laki', '222222222222', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MTcsIm5hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiYWRkcmVzcyI6IkFsYW1hdCBCYXJ1XG4iLCJpYXQiOjE3MjE0NjEzNTQsImV4cCI6MTcyMTU0Nzc1NH0.o-UngLmpuJBZalRQl-WEIF3jC-y9IQTciYTPn9LeEWg', 'user', 'profile-img\\profileImage-1719831030890.jpg', 'Alamat Baru\n', '2024-06-26 04:47:39', '2024-07-20 07:42:34'),
(21, 'aaa ', 'a@gmail.com', '$2b$10$FkPV2jy19m91uhF38xB7P.SsptwJCuh/hPlEYcsYlngWP6Jzw6AJO', '2024-06-25', '', '2312312312', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MjEsIm5hbWUiOiJhYWEgIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiYWRkcmVzcyI6ImFhYWFhYWFhYWFhYSIsImlhdCI6MTcyMTQ2NDA3NCwiZXhwIjoxNzIxNTUwNDc0fQ.rwjv9ljn0IwZnAzN8Uii6JXOfOHqL9qmgYZ3uBEHruQ', 'user', 'profile-img\\profileImage-1721058271038.png', 'aaaaaaaaaaaa', '2024-06-27 06:31:20', '2024-07-20 09:41:09');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `Gambar` varchar(255) NOT NULL,
  `Quantity` varchar(255) DEFAULT NULL,
  `Price` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `ProductName`, `Gambar`, `Quantity`, `Price`, `Description`, `createdAt`, `updatedAt`) VALUES
(33, 'Risoles Mayo', 'uploads\\1721465834086-image_2024-07-20_155549433.png', '11', '25000', 'Risol mayo adalah camilan lezat dengan isian ayam, sayuran, dan saus mayo creamy. Dibungkus dengan kulit risol tipis dan digoreng hingga renyah, risol mayo cocok untuk camilan atau hidangan pembuka.', '2024-07-20 08:57:14', '2024-07-20 08:57:14'),
(34, 'Bakso Tahu', 'uploads\\1721465969944-image_2024-07-20_155850168.png', '32', '23499', 'Bakso tahu adalah bola-bola daging yang lembut dan juicy, terbuat dari campuran daging sapi atau ayam dengan tahu yang menggantikan sebagian daging. Dihidangkan dalam kuah kaldu yang gurih, bakso tahu memberikan kombinasi rasa daging yang kaya dan kelembu', '2024-07-20 08:59:29', '2024-07-20 08:59:29'),
(35, 'Bolen Lilit', 'uploads\\1721466089274-image_2024-07-20_160057475.png', '12', '18000', 'Bolen lilit adalah camilan khas dengan adonan pastry yang renyah dan isian daging cincang yang bumbu khas. Adonan pastry dibentuk menjadi lilitan yang cantik dan diisi dengan campuran daging yang telah dibumbui, lalu dipanggang hingga kecokelatan. Bolen l', '2024-07-20 09:01:29', '2024-07-20 09:01:29'),
(36, 'Frozen Rolade', 'uploads\\1721466223923-image_2024-07-20_160314795.png', '42', '35000', 'Rolade adalah hidangan daging yang dipotong tipis dan digulung dengan isian yang lezat, seperti campuran daging cincang, sayuran, atau keju. Setelah digulung, rolade biasanya dipanggang atau dimasak dalam saus hingga matang sempurna. Teksturnya yang lembu', '2024-07-20 09:03:43', '2024-07-20 09:03:43'),
(37, 'Donat Frozen', 'uploads\\1721466370491-image_2024-07-20_160546699.png', '11', '30000', 'Donat adalah kue goreng yang empuk dan manis, berbentuk bulat dengan lubang di tengah. Dikenal dengan tekstur lembut dan rasa manis, donat biasanya dilapisi dengan gula halus, cokelat, atau glasir. Variasi isian seperti selai atau krim juga sering ditamba', '2024-07-20 09:06:10', '2024-07-20 09:08:48'),
(38, 'Kentang Frozen', 'uploads\\1721466684116-image_2024-07-20_161045476.png', '11', '15000', 'Kentang frozen adalah kentang yang telah dipotong dan dibekukan untuk kemudahan penyimpanan dan persiapan. Biasanya disajikan dalam bentuk kentang goreng, wedges, atau potongan dadu, kentang frozen hanya perlu digoreng atau dipanggang untuk menghasilkan k', '2024-07-20 09:11:24', '2024-07-20 09:11:24'),
(39, 'Custom Pudding', 'uploads\\1721467032651-image_2024-07-20_161535016.png', '7', '32090', 'Custom pudding adalah pencuci mulut yang dapat disesuaikan dengan berbagai pilihan rasa dan topping sesuai selera. Dibuat dari campuran bahan dasar seperti susu, gula, dan telur, pudding ini memiliki tekstur lembut dan creamy. Dengan pilihan rasa seperti ', '2024-07-20 09:17:12', '2024-07-20 09:17:12'),
(40, 'Egg Tart (6pcs)', 'uploads\\1721467140218-image_2024-07-20_161810828.png', '2', '43000', 'Egg tart adalah kue kecil yang populer dengan kulit pastry renyah dan isian custard telur yang lembut dan creamy. Kulitnya yang berlapis memberikan tekstur krispi, sementara isian custard yang manis dan lembut menciptakan kombinasi rasa yang memikat. Egg ', '2024-07-20 09:19:00', '2024-07-20 09:19:00'),
(41, 'Minyak Goreng (2L)', 'uploads\\1721467240079-image_2024-07-20_161934698.png', '8', '39000', ' Tentu! Berikut deskripsi singkat untuk minyak goreng Sunco:  Minyak Goreng Sunco  Minyak Goreng Sunco adalah minyak goreng berkualitas tinggi yang dirancang untuk memberikan hasil gorengan yang renyah dan lezat. Terbuat dari bahan nabati pilihan, minyak ', '2024-07-20 09:20:40', '2024-07-20 09:26:31'),
(42, 'Peyek Kacang (5L)', 'uploads\\1721467312584-image_2024-07-20_162138729.png', '6', '45000', 'Peyek kacang adalah camilan krispi khas Indonesia yang terbuat dari adonan tepung beras dan bumbu, dicampur dengan kacang tanah. Dihasilkan dengan cara digoreng hingga keemasan, peyek kacang menawarkan tekstur renyah dan rasa gurih yang menggugah selera. ', '2024-07-20 09:21:52', '2024-07-20 09:21:52'),
(43, 'Cuanki Instan', 'uploads\\1721467357682-image_2024-07-20_162216037.png', '3', '13000', 'Cuanki instan adalah mie kuah siap saji yang praktis dan lezat, terinspirasi dari hidangan cuanki tradisional. Menghadirkan rasa gurih dengan bumbu dan rempah yang khas, cuanki instan biasanya dilengkapi dengan potongan daging, sayuran, dan bakso. Cukup d', '2024-07-20 09:22:37', '2024-07-20 09:22:37');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `gross_amount` decimal(10,2) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_address` text DEFAULT NULL,
  `payment_status` enum('Pending','Settlement','Expire','Cancel') DEFAULT 'Pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `transaction_item_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sub_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idplayer` (`id_player`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id_player`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD PRIMARY KEY (`transaction_item_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `transaction_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=557;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `idplayer` FOREIGN KEY (`id_player`) REFERENCES `players` (`id_player`);

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `transaction_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
