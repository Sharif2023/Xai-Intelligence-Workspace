"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string;
  valueColor?: string;
}

export default function MetricCard({ label, value, valueColor = "text-white" }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, borderColor: "rgba(59,130,246,0.4)" }}
      transition={{ duration: 0.2 }}
      className="bg-[#111] border border-[#333] rounded-lg p-4 cursor-default"
    >
      <div className="text-[#888] text-xs mb-2">{label}</div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
    </motion.div>
  );
}
