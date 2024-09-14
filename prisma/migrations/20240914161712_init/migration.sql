-- CreateTable
CREATE TABLE `viagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destino` VARCHAR(191) NOT NULL,
    `transporte` ENUM('TERRESTRE', 'MARITIMO', 'AEREO') NOT NULL DEFAULT 'TERRESTRE',
    `dataSaida` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `duracao` SMALLINT NOT NULL,
    `hotel` VARCHAR(191) NOT NULL DEFAULT '',
    `estrelas` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
