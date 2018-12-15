<template>
  <div class="header">
    <div class="main-container">
      <div class="navbar-header-container">
        <div class="navbar-header">
          <router-link to="/">物资借用</router-link>
          <button type="button" class="menu-button" @click="menuController">
		    	  <i class="fa fa-navicon"></i>
		      </button>
        </div>
      </div>
      <div class="menu-container" :class="isMenuOpen == 0?CloseMenu : OpenMenu">
        <ul>
          <li @click="menuController">
            <router-link to="/">主页</router-link>
          </li>
          <li @click="menuController">
            <router-link to="/user">我的</router-link>
          </li>
          <li @click="menuController">
            <router-link to="/manager">管理</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Header',
	data() {
    return {
			isMenuOpen: 1,
      OpenMenu: '',
      CloseMenu: 'CloseMenu',
    };
	},
	methods: {
		menuController() {
      if (document.body.clientWidth < 768) {
        if (this.isMenuOpen == -1) {
          this.OpenMenu = 'OpenMenu'
          this.isMenuOpen = 1
        }
        else if (this.isMenuOpen == 0) {
          this.isMenuOpen = 1
        } else if (this.isMenuOpen == 1) {
          this.isMenuOpen = 0
        }
        console.log(this.isMenuOpen)
      }
    }
  },
  created () {
    if (document.body.clientWidth < 768) {
      this.isMenuOpen = -1
    } else if (document.body.clientWidth >= 768) {
      this.isMenuOpen = 1
      console.log(this.isMenuOpen)
    }
  }
}
</script>

<style scoped>
  .header {
    width: 100%;
    min-height: 3rem;
    margin-bottom: 0.6rem;
  }

  .main-container {
    min-height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #e5e5e5;
    background: rgb(248,248,248);
  }

  .navbar-header-container {
    width: 15%;
  }

  .navbar-header {
    height: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }

  .navbar-header a {
    margin-left: 0.5rem;
  }

	.menu-button {
    display: none;
	}

  .menu-container {
    height: 2rem;
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    animation-fill-mode: forwards;
  }

  .menu-container ul {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .menu-container li {
    margin-left: 2rem;
    font-size: 1rem;
    height: 100%;
  }

  .menu-container a {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .OpenMenu {
    animation: openMenu 0.2s linear;
    animation-fill-mode: forwards;
  }

  .CloseMenu {
    animation: closeMenu 0.2s linear;
    animation-fill-mode: forwards;
  }

	@keyframes openMenu {
		0% {height: 0;}
    100% {height: 6rem;}
	}

	@keyframes closeMenu {
		0% {height: 6rem;}
    100% {height: 0;}
	}

  @media screen and (max-width: 767px) {
    .main-container {
      flex-direction: column;
      justify-content: flex-start;
      font-size: 3rem;
      width: 95%;
      margin-left: 2.5%;
    }

    .navbar-header-container {
      width: 100%;
    }

    .navbar-header {
      height: 3rem;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
    }

    .menu-button {
      display: block;
      margin-right: 0.5rem;
      height: 1.8rem;
      width: 2.2rem;
      font-size: 1.4rem;
      color: #777;
      outline: none;
      border: 1px solid #e5e5e5;
      background: rgb(248,248,248); 
	  }

    .menu-container {
      height: 0;
      width: 100%;
      border-top: 1px solid #e5e5e5;
    }

    .menu-container ul {
      height: 100%;
      width: 100%;
      flex-direction: column;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      overflow: hidden;
      padding: 0;
    }

    .menu-container li {
      height: 33.33%;
      width: 100%;
      margin-left: 1rem;
      font-size: 0.8rem;
    }

    a {
      height: 100%;
      width: 100%;
      display: block;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start !important;
    }
  }

  a {
    color: #777;
    text-decoration: none;
  }

  li {
    width: 100%;
    list-style:none;
  }
</style>
