<template>
  <div class="flex-column">
    <b-navbar class="d-flex container-fluid justify-content-center"
              toggleable="lg" type="dark" variant="secondary">
      <b-navbar-nav>
        <b-nav-item to="/home">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/menu">Menu</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/drink">Create Drink</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Sign Out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h1><strong>Create Food</strong></h1>
    <div class="row justify-content-center">

                 <div class="col-4">
    <FoodForm></FoodForm>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import FoodForm from '@/components/FoodForm.vue';
import GlobalMixin from '@/mixins/global-mixin';

@Component({
  components: { FoodForm },
})
/**
 * default editmenu view
 */
export default class CreateFoodView extends Mixins(GlobalMixin) {

}
</script>
