export const simulationDefaults = Object.freeze({
  inquiries: 100,
  conversion: 10,
  ticket: 250,
  growth: 25,
  conversionGain: 2,
});
export const simulationLimits = Object.freeze({
  inquiries: [0, 1000000],
  conversion: [0, 100],
  ticket: [0, 10000000],
  growth: [0, 100],
  conversionGain: [0, 100],
});

export function calculatePotential(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  for (const [key, [min, max]] of Object.entries(simulationLimits)) {
    if (
      !["number", "string"].includes(typeof input[key]) ||
      (typeof input[key] === "string" && !input[key].trim()) ||
      input[key] === "" ||
      input[key] == null ||
      !Number.isFinite(Number(input[key])) ||
      Number(input[key]) < min ||
      Number(input[key]) > max
    )
      return null;
  }
  const { inquiries, conversion, ticket, growth, conversionGain } =
    Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, Number(value)]),
    );
  if (conversion + conversionGain > 100) return null;
  const currentSales = (inquiries * conversion) / 100;
  const currentRevenue = currentSales * ticket;
  const nextInquiries = inquiries * (1 + growth / 100);
  const nextConversion = conversion + conversionGain;
  const nextSales = (nextInquiries * nextConversion) / 100;
  const nextRevenue = nextSales * ticket;
  const percentDifference =
    currentRevenue === 0 ? null : (nextRevenue / currentRevenue - 1) * 100;
  return {
    currentInquiries: inquiries,
    currentConversion: conversion,
    currentSales,
    currentRevenue,
    nextInquiries,
    nextConversion,
    nextSales,
    nextRevenue,
    difference: nextRevenue - currentRevenue,
    percentDifference: Number.isFinite(percentDifference)
      ? percentDifference
      : null,
  };
}
