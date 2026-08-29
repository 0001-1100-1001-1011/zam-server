import { z } from "zod";

export const agentHostsSchema = z.object({
  hostname: z.string().min(1).max(255),
  ip_address: z.ipv4(),
  cpu_model: z.string().max(255).optional(),
  ram_size: z.number().nonnegative().lte(10000),
  gpu_model: z.string().min(1).max(255),
  storage_size: z.number().nonnegative().lte(10000),
  operating_system: z.string().min(1).max(255),
  hmac_key_encrypted: z.string().min(1).max(255),
});

export const agentLogsSchema = z.object({
  client_id: z.string(),
  hostname: z.string().min(1).max(255),
  time_created: z.string(),
  level: z.string().min(1).max(255),
  source: z.string().min(1).max(255),
  event_source: z.string().min(1).max(255),
  event_id: z.number().nonnegative().lte(66000),
  keyword: z.string().max(255),
  message: z.string().min(1),
});

const softwareSchema = z.object({
  name: z.string().min(1).max(255),
  version: z.string().min(1).max(255),
});

export const agentSoftwaresSchema = z.object({
  hostname: z.string().min(1).max(255),
  software: z.array(softwareSchema),
});

export const monitoringUserRegisterSchema = z.object({
  username: z.string().min(4).max(50),
  email: z.email(),
  password: z.string().min(8).max(50),
});

export const monitoringUserLoginSchema = z.object({
  username: z.string().min(4).max(50),
  password: z.string().min(8).max(50),
});
