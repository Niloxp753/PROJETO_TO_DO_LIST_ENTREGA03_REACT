import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformEssencia = async (essencia) => {
  const [sabor, aroma] = essencia.sabor.split(" com aroma ");

  return await {
    ...essencia,
    id: essencia._id,
    titulo: essencia.sabor,
    sabor,
    ...(aroma && { aroma }),
    possuiAroma: Boolean(aroma),
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((essencias) => essencias.map(transformEssencia));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformEssencia);

export const EssenciaService = {
  getLista: () =>
    fetch(Api.essenciaLista(), { method: "GET" }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.essenciaById(id), { method: "GET" }).then(parseTransformItem),
  create: (essencia) =>
    fetch(Api.createEssencia(), {
      method: "POST",
      body: JSON.stringify(essencia),
      mode: "cors",
      headers: { "Content-Type": "application/json" 
    } }).then(parseTransformItem),
  updtateById: (id) =>
    fetch(Api.updateEssenciaById(id), { method: "PUT" }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deleteEssenciaById(id), { method: "DELETE" }).then(parseResponse),
};
