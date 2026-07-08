"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Activity, BrainCircuit, Settings, Search, Bell, FileText } from "lucide-react";
import MetricCard from "./MetricCard";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart },
  { id: "streams", label: "Data Streams", icon: Activity },
  { id: "models", label: "AI Models", icon: BrainCircuit },
];

const tabContent = {
  overview: (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">System Overview</h3>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Active Streams" value="24" />
        <MetricCard label="Total Predictions" value="1.2M" />
        <MetricCard label="System Health" value="Optimal" valueColor="text-[#3b82f6]" />
      </div>
      <div className="w-full h-40 bg-[#111] border border-[#333] rounded-lg flex items-end justify-between p-4 gap-1.5">
        {[65, 40, 85, 55, 90, 45, 70, 80, 60, 75, 50, 88, 42, 95, 38, 72, 58, 83, 67, 91, 48, 76, 62, 87].map(
          (h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="flex-1 bg-gradient-to-t from-[#3b82f6]/20 to-[#3b82f6]/80 rounded-t-sm opacity-70 cursor-pointer"
            />
          )
        )}
      </div>
    </div>
  ),
  streams: (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Data Streams</h3>
      <div className="space-y-3">
        {[
          { name: "postgres_main", status: "Active", rate: "14,021 ops/sec", color: "#27c93f" },
          { name: "kafka_prod_01", status: "Active", rate: "8,400 ops/sec", color: "#27c93f" },
          { name: "s3_archive", status: "Syncing", rate: "1,200 ops/sec", color: "#ffbd2e" },
          { name: "redis_cache", status: "Idle", rate: "0 ops/sec", color: "#888" },
        ].map((stream, i) => (
          <motion.div
            key={stream.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4, borderColor: "rgba(59,130,246,0.4)" }}
            className="flex items-center justify-between bg-[#111] border border-[#333] rounded-lg p-4 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: stream.color }} />
              <span className="font-mono text-sm">{stream.name}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-[#888]">{stream.rate}</span>
              <span style={{ color: stream.color }}>{stream.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  ),
  models: (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">AI Models</h3>
      <div className="space-y-3">
        {[
          { name: "model.transformer_v4", confidence: "96.2%", latency: "12ms", status: "Running" },
          { name: "model.anomaly_detector", confidence: "98.1%", latency: "8ms", status: "Running" },
          { name: "model.classifier_v2", confidence: "91.4%", latency: "22ms", status: "Standby" },
        ].map((model, i) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4, borderColor: "rgba(168,85,247,0.4)" }}
            className="bg-[#111] border border-[#333] rounded-lg p-4 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-bold">{model.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${model.status === "Running" ? "bg-[#27c93f]/10 text-[#27c93f]" : "bg-[#888]/10 text-[#888]"}`}>
                {model.status}
              </span>
            </div>
            <div className="flex gap-6 text-xs text-[#888]">
              <span>Confidence: <span className="text-white">{model.confidence}</span></span>
              <span>Latency: <span className="text-white">{model.latency}</span></span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  ),
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-[580px] bg-[#050505] border border-[#333] rounded-xl shadow-[0_0_80px_rgba(59,130,246,0.12)] flex overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-60 border-r border-[#1a1a1a] bg-[#0a0a0a] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#1a1a1a] flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#3b82f6] flex items-center justify-center text-xs font-bold text-white">X</div>
          <span className="font-bold text-sm tracking-wide">Workspace</span>
        </div>

        <div className="p-3 flex-1 flex flex-col gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                activeTab === id
                  ? "bg-white/10 text-white"
                  : "text-[#888] hover:text-white hover:bg-white/5"
              }`}
            >
              {activeTab === id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-[#1a1a1a]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#888] hover:text-white hover:bg-white/5 transition-all duration-200">
            <Settings size={15} />
            Settings
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-[#1a1a1a] flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]/40">
          <div className="flex items-center gap-2 text-[#888] bg-[#111] px-3 py-1.5 rounded-md border border-[#222] w-56">
            <Search size={13} />
            <span className="text-xs">Search intelligence...</span>
          </div>
          <div className="flex items-center gap-3 text-[#888]">
            <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer hover:text-white transition-colors">
              <Bell size={17} />
            </motion.div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#a855f7]" />
          </div>
        </div>

        {/* Tab content with AnimatePresence */}
        <div className="flex-1 p-7 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {tabContent[activeTab as keyof typeof tabContent]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
