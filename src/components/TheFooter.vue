<template>
  <footer class="footer">
    <div class="top">
      <p>© abz.agency specially for the test task</p>
    </div>
    <div class="middle"></div>
    <div class="bottom">
      <img
        src="../assets/abz.agecy.png"
        alt="logo-footer"
        width="135"
        height="24"
      />
      <p>0201 - Homepage - 1024</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .top {
    padding: 16px 0 16px;
    text-align: center;
  }
  .middle {
    background: #000;
    height: 40px;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 16px 0 13px;
    width: 1024px;
    margin: 0 auto;
    padding-left: 60px;
    img {
      margin-left: 6px;
    }
    p {
      font-family: "Asap", sans-serif;
      margin-left: 215px;
      font-size: 18px;
    }
  }
}

/* Wide Screens 2560px  ----------- */
@media only screen and (min-width: 2560px) {
  .footer {
    .bottom {
      margin-left: 25%;
      p {
        margin-left: 36%;
      }
    }
  }
}

/* Tablets ----------- */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .footer {
    .bottom {
      padding-left: 30px;
      width: 100vw;
      p {
        margin-left: 120px;
      }
    }
  }
}

/* Smartphones  ----------- */
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .footer {
    .middle {
      height: 50px;
    }
    .bottom {
      flex-direction: column;
      margin-left: 0;
      width: 100%;
      padding-left: 0;
      img {
        margin-left: 0;
      }
      p {
        margin-left: 0;
        margin-top: 25px;
      }
    }
  }
}
</style>
