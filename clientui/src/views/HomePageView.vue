<template>
  <div class="d-flex container-fluid justify-content-center">
    <div class ="flex-column justify-content-center">
    <h1>Welcome to We Love Sushi</h1>
    <div class="row justify-content-center">
      <b-navbar toggleable="lg" type="dark" variant="secondary">
        <b-navbar-nav>
          <b-nav-item to="/menu">Menu</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/food">Create Food</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/drink">Create Drink</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
      <img width="50%" src="../../public/Logo.png" alt="It aint showing up">
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import GlobalMixin from '@/mixins/global-mixin';

@Component
/**
 * default home view
 */
export default class HomeView extends Mixins(GlobalMixin) { }
</script>
