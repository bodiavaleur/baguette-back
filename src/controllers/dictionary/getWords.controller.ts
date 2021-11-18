import type { RequestHandler } from "express";

export const getWordsController: RequestHandler = async (req, res) => {
  try {
    res.json({ words: [] });
  } catch (err) {
    res.json("Error while getting words");
  }
};
