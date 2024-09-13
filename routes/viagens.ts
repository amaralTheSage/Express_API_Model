import { PrismaClient, Transporte } from "@prisma/client";

import express, { Router } from "express";
import { Request, Response } from "express";
import { z } from "zod";

const app = express();
const port = 3000;
const router = Router();

const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const viagens = await prisma.viagem.findMany();

  res.json(viagens);
});

const viagensValidation = z.object({
  destino: z.string(),
  transporte: z.nativeEnum(Transporte),
  dataSaida: z.string(),
  duracao: z.number(),
  preco: z.number(),
});

router.post("/create", async (req, res) => {
  const result = viagensValidation.safeParse(req.body);

  const { destino, transporte, dataSaida, duracao, preco } = req.body;

  !result && console.log("DEU PAU NA VALIDACAO");

  if (!result) return;


  try {
    const viagem = await prisma.viagem.create({
      data: { destino, transporte, dataSaida, duracao, preco },
    });

    res.status(201).json(viagem);
  } catch (exception) {
    console.error(exception);
  } finally {
    console.log("criou suave");
  }
});

router.put("/update/:id", async function (req, res) {
  const { id } = req.params;

  const result = viagensValidation.safeParse(req.body);
  const { destino, transporte, dataSaida, duracao, preco } = req.body;

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
