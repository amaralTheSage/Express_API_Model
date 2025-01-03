import { PrismaClient, Transporte } from "@prisma/client";

import express, { Router } from "express";
import { Request, Response } from "express";
import { z } from "zod";

const router = Router();

const prisma = new PrismaClient();

// INDEX
router.get("/", async (req: Request, res: Response) => {
  const viagens = await prisma.viagem.findMany({ orderBy: { id: "desc" } });

  res.json(viagens);
});

// FILTER TRANSPORTE
router.get("/transporte/:query", async (req: Request, res: Response) => {
  // Ou group by, com by: [<campos>]

  const viagens = await prisma.viagem.findMany({
    where: {
      transporte: {
        equals: <Transporte>req.params.query.toUpperCase(),
      },
    },
  });

  res.json(viagens);
});

// FILTER PRECO
router.get("/preco/:query", async (req: Request, res: Response) => {
  const viagem = await prisma.viagem.findMany({
    where: {
      preco: {
        lte: Number(req.params.query),
      },
    },
  });

  res.json(viagem);
});

// DESTINOS EM ORDEM ALFABETICA
router.get("/destinos", async (req: Request, res: Response) => {
  const viagem = await prisma.viagem.findMany({
    select: {
      destino: true,
      preco: true,
      duracao: true,
    },
    orderBy: { destino: "asc" },
  });

  res.json(viagem);
});

const viagensValidation = z.object({
  destino: z.string(),
  transporte: z.nativeEnum(Transporte),
  dataSaida: z.string().date(),
  duracao: z.number(),
  preco: z.number(),
  hotel: z.string(),
  estrelas: z.number(),
});

// PREÇO MEDIO DAS VIAGENS
router.get("/media", async (req: Request, res: Response) => {
  //Método em si
  const media = await prisma.viagem.aggregate({
    _avg: {
      preco: true,
      duracao: true,
    },
  });

  res.json(media);
});

// STORE
router.post("/create", async (req, res) => {
  const result = viagensValidation.safeParse(req.body);

  const { destino, transporte, dataSaida, duracao, preco, hotel, estrelas } =
    req.body;

  if (!result) {
    res.status(400).json({ error: "DEU PAU NA VALIDACAO" });
    return;
  }

  try {
    const viagem = await prisma.viagem.create({
      data: { destino, transporte, dataSaida, duracao, preco, hotel, estrelas },
    });

    res.status(201).json(viagem);
  } catch (exception) {
    console.error(exception);
  } finally {
    console.log("criou suave");
  }
});

// PUT
router.put("/update/:id", async function (req, res) {
  const { id } = req.params;

  const result = viagensValidation.safeParse(req.body);

  !result && console.log("DEU PAU NA VALIDACAO");

  if (!result) return;

  try {
    const viagem = await prisma.viagem.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.status(201).json(viagem);
  } catch (exception) {
    console.error(exception);
  } finally {
    console.log("atualizou suave");
  }
});

// DESTROY
router.delete("/delete/:id", async function (req, res) {
  const { id } = req.params;

  let viagem;
  try {
    viagem = await prisma.viagem.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (exception) {
    console.error(exception);
  } finally {
    res.status(200).json(viagem);
  }
});

export default router;
