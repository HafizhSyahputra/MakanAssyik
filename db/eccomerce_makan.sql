-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 08:15 AM
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
(126, 21, 'Pizza', 'uploads/1719403214037-image_2024-06-26_185953117.png', 2, '100000', '2024-06-27 09:01:32', '2024-07-15 11:29:40'),
(127, 21, 'Lumpia Udang', 'uploads/1719216083658-image_2024-06-24_150121997.png', 2, '200000', '2024-06-27 09:01:33', '2024-07-15 16:00:44'),
(133, 25, 'Pizza', 'uploads/1719403214037-image_2024-06-26_185953117.png', 1, '100000', '2024-07-01 06:17:11', '2024-07-01 06:17:11'),
(135, 17, 'Lumpia Udang', 'uploads/1719216083658-image_2024-06-24_150121997.png', 1, '200000', '2024-07-02 07:33:42', '2024-07-02 07:33:42'),
(138, 17, 'Pizza', 'uploads/1719403214037-image_2024-06-26_185953117.png', 1, '100000', '2024-07-12 14:05:17', '2024-07-12 14:05:17');

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
(2, 'putra', 'putra@gmail.com', '$2b$10$XXNln8Vdpcly1gU1/1jwbus1ZODALd1R8b.yv7CGmnTq16vLANQHG', '2024-06-06', 'Laki - Laki', '123321232', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MiwibmFtZSI6InB1dHJhIiwiZW1haWwiOiJwdXRyYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJhZGRyZXNzIjoiIiwiaWF0IjoxNzIxMzEyNDk3LCJleHAiOjE3MjEzOTg4OTd9.2QHEgNezw4kXEGo8SBVIMKN3It-xYBBOJkDo9raUZg0', 'admin', '0', '', '2024-06-25 16:00:35', '2024-07-18 14:21:37'),
(17, 'User', 'user@gmail.com', '$2b$10$evdGD3BsVsVDo9BAstKNYupUiZYlH8sScwH7hsVAOz18AzInKzYz2', '2024-06-01', 'Laki - Laki', '222222222222', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MTcsIm5hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiYWRkcmVzcyI6IkFsYW1hdCBCYXJ1XG4iLCJpYXQiOjE3MjExODkyMTIsImV4cCI6MTcyMTI3NTYxMn0.n86TkFGsPH6v3a8Hmxr9D7gZ6Q7LCZn9ALCyzF3wRwc', 'user', 'profile-img\\profileImage-1719831030890.jpg', 'Alamat Baru\n', '2024-06-26 04:47:39', '2024-07-17 04:06:52'),
(21, 'aa', 'a@gmail.com', '$2b$10$FkPV2jy19m91uhF38xB7P.SsptwJCuh/hPlEYcsYlngWP6Jzw6AJO', '2024-06-25', 'Perempuan', '2312312312', NULL, 'user', 'profile-img\\profileImage-1721058271038.png', 'aaaaaaaaaaaa', '2024-06-27 06:31:20', '2024-07-18 14:21:30'),
(25, 'testing', 'test@gmail.com', '$2b$10$ldHnIE6Efvzd.TvBcpiuauNIO.lR8W7ntItTm8yH9t1nZVZJPQs6S', '2024-07-11', 'Laki - Laki', '08770853577', NULL, 'user', 'profile-img\\profileImage-1719812516562.png', '', '2024-07-01 05:16:10', '2024-07-01 10:50:10');

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

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `order_id`, `gross_amount`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `payment_status`, `payment_method`, `created_at`) VALUES
(183, 'ORDER-1721309944347', '625500.00', 'aa', 'a@gmail.com', '2312312312', 'aaaaaaaaaaaa', '', 'qris', '2024-07-18 13:39:04'),
(184, 'ORDER-1721309953580', '415300.00', 'aa', 'a@gmail.com', '2312312312', 'aaaaaaaaaaaa', 'Pending', 'cstore', '2024-07-18 13:39:13');

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

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`transaction_item_id`, `transaction_id`, `product_id`, `product_name`, `product_image`, `quantity`, `price`, `sub_total`) VALUES
(531, 183, 126, 'Pizza', 'uploads/1719403214037-image_2024-06-26_185953117.png', 2, '100000.00', '200000.00'),
(532, 183, 127, 'Lumpia Udang', 'uploads/1719216083658-image_2024-06-24_150121997.png', 2, '200000.00', '400000.00'),
(533, 183, 0, 'Ongkir', '', 1, '25500.00', '25500.00'),
(534, 184, 127, 'Lumpia Udang', 'uploads/1719216083658-image_2024-06-24_150121997.png', 2, '200000.00', '400000.00'),
(535, 184, 0, 'Ongkir', '', 1, '15300.00', '15300.00');

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `address`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Putra s', '123', 'putrass@gmail.com', 'Bintaro', 'customer', '2024-06-23 05:16:32', '2024-06-25 02:46:42'),
(10, 'admin', 'admin', 'admin@gmail.com', 'xxxxxxxxx', 'admin', '2024-06-24 02:53:34', '2024-06-24 02:53:34');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `transaction_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=536;

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
