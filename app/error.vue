<script setup lang="ts">
interface Props {
  code?: string | number
  title?: string
  message?: string
  homeHref?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '404',
  title: 'Página não encontrada',
  message: 'A página que procura pode ter sido removida, renomeada ou está temporariamente indisponível.',
  homeHref: '/',
})

const emit = defineEmits<{
  (e: 'retry'): void
}>()

function handleRetry() {
    window.location.reload()
}
</script>

<template>
  <div class="error-stage">
    <p class="code">{{ code }}</p>
    <p class="title">{{ title }}</p>
    <p class="message">{{ message }}</p>

    <div class="actions">
      <a class="btn-primary" :href="homeHref">Voltar ao início</a>
      <button class="btn-ghost" type="button" @click="handleRetry">Tentar novamente</button>
    </div>
  </div>
</template>

<style scoped>
.error-stage {
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
  font-family: 'Sora', sans-serif;
}

.code {
  font-size: 5.5rem;
  line-height: 1;
  color: var(--navy);
  opacity: 0;
  animation: fadeIn 0.7s ease-out 0.35s forwards;
  margin-bottom: 0.8rem;
}

.title {
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--ink);
  opacity: 0;
  animation: fadeIn 0.7s ease-out 0.5s forwards;
  margin-bottom: 0.6rem;
}

.message {
  max-width: 30rem;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink-dim);
  opacity: 0;
  animation: fadeIn 0.7s ease-out 0.65s forwards;
  margin-bottom: 2.4rem;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  opacity: 0;
  animation: fadeIn 0.7s ease-out 0.85s forwards;
}

.btn-primary {
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  background: var(--navy);
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  border: 1px solid var(--navy);
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background: #0c4c7a;
  transform: translateY(-1px);
}

.btn-ghost {
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-dim);
  background: transparent;
  border: 1px solid rgba(28, 34, 38, 0.16);
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-ghost:hover {
  border-color: var(--gold);
  color: var(--navy);
}

@media (prefers-reduced-motion: reduce) {
  .code,
  .title,
  .message,
  .actions {
    animation: none;
    opacity: 1;
  }
}
</style>