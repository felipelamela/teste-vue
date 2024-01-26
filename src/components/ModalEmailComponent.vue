<template>
  <div v-if="stateModal" class="modal-overlay">
    <div class="modal-container">
      <div v-if="failure" class="alert alert-danger" role="alert">
        Erro ao enviar, verifique seu email!
      </div>
      <h2>{{ title }}</h2>

      <div class="col-md-12">
        <form @submit.prevent="sendMail">
          <label for="userName">Nome:</label>
          <input
            required
            v-model="userName"
            id="userName"
            class="form-control mw-100"
            style="width: 100%"
          />

          <label for="userEmail">Email:</label>
          <input
            required
            type="email"
            v-model="userEmail"
            id="userEmail"
            class="form-control mw-100"
          />
          <div class="modal-content">
            <div class="container mt-5">
              <div class="row">
                <ul class="list-group">
                  <li class="list-group-item" style="padding: 20px">
                    <strong>CEP:</strong>
                    <span style="padding: 10px">{{ dateCep?.cep }}</span>
                  </li>
                  <li class="list-group-item" style="padding: 20px">
                    <strong>Bairro:</strong>
                    <span style="padding: 10px">{{ dateCep?.bairro }}</span>
                  </li>
                  <li class="list-group-item" style="padding: 20px">
                    <strong>Logradouro:</strong>
                    <span style="padding: 10px">{{ dateCep?.logradouro }}</span>
                  </li>
                  <li class="list-group-item" style="padding: 20px">
                    <strong>Localidade:</strong>
                    <span style="padding: 10px">{{ dateCep?.localidade }}</span>
                  </li>
                  <li class="list-group-item" style="padding: 20px">
                    <strong>UF:</strong>
                    <span style="padding: 10px">{{ dateCep?.uf }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button
              @click="sendMail"
              class="btn btn-primary"
              style="margin-top: 20px"
            >
              Enviar e-mail
            </button>

            <button
              type="button"
              @click="closeModal"
              class="btn btn-danger"
              style="margin-top: 20px"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      userName: "",
      userEmail: "",
      failure: false,
    };
  },
  props: {
    title: String,
    setModal: Function,
    dateCep: Object,
    userDate: Object,
    stateModal: Boolean,
    sendSuccess: Function,
  },
  methods: {
    closeModal() {
      if (this.setModal) this.setModal();
    },
    validadeEmail() {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(this.userEmail);
    },
    sendMail() {
      const dateMail = {
        email: this.userEmail,
        title: "Dados de endereço",
        body: {
          CEP: this.dateCep?.cep,
          bairro: this.dateCep?.bairro,
          logradouro: this.dateCep?.logradouro,
          localidade: this.dateCep?.localidade,
          uf: this.dateCep?.uf,
        },
      };

      if (this.validadeEmail()) {
        console.log(dateMail);
        if (this.setModal) this.setModal();
        if (this.sendSuccess) {
          this.sendSuccess();
          setTimeout(() => {
            if (this.sendSuccess) this.sendSuccess();
          }, 2000);
        }
      } else {
        this.failure = true;
        setTimeout(() => {
          this.failure = false;
        }, 3000);
      }

      /*

          //COMO É UM TESTE NÃO FIZ A VALIDAÇÃO PARA O ENVIO NO BACKEND ENTÃO IRA TER UM ERRO

       axios
        .post("LINK PARA ENVIO", dateMail)
        .then((response) => {
          console.log(dateMail);
        })
        .catch((error) => {
          console.log(dateMail);
          if (this.setModal) this.setModal();

        });

      */
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  z-index: 100;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

button {
  cursor: pointer;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}
</style>
