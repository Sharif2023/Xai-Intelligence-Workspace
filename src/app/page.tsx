"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, FileText, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import StageCard from "@/components/StageCard";
import TerminalMockup from "@/components/TerminalMockup";
import MetricCard from "@/components/MetricCard";
import Dashboard from "@/components/Dashboard";

gsap.registerPlugin(ScrollTrigger);

const ThreeVisual = dynamic(() => import("@/components/ThreeVisual"), { ssr: false });

// ─── Terminal data ──────────────────────────────────────────────────────────
const terminalLines = [
  { time: "[14:02:01]", text: "$ xai connect --source postgres_main" },
  { time: "[14:02:02]", text: "Analyzing schema structure... OK", color: "#ffffff" },
  { time: "[14:02:04]", text: "Streaming 4.2M records...", color: "#3b82f6" },
  { time: "[14:02:05]", text: "Ingestion active. 14,021 ops/sec", color: "#a855f7", blink: true },
];

// ─── Model card ──────────────────────────────────────────────────────────────
function ModelCard() {
  return (
    <>
      <div className="p-5 border-b border-[#333] flex justify-between items-center">
        <div className="font-semibold text-lg flex items-center gap-2">
          <BrainCircuit size={17} />
          model.transformer_v4
        </div>
        <div className="bg-[#27c93f]/10 text-[#27c93f] px-3 py-1 rounded-full text-xs font-semibold">
          Active
        </div>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3 flex-1">
        <MetricCard label="Confidence" value="0.962" valueColor="text-[#27c93f]" />
        <MetricCard label="Data Drift" value="0.003" valueColor="text-[#ffbd2e]" />
        <MetricCard label="Parameters" value="1.2B" />
        <MetricCard label="Inference" value="12ms" />
      </div>
    </>
  );
}

// ─── Hero stats ──────────────────────────────────────────────────────────────
const heroStats = [
  { value: "2.4M+", label: "Events / sec" },
  { value: "18ms", label: "P99 Latency" },
  { value: "99.99%", label: "Uptime" },
  { value: "340+", label: "Automations" },
];

export default function Home() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (railRef.current) {
      gsap.fromTo(
        railRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: "#flow-section",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative z-10 px-8 pt-32 pb-16">
        {/* Three.js background */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <ThreeVisual />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-8 text-[#888]"
        >
          ● Now in Private Beta — Intelligence Workspace v2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 text-[clamp(2.8rem,6vw,5rem)] font-extrabold tracking-tight leading-[1.08] max-w-3xl mb-6 pointer-events-none"
        >
          Raw Data to{" "}
          <span className="bg-gradient-to-r from-white to-[#aaa] bg-clip-text text-transparent">
            Structured Intelligence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-lg text-[#888] max-w-xl leading-relaxed mb-12 pointer-events-none"
        >
          Xai transforms your raw data streams into actionable intelligence through adaptive AI
          models — giving decision-makers clarity at every layer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative z-10 flex gap-3"
        >
          <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all">
            Start Building →
          </button>
          <button className="border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/5 active:scale-95 transition-all">
            ▶ Watch Demo
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 flex gap-10 mt-16 pt-8 border-t border-white/10"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[#888] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 2. Interactive Insight Flow ──────────────────────────────────── */}
      <section id="flow-section" className="py-32 px-8 max-w-6xl mx-auto relative w-full">
        {/* Track rail — ghost */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -translate-x-1/2 z-0" />
        {/* GSAP animated rail */}
        <div
          ref={railRef}
          className="absolute top-0 left-1/2 w-px -translate-x-1/2 z-0"
          style={{
            background: "linear-gradient(to bottom, #3b82f6, #a855f7, #0ea5e9)",
            boxShadow: "0 0 12px rgba(59,130,246,0.5)",
          }}
        />

        <StageCard
          stageNum="Stage 01"
          labelColor="cyan"
          title="Ingest Data"
          description="Connect securely to any datastore. Our high-throughput ingestion engine automatically identifies schema shifts and normalises messy data streams in real-time."
          visual={<TerminalMockup lines={terminalLines} />}
        />

        <StageCard
          stageNum="Stage 02"
          labelColor="purple"
          title="Analyze with AI"
          description="Leverage custom transformer models to detect anomalies, classify unstructured text, and predict future trends without writing a single line of Python."
          visual={<ModelCard />}
          direction="reverse"
        />

        {/* Stage 03 — centred */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-24 relative z-10"
        >
          <div className="text-center max-w-2xl mb-10">
            <div className="inline-block px-3 py-1 rounded bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 text-xs font-bold tracking-widest uppercase mb-4">
              Stage 03
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Generate Insight & Automate</h2>
            <p className="text-[#888] text-lg leading-relaxed">
              Drive business value instantly. Xai generates human-readable reports and triggers
              webhooks to automate workflows based on model predictions.
            </p>
          </div>

          <div className="w-full grid grid-cols-2 gap-5">
            {/* Webhook card */}
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
              transition={{ duration: 0.25 }}
              className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="font-bold">Automated Webhooks</h3>
                  <p className="text-sm text-[#888]">Triggered on anomaly detection</p>
                </div>
              </div>
              <div className="font-mono text-xs text-[#888] bg-[#111] p-4 rounded-lg border border-[#222] leading-loose">
                <span className="text-[#3b82f6]">POST</span> /api/webhooks/alert
                <br />
                <span className="text-[#0ea5e9]">{`{ "status": "anomaly", "confidence": 0.98 }`}</span>
              </div>
            </motion.div>

            {/* Brief card */}
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(168,85,247,0.5)" }}
              transition={{ duration: 0.25 }}
              className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 rounded-lg bg-[#a855f7]/20 text-[#a855f7]">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="font-bold">Natural Language Briefs</h3>
                  <p className="text-sm text-[#888]">Executive summaries on demand</p>
                </div>
              </div>
              <div className="text-sm text-[#888] bg-[#111] p-4 rounded-lg border border-[#222] leading-relaxed">
                "In the last 24 hours,{" "}
                <strong className="text-white">user engagement dropped 14%</strong>. The model
                identified a latency spike in EU-West as the primary root cause."
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. Intelligence Dashboard Preview ───────────────────────────── */}
      <section className="py-28 px-8 border-t border-[#111] w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Intelligence Dashboard</h2>
            <p className="text-[#888] text-lg">
              A unified, calm interface built for decision-makers.
            </p>
          </div>
          <Dashboard />
        </div>
      </section>
    </div>
  );
}
