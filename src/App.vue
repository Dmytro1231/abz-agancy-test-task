<template>
  <TheHeader />
  <TheMain />
  <TheForm />
  <TheFooter />
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheForm from "./components/TheForm";
import TheFooter from "./components/TheFooter";

export default {
  name: "App",
  components: {
    TheHeader,
    TheMain,
    TheForm,
    TheFooter,
  },
};
</script>
