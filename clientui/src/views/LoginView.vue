<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="d-flex container-fluid justify-content-center">
            <b-form-group id="input-group-1">
              <b-form-input id="input-1" placeholder="Enter username" v-model="name" required></b-form-input>
                <b-form-input id="input-2" placeholder="password" required></b-form-input>
                <b-button type="submit" variant="primary" @click="getUsername">Submit</b-button>
              <b-button variant="success" @click="$router.push('/person')">Create Account</b-button>
            </b-form-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
/**
 *  default menuView
 */
export default class MenuView extends Vue {
  // give it a blank name so we can append the person's name
  name = ''

  // have currentUser so we can check their ID to authenticate
  currentUser:any

  // get the username from that user and put into storage so we can remember them
  async getUsername() {
    this.currentUser = await fetch(`http://localhost:3000/person/${this.name}`).then((res) => res.json());
    localStorage.setItem('currentUser', this.currentUser.personID);
    await this.$router.push('/home');
  }
}
</script>
