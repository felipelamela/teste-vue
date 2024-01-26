import axios from "axios";

export const Finder = async () => {
  axios
    .get("https://viacep.com.br/ws/01001000/json/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
};
