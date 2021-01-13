-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Creato il: Gen 13, 2021 alle 15:49
-- Versione del server: 8.0.22
-- Versione PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registrofitstic`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `docenti`
--

CREATE TABLE `docenti` (
  `id` int NOT NULL,
  `idEnte` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `cf` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ritirato` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `docenti`
--

INSERT INTO `docenti` (`id`, `idEnte`, `nome`, `cognome`, `cf`, `email`, `ritirato`) VALUES
(1, 1, 'Matteo', 'Mascellani', 'MTTMSC79D19L222A', 'matteo.mascellani@ilbestfullstackdeveloper.it', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `edizioni`
--

CREATE TABLE `edizioni` (
  `id` int NOT NULL,
  `idGestore` int NOT NULL,
  `descrizione` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `edizioni`
--

INSERT INTO `edizioni` (`id`, `idGestore`, `descrizione`) VALUES
(1, 1, 'Edizione 2019-2021');

-- --------------------------------------------------------

--
-- Struttura della tabella `enti`
--

CREATE TABLE `enti` (
  `id` int NOT NULL,
  `descrizione` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `enti`
--

INSERT INTO `enti` (`id`, `descrizione`, `username`, `password`) VALUES
(1, 'FITSTIC', 'fitstic', 'fitstic');

-- --------------------------------------------------------

--
-- Struttura della tabella `gestori`
--

CREATE TABLE `gestori` (
  `id` int NOT NULL,
  `idEnte` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `descrizione` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `gestori`
--

INSERT INTO `gestori` (`id`, `idEnte`, `username`, `password`, `email`, `descrizione`) VALUES
(1, 1, 'alanTuring', 'alanTuring', 'alan.turing@fitstic.it', 'Corso Alan Turing');

-- --------------------------------------------------------

--
-- Struttura della tabella `lezioni`
--

CREATE TABLE `lezioni` (
  `id` int NOT NULL,
  `idEdizione` int NOT NULL,
  `descrizione` text NOT NULL,
  `data` timestamp NOT NULL,
  `oraInizio` timestamp NOT NULL,
  `oraFine` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `lezioni`
--

INSERT INTO `lezioni` (`id`, `idEdizione`, `descrizione`, `data`, `oraInizio`, `oraFine`) VALUES
(1, 1, 'Sviluppo Client PHP', '2021-01-13 15:44:34', '2021-01-13 15:00:00', '2021-01-13 17:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `presenze`
--

CREATE TABLE `presenze` (
  `id` int NOT NULL,
  `idUtente` int NOT NULL,
  `tipoUtente` enum('S','D') NOT NULL,
  `data` timestamp NOT NULL,
  `oraEntrata` timestamp NOT NULL,
  `oraUscita` timestamp NOT NULL,
  `idLezione` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `presenze`
--

INSERT INTO `presenze` (`id`, `idUtente`, `tipoUtente`, `data`, `oraEntrata`, `oraUscita`, `idLezione`) VALUES
(1, 1, 'S', '2021-01-13 15:00:00', '2021-01-13 15:00:00', '2021-01-13 17:00:00', 1),
(2, 1, 'D', '2021-01-13 15:00:00', '2021-01-13 15:00:00', '2021-01-13 16:50:00', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `studenti`
--

CREATE TABLE `studenti` (
  `id` int NOT NULL,
  `idEdizione` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `cf` varchar(16) NOT NULL,
  `frequenza` int NOT NULL,
  `dataNascita` timestamp NOT NULL,
  `email` varchar(255) NOT NULL,
  `promosso` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `studenti`
--

INSERT INTO `studenti` (`id`, `idEdizione`, `nome`, `cognome`, `cf`, `frequenza`, `dataNascita`, `email`, `promosso`) VALUES
(1, 1, 'Leonardo', 'Grandolfo', 'GRNLRD99D17L219L', 0, '1999-04-17 00:00:00', 'leonardo.grandolfo99@gmail.com', 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `docenti`
--
ALTER TABLE `docenti`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `edizioni`
--
ALTER TABLE `edizioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `enti`
--
ALTER TABLE `enti`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `gestori`
--
ALTER TABLE `gestori`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `lezioni`
--
ALTER TABLE `lezioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `presenze`
--
ALTER TABLE `presenze`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `studenti`
--
ALTER TABLE `studenti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `docenti`
--
ALTER TABLE `docenti`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `edizioni`
--
ALTER TABLE `edizioni`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `enti`
--
ALTER TABLE `enti`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `gestori`
--
ALTER TABLE `gestori`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `lezioni`
--
ALTER TABLE `lezioni`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `presenze`
--
ALTER TABLE `presenze`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `studenti`
--
ALTER TABLE `studenti`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
