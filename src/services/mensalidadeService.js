// src/services/mensalidadeService.js
// Serviço mockado para CRUD de mensalidades (mensalidades.json)

// Simula o backend usando localStorage para persistência temporária
const STORAGE_KEY = 'mensalidades';

function getMensalidades() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  // fallback para o arquivo json inicial (import dinâmico)
  return import('../mensalidades.json').then(mod => mod.default || mod);
}

function saveMensalidades(mensalidades) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mensalidades));
}

async function list() {
  const data = await getMensalidades();
  return Array.isArray(data) ? data : [];
}

async function update(mes, ano, updateObj) {
  let mensalidades = await getMensalidades();
  mensalidades = mensalidades.map(m => {
    if (m.mes === mes && m.ano === ano) {
      return { ...m, ...updateObj };
    }
    return m;
  });
  saveMensalidades(mensalidades);
  return mensalidades;
}

async function add(novoMes) {
  let mensalidades = await getMensalidades();
  mensalidades.push(novoMes);
  saveMensalidades(mensalidades);
  return mensalidades;
}

async function remove(mes, ano) {
  let mensalidades = await getMensalidades();
  mensalidades = mensalidades.filter(m => !(m.mes === mes && m.ano === ano));
  saveMensalidades(mensalidades);
  return mensalidades;
}

const mensalidadeService = {
  list,
  update,
  add,
  remove
};
export default mensalidadeService;
