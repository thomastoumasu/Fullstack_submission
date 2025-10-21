import { Gender, HealthCheckRating } from "./types";
import * as z from "zod";

export const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

const baseEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(diagnosisSchema.shape.code).optional()
});

const sickLeave = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const discharge = z.object({
  date: z.string().date(),
  criteria: z.string()
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: sickLeave.optional()
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: discharge
});

export const newEntrySchema = z.discriminatedUnion("type", [healthCheckEntrySchema, occupationalHealthcareEntrySchema, hospitalEntrySchema]);

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date().optional(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});
