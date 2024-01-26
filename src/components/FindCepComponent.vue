<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div v-if="success" class="alert alert-success" role="alert">
        Enviado com sucesso!
      </div>

      <div class="col-md-6">
        <label for="numericInput">Digite o CEP:</label>
        <div class="input-group">
          <input
            id="numericInput"
            v-model="numericCep"
            @input="handleInput"
            class="form-control mw-100"
          />
          <button @click="fetchData" class="btn btn-primary">Buscar CEP</button>
        </div>
        <ModalEmailComponent
          title="Dados envio do e-mail"
          :dateCep="dateCep"
          :setModal="setOpenModal"
          :userDate="userDate"
          :stateModal="stateModal"
          :sendSuccess="sendSuccess"
        />
        <div v-if="setScreenCep" class="container mt-5">
          <div class="row">
            <ul class="list-group">
              <li class="list-group-item" style="padding: 20px">
                <strong>CEP:</strong>
                <span style="padding: 10px">{{ dateCep.bairro }}</span>
              </li>
              <li class="list-group-item" style="padding: 20px">
                <strong>Bairro:</strong>
                <span style="padding: 10px">{{ dateCep.bairro }}</span>
              </li>
              <li class="list-group-item" style="padding: 20px">
                <strong>Logradouro:</strong>
                <span style="padding: 10px">{{ dateCep.logradouro }}</span>
              </li>
              <li class="list-group-item" style="padding: 20px">
                <strong>Localidade:</strong>
                <span style="padding: 10px">{{ dateCep.localidade }}</span>
              </li>
              <li class="list-group-item" style="padding: 20px">
                <strong>UF:</strong>
                <span style="padding: 10px">{{ dateCep.uf }}</span>
              </li>
            </ul>
          </div>
          <button
            @click="setOpenModal"
            class="btn btn-primary"
            style="margin-top: 20px"
          >
            Enviar e-mail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import ModalEmailComponent from "./ModalEmailComponent.vue";

export default {
  components: {
    ModalEmailComponent,
  },
  data() {
    return {
      numericCep: "",
      dateCep: {
        cep: "",
        bairro: "",
        logradouro: "",
        localidade: "",
        uf: "",
      },
      setScreenCep: false,
      setScreenEmail: false,
      userDate: {
        email: "",
        name: "",
        password: "",
      },
      stateModal: false,
      success: false,
    };
  },
  methods: {
    handleInput() {
      this.numericCep = this.numericCep.replace(/\D/g, "");
      if (this.numericCep.length > 9) {
        this.numericCep = this.numericCep.slice(0, 9);
      }
    },

    async fetchData() {
      const apiUrl = `https://viacep.com.br/ws/${this.numericCep}/json/`;

      await axios
        .get(apiUrl)
        .then((response) => {
          console.log(response);
          this.dateCep = {
            cep: this.numericCep,
            bairro: response.data.bairro,
            logradouro: response.data.logradouro,
            localidade: response.data.localidade,
            uf: response.data.uf,
          };
          this.setScreenCep = true;
        })
        .catch((error) => {
          this.setScreenCep = true;

          console.error("Erro na solicitação:", error);
        });
    },
    sendSuccess() {
      this.success = !this.success;
    },
    setOpenModal() {
      this.stateModal = !this.stateModal;
    },
  },
};
</script>
