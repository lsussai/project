import axios from 'axios';

export const CALCADOS_URL = 'https://api.mercadolibre.com/sites/MLB/search?category=categoryId&q=tenis';

const getAPI = async () => {
  const { data } = await axios.get(CALCADOS_URL);
  return data;
};
export default getAPI;