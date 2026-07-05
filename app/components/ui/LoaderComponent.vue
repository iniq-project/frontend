<script setup lang="ts">
</script>

<template>
  <div class="loader-stage">
    <div class="seal">
      <span class="pulse pulse-navy"></span>
      <span class="pulse pulse-gold"></span>
      <img src="/iniq-logo-t.png" alt="INIQ" />
    </div>

    <div class="status-row">
      <span class="status">
        A carregar<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.loader-stage {
  --paper: #f8f7f4;
  --paper-2: #f1efe9;
  --navy: #0a3d62;
  --blue: #0084cc;
  --green: #6db52f;
  --gold: #b8933a;
  --ink: #1c2226;
  --ink-dim: #7c8792;

  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: radial-gradient(120% 120% at 50% 20%, var(--paper) 0%, var(--paper-2) 100%);
}

.seal {
  position: relative;
  width: 168px;
  height: 168px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.2rem;
  opacity: 0;
  transform: scale(0.94);
  animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}

.seal::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(10, 61, 98, 0.16);
}

.seal::after {
  content: '';
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  border: 1px solid rgba(184, 147, 58, 0.35);
}

.pulse {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: pulse-ring 3s ease-out infinite;
}

.pulse-navy {
  inset: 0;
  border: 1px solid var(--navy);
  animation-delay: 1s;
}

.pulse-gold {
  inset: 14px;
  border: 1px solid var(--gold);
  animation-delay: 1.9s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.45;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

.seal img {
  width: 62%;
  height: auto;
  filter: drop-shadow(0 6px 16px rgba(10, 61, 98, 0.14));
}

@keyframes rise {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tagline {
  font-style: italic;
  font-size: 1.05rem;
  color: var(--navy);
  letter-spacing: 0.01em;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.5s forwards;
  margin-bottom: 0.35rem;
}

.subtag {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-dim);
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.75s forwards;
  margin-bottom: 2.4rem;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.status-row {
  opacity: 0;
  animation: fadeIn 0.6s ease-out 1.05s forwards;
}

.status {
  font-size: 1rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-dim);
  display: inline-flex;
  gap: 0.25em;
}

.status .dot {
  opacity: 0.25;
  animation: blink 1.6s ease-in-out infinite;
}
.status .dot:nth-child(2) {
  animation-delay: 0.25s;
}
.status .dot:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .seal,
  .tagline,
  .subtag,
  .status-row {
    animation: none;
    opacity: 1;
  }
  .status .dot {
    animation: none;
    opacity: 0.6;
  }
}
</style>