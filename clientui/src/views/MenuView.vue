<!-- eslint-disable max-len -->
<template>
  <div>
      <b-navbar class="row justify-content-center" toggleable="lg" type="dark" variant="secondary">
        <b-navbar-nav>
          <b-nav-item to="/home">Home</b-nav-item>
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
    <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger"
      active-tab-class="font-weight-bold text-success" content-class="mt-3" justified>
      <b-tab title="Afternoon Menu" active>
        <h2>Maki</h2>
        <b-card-group deck>
          <b-card v-for="item in maki" :key="item.foodID" :title="item.itemName" img-src="/maki.jpg" img-alt="Image"
                  img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>

          </b-card>
        </b-card-group>
        <h2>Sushi</h2>
        <b-card-group deck>
          <b-card v-for="item in sushi" :key="item.foodID" :title="item.itemName" img-src="/sushi.png" img-alt="Image"
                  img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>
          </b-card>
        </b-card-group>

        <h2>Drinks</h2>
        <b-card-group deck>
          <b-card v-for="item in drink" :key="item.drinkID" :title="item.itemName" img-src="/drink.png"
            img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>

          </b-card>
        </b-card-group>
      </b-tab>
      <b-tab title="Evening Menu">
        <h2>Maki</h2>
        <b-card-group deck>
          <b-card v-for="item in maki" :key="item.foodID" :title="item.itemName" img-src="/maki.jpg" img-alt="Image"
                  img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>

          </b-card>
        </b-card-group>
        <h2>Sushi</h2>
        <b-card-group deck>
          <b-card v-for="item in sushi" :key="item.foodID" :title="item.itemName" img-src="/sushi.png" img-alt="Image"
                  img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>

          </b-card>
        </b-card-group>

        <h2>Sashimi</h2>
        <b-card-group deck>
          <b-card v-for="item in sashimi" :key="item.foodID" :title="item.itemName" img-src="/sashimi.jpg"
                  img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>

          </b-card>
        </b-card-group>

        <h2>Drinks</h2>
        <b-card-group deck>
          <b-card v-for="item in drink" :key="item.drinkID" :title="item.itemName" img-src="/drink.png"
            img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
              {{ item.itemDescription }}
            </b-card-text>
            <b-card-text>
              {{ item.price }}
            </b-card-text>

          </b-card>
        </b-card-group>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
/**
 * our default menu view
 */
export default class MenuView extends Vue {
  // empty arrays so we can add food/drink items to them
  maki = []

  sushi = []

  sashimi = []

  drink = []

  // so we can call the fetches to populate our menu
  async mounted() {
    await this.getMaki(); await this.getSushi();
    await this.getSashimi(); await this.getDrink();
  }

  /* eslint-disable class-methods-use-this */
  // our fetches so we can populate our menu
  async getMaki() {
    this.maki = await fetch('http://localhost:3000/food/Maki').then((res) => res.json());
  }

  async getSushi() {
    this.sushi = await fetch('http://localhost:3000/food/Sushi').then((res) => res.json());
  }

  async getSashimi() {
    this.sashimi = await fetch('http://localhost:3000/food/Sashimi').then((res) => res.json());
  }

  async getDrink() {
    this.drink = await fetch('http://localhost:3000/drink').then((res) => res.json());
  }
}
</script>
