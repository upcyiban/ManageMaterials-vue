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
      <div class="menu-container" :class="isMenuOpen > 0?OpenMenu : CloseMenu">
        <ul>
          <li>
            <router-link to="/">主页</router-link>
          </li>
          <li>
            <router-link to="/user">我的</router-link>
          </li>
          <li>
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
      OpenMenu: 'OpenMenu',
      CloseMenu: 'CloseMenu',
    };
	},
	methods: {
		menuController() {
      if (this.isMenuOpen == 0) {
        this.isMenuOpen = 1
      } else if (this.isMenuOpen == 1) {
        this.isMenuOpen = 0
      }
		}
  },
  created() {
    if (document.body.clientWidth < 768) {
      this.isMenuOpen = 0
      console.log(document.body.clientWidth)
    } else {
      this.isMenuOpen = 1
      console.log(document.body.clientWidth)
    }
  }
}
</script>

<style>
  .header {
    width: 100%;
    min-height: 2rem;
    margin-bottom: 0.2rem;
  }

  .main-container {
    min-height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #e5e5e5;
    background: rgb(248,248,248);
  }

  .navbar-header-container {
    width: 20%;
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
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    animation-fill-mode: forwards;
  }

  .menu-container ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .menu-container li {
    margin-left: 2rem;
    font-size: 0.8rem;
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
    100% {height: 4rem;}
	}

	@keyframes closeMenu {
		0% {height: 4rem;}
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
      height: 2rem;
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
      height: 1.4rem;
      width: 1.8rem;
      font-size: 1.1rem;
      color: #777;
      outline: none;
      border: none;
      border: 1px solid #e5e5e5;
      background: rgb(248,248,248); 
	  }

    .menu-container {
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
      width: 100%;
      margin-left: 1rem;
      font-size: 0.6rem;
    }

    li a {
      width: 100%;
      display: block;
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
