import { Module } from "@/model/module.model";

export async function create(moduleData) {
  try {
    const createModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(createModule));
  } catch (error) {
    throw new Error(error);
  }
}
