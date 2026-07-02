
<script setup lang="ts">
</script>

<template>
  <aside class="sidebar-left">
    <div class="sidebar-content">
      <!-- <div class="eyebrow">
        <slot name="eyebrow">Quem Somos</slot>
      </div> -->
      <h2 class="main-title">
        <slot name="title">Quem Somos</slot>
      </h2>
      <div class="about-text">
        <slot>
          <ul>
            <li>
              Criado pelo Decreto Presidencial n.º 95/21, de Abril de 2021
            </li>
            <li>
              Instituto público sob superintendência do Ministério da Indústria
              e Comércio
            </li>
            <li>Compete coordenar o Sistema Nacional da Qualidade</li>
          </ul>
        </slot>
      </div>
    </div>

    <div class="sidebar-footer">
      <div class="gov-info">
        Edificio Palacio do vidro <br />
        Largo 17 de Setembro n° 7 <br />
        5° Andar, Ala Esquerda.
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-left {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  padding: 1.25rem 1.25rem 0 1.25rem;
  overflow-y: auto;
  margin-top: 0;
  border-radius: 0;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;
  padding-top: 2rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #5cb947;
  margin-bottom: 1rem;
  margin-top: 0;
}

.eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.main-title {
  font-family: "Archivo", system-ui, sans-serif;
  font-size: clamp(1.5rem, 2vw, 1.85rem);
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin: 0 0 1.25rem 0;
}

.about-text {
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 0.95rem;
}

.about-text ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-text li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.about-text li:last-child {
  margin-bottom: 0;
}

.about-text li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #5cb947;
  font-weight: bold;
}

.sidebar-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.gov-info {
  /* font-family: monospace; */
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
}

.lang-btns {
  display: flex;
  gap: 0.5rem;
}

.lang-btns button {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.lang-btns button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.lang-btns button.active {
  background: #5cb947;
  border-color: #5cb947;
  color: #0f172a;
}

@media (max-width: 1199px) {
  .sidebar-left {
    position: static;
    height: auto;
    min-height: 0;
    padding: 1.25rem 1rem;
  }

  .sidebar-content {
    padding-top: 0.5rem;
  }

  .main-title {
    font-size: 1.35rem;
  }

  .about-text {
    font-size: 0.9rem;
  }

  .sidebar-footer {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

@media (max-width: 767px) {
  .main-title {
    font-size: 1.2rem;
  }

  .gov-info {
    font-size: 0.8rem;
  }
}
</style>
