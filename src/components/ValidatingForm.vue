<template>
  <form @submit="onSubmit">
    <input
      type="text"
      placeholder="Your name"
      v-model="name"
      :class="['form-control', { invalid: nError }]"
      @blur="nBlur"
    />

    <small v-if="nError" class="error">{{ nError }}</small>

    <input
      type="email"
      placeholder="Email"
      v-model="email"
      :class="['form-control', { invalid: eError }]"
      @blur="eBlur"
    />

    <small v-if="eError" class="error">{{ eError }}</small>

    <input
      type="tel"
      placeholder="Phone"
      v-model="phone"
      :class="['form-control', { invalid: pError }]"
      @blur="tBlur"
      v-phone
    />

    <small v-if="pError" class="error">{{ pError }}</small>

    <div class="radio-wrapper">
      <p>Select your position</p>
      <McvLoading v-if="loading" />
      <McvError v-if="error" />

      <div class="radio" v-for="(position, idx) in positions" :key="idx">
        <label class="radio"
          ><input
            type="radio"
            :value="position.name"
            v-model="checkbox"
          /><span></span> {{ position.name }}</label
        >
      </div>

      <small v-if="chboxError" class="error">{{ chboxError }}</small>
    </div>

    <div class="field__wrapper">
      <input
        name="file"
        type="file"
        id="field__file-2"
        class="field field__file"
        ref="myFile"
        @change="selectedFile"
        required
      />

      <label class="field__file-wrapper" for="field__file-2">
        <div class="field__file-button" :class="{ 'error-image': errorImage }">
          Upload
        </div>
        <div class="field__file-fake" :class="{ 'error-image': errorImage }">
          {{ fileName }}
        </div>
      </label>
    </div>

    <small class="error">{{ errorImage }}</small>

    <button class="btn" @click="checkValid" :disabled="valid == false">
      <a name="form">Sign up</a>
    </button>

    <div class="modal" v-if="isModalShowing == true">
      <div class="modal-container">
        <h3>Congratulations</h3>
        <p>You have successfully passed the registration</p>
        <button class="btn btn-modal" @click="isModalShowing = false">
          Great
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, useStore } from "vuex";
import { actionTypes } from "@/store/modules/form";
import { formValidation } from "../use/form-validation";

import McvLoading from "@/components/Loading";
import McvError from "@/components/Error";

import axios from "axios";

