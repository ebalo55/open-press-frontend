import { z } from "zod";

export const ValidStatusCodeSchema = z.number().int().min(200).max(299);
