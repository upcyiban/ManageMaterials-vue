<template>
  <div class="footer">
    <p><i class="fa fa-heart"></i> from the upcYiBan</p>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 2rem;
  position: relative;
  bottom: 0%;
  border-top: 1px solid #e5e5e5;
  color: #777;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

p {
  margin-left: 5%;
  width: 90%;
}

@media screen and (max-width: 767px) {
  .footer {
    position: relative;
  }
}

</style>
