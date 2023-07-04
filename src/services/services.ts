import { Response } from "express";

export const CALCADOS = 'https://api.mercadolibre.com/sites/MLB/search?category=categoryId&q=tenis';

export const fetchAPI = async (url: any, res: Response) => {
  try {
    const response = await fetch(url);
    return res.status(200).json(response);
  } catch (error) {
    return console.log(error);
  }
};

function fetch(url: any) {
    throw new Error("Function not implemented.");
}
