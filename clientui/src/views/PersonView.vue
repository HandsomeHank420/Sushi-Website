<template>
  <div>
<!--      <h1 class="col-lg-8">Create Account Page-->
<!--      </h1>-->
    <b-navbar class="row justify-content-center" toggleable="lg" type="dark" variant="secondary">
      <b-navbar-nav>
        <b-nav-item to="/home">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/menu">Menu</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/food">Create Drink</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Sign Out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="d-flex container-fluid vh-98 vw-100 justify-content-center">
        <PersonForm></PersonForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import GlobalMixin from '@/mixins/global-mixin';
import PersonForm from '@/components/PersonForm.vue';

@Component({
  components: { PersonForm },
})
/**
 * default person view
 */
export default class PersonView extends Mixins(GlobalMixin) {

}

</script>