export default {
  name: "ValidatingForm",
  data() {
    return {
      errorImage: null,
      fileName: "Upload your photo",
      isModalShowing: false,
    };
  },

  setup() {
    const valid = false;
    const imgData = "";
    const store = useStore();
    store.dispatch(actionTypes.getToken);

    const submit = (values) => {
      axios
        .post("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
          body: JSON.stringify(values),
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log("ochubochka", e);
        });
      console.log("values", values);
    };

    return { ...formValidation(submit), valid, imgData };
  },

  computed: {
    ...mapState({
      positions: (state) => state.form.positions,
      loading: (state) => state.form.isLoading,
      error: (state) => state.form.error,
    }),
  },

  components: {
    McvLoading,
    McvError,
  },

  methods: {
    fetchPositions() {
      this.$store.dispatch(actionTypes.getPositons);
    },
    selectedFile() {
      let file = this.$refs.myFile.files[0];

      if (file.size > 2024 * 2024) {
        this.errorImage = "The photo size must not be greater than 5 Mb";
        this.valid = false;
      } else if (!file) {
        this.errorImage = "This filed is required";
        this.valid = false;
      } else if (file.type !== "image/jpeg") {
        this.errorImage = "Image type should be jpeg/jpg";
        this.valid = false;
      } else {
        this.errorImage = null;
        this.fileName = this.$refs.myFile.files[0].name;
        this.valid = true;
      }

      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        this.imgData = evt.target.result;
      };
      reader.onerror = (evt) => {
        console.error(evt);
      };
      return file;
    },
    checkValid() {
      if (
        this.metaName.dirty &&
        this.metaName.valid &&
        this.metaPhone.dirty &&
        this.metaPhone.valid &&
        this.metaEmail.dirty &&
        this.metaEmail.valid &&
        this.metaCheckbox.dirty &&
        this.metaCheckbox.valid
      ) {
        this.valid = true;
      } else return false;
    },
  },

  mounted() {
    this.fetchPositions();
  },

  // директива на валидацию телефона
  directives: {
    phone: {
      mounted(el) {
        el.oninput = function (e) {
          if (!e.isTrusted) {
            return;
          }
          const x = this.value
            .replace(/\D/g, "")
            .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/);
          if (!x[2] && x[1] !== "") {
            this.value = x[1] === "+380" ? x[1] : "+380" + x[1];
          } else {
            this.value = !x[3]
              ? x[1] + x[2]
              : x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
          }
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 180px;
  input {
    width: 100%;
    height: 54px;
    border: 1px solid #d0cfcf;
    border-radius: 4px;
    margin-bottom: 50px;
    outline: none;
    background: transparent;
    padding-left: 17px;
    &:first-child {
      margin-top: 24px;
    }
    &::placeholder {
      font-size: 16px;
      color: #7e7e7e;
    }
    &[type="tel"] {
      margin-bottom: 45px;
    }
  }

  .modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;

    .modal-container {
      position: absolute;
      top: 39%;
      left: 38%;
      padding: 15px 25px;
      background: #fff;
      width: 452px;
      height: 194px;
      border-radius: 4px;
      .btn-modal {
        margin-left: auto;
        margin-top: 35px;
      }
    }
  }

  .form-control {
    &:active {
      border-color: #00bdd3;
    }
    &:disabled {
      cursor: not-allowed;
      border-color: #d0cfcf;
      opacity: 0.8;
    }
    &.invalid {
      border-color: #e53935;
    }
  }

  .error {
    position: relative;
    bottom: 40px;
    width: 100%;
    color: #e53935;
    &:last-child {
      bottom: 0px;
    }
  }
}

.radio-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  p {
    margin-bottom: 12px;
  }
  .radio {
    display: flex;
    input {
      display: none;
      &:checked + span {
        background: #fff;
        border: 1px solid #00bdd3;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #00bdd3;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }
    }
    & span {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: transparent;
      border-radius: 50%;
      border: 1px solid #d0cfcf;
      margin-right: 12px;
      margin-bottom: 13px;
    }
  }
}

.field__wrapper {
  margin-top: 38px;
  .field__file {
    opacity: 0;
    position: absolute;
    width: 100px;
  }
  .field__file-wrapper {
    width: 380px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 50px;
    .error-image {
      border: 1px solid red;
    }
  }
  .field__file-fake {
    border: 1px solid #d0cfcf;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    width: 380px;
    height: 54px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.87);
    }
  }
  .field__file-button {
    width: 108px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
    border-radius: 4px 0px 0px 4px;
  }
}

/* Tablets ----------- */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  form {
    input[type="tel"] {
      margin-bottom: 40px;
    }
  }
  .modal {
    .modal-container {
      top: 50% !important;
      left: 50% !important;
      width: 452px;
      height: 194px;
      margin: -210px;
    }
  }
}

/* Smartphones ----------- */
@media only screen and (min-width: 320px) and (max-width: 767px) {
  form {
    width: 91%;
    margin-bottom: 152px;
    input {
      &[type="tel"] {
        margin-bottom: 46px;
      }
      &:first-child {
        margin-top: 29px;
      }
    }

    .field__wrapper {
      width: 100%;
      .field__file-wrapper {
        justify-content: initial;
      }
      .field__file-fake {
        width: 243px;
      }
      .field__file-button {
        width: 83px;
      }
    }
    .modal .modal-container {
      width: 328px;
      height: 220px;
      left: 3%;
    }
  }
}
</style>