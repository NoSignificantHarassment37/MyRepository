import type { Request, Response } from "express";


export const getAllUsers = (req: Request, res: Response) => {
  // aquí normalmente iría la lógica del service/repo
  res.json([{ id: 1, name: "Juan" }, { id: 2, name: "Maria" }]);
};

export const createUser = (req: Request, res: Response) => {
  const { name } = req.body;
  // normalmente validación y persistencia aquí
  res.status(201).json({ id: Date.now(), name });
};
