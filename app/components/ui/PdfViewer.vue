<script setup>
import { ref, onMounted, watch, nextTick } from "vue"
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const ZOOM_DEFAULT = 0.75
const ZOOM_STEP = 0.25
const ZOOM_MIN = 0.5
const ZOOM_MAX = 2.5

const containerRef = ref(null)
const status = ref("loading")
const zoom = ref(ZOOM_DEFAULT)

let renderToken = 0

const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ])

const renderPdf = async () => {
  if (!props.src) return
  status.value = "loading"
  const token = ++renderToken

  try {
    const pdfjsLib = await import("pdfjs-dist")
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

    const pdf = await withTimeout(pdfjsLib.getDocument({ url: props.src }).promise, 15000)
    if (token !== renderToken) return

    await nextTick()
    const container = containerRef.value
    if (!container) return
    container.innerHTML = ""

    const containerWidth = container.clientWidth || 600

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      if (token !== renderToken) return

      const page = await withTimeout(pdf.getPage(pageNum), 15000)
      const unscaledViewport = page.getViewport({ scale: 1 })
      const scale = (containerWidth / unscaledViewport.width) * zoom.value
      const viewport = page.getViewport({ scale })

      const canvas = document.createElement("canvas")
      canvas.className = "pdf-viewer-page"
      canvas.width = viewport.width
      canvas.height = viewport.height
      container.appendChild(canvas)

      const context = canvas.getContext("2d")
      await withTimeout(page.render({ canvasContext: context, viewport }).promise, 15000)
    }

    if (token === renderToken) status.value = "ready"
  } catch (err) {
    console.error("[PdfViewer] failed to render", err)
    if (token === renderToken) status.value = "error"
  }
}

const zoomIn = () => {
  zoom.value = Math.min(ZOOM_MAX, +(zoom.value + ZOOM_STEP).toFixed(2))
  renderPdf()
}

const zoomOut = () => {
  zoom.value = Math.max(ZOOM_MIN, +(zoom.value - ZOOM_STEP).toFixed(2))
  renderPdf()
}

const zoomReset = () => {
  zoom.value = ZOOM_DEFAULT
  renderPdf()
}

onMounted(renderPdf)
watch(() => props.src, renderPdf)
</script>

<template>
  <div class="pdf-viewer">
    <div class="pdf-viewer-toolbar">
      <button
        type="button"
        class="pdf-zoom-btn"
        :disabled="zoom <= ZOOM_MIN"
        @click="zoomOut"
        aria-label="Diminuir zoom"
      >
        −
      </button>
      <button type="button" class="pdf-zoom-level" @click="zoomReset" title="Repor zoom">
        {{ Math.round(zoom * 100) }}%
      </button>
      <button
        type="button"
        class="pdf-zoom-btn"
        :disabled="zoom >= ZOOM_MAX"
        @click="zoomIn"
        aria-label="Aumentar zoom"
      >
        +
      </button>
    </div>

    <div class="pdf-viewer-scroll">
      <p v-if="status === 'loading'" class="pdf-viewer-status">A carregar documento…</p>
      <p v-if="status === 'error'" class="pdf-viewer-status pdf-viewer-status--error">
        Não foi possível pré-visualizar o documento aqui. Use o botão "Abrir noutro separador" acima.
      </p>
      <div v-show="status === 'ready'" ref="containerRef" class="pdf-viewer-pages"></div>
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
}

.pdf-viewer-toolbar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.4rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
}

.pdf-zoom-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #d0d9e3;
  background: white;
  color: #0a3a63;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s;
}

.pdf-zoom-btn:hover:not(:disabled) {
  border-color: #2ba9e0;
  color: #2ba9e0;
}

.pdf-zoom-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pdf-zoom-level {
  min-width: 52px;
  padding: 0.25rem 0.4rem;
  border: 1px solid transparent;
  background: transparent;
  color: #475569;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: monospace;
  cursor: pointer;
  border-radius: 6px;
}

.pdf-zoom-level:hover {
  border-color: #d0d9e3;
  color: #0a3a63;
}

.pdf-viewer-scroll {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.pdf-viewer-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.pdf-viewer-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.pdf-viewer-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.pdf-viewer-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
  background-clip: padding-box;
}

.pdf-viewer-status {
  padding: 2.5rem 1rem;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}

.pdf-viewer-status--error {
  color: #dc2626;
}

.pdf-viewer-pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  box-sizing: border-box;
}

.pdf-viewer-pages :deep(.pdf-viewer-page) {
  display: block;
  box-shadow: 0 1px 4px rgba(10, 58, 99, 0.15);
  border-radius: 4px;
}
</style>
