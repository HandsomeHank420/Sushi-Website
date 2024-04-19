<!-- eslint-disable max-len -->
<template>
  <div class="flex-column container-fluid vh-98 vw-100 justify-content-center">
    <b-navbar class="row justify-content-center" toggleable="lg" type="dark" variant="secondary">
      <b-navbar-nav>
        <b-nav-item to="/home">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/menu">Menu</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/food">Create Food</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Sign Out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h1><strong>Create Drink</strong></h1>
    <div class="row justify-content-center">

                 <div class="col-4">
    <DrinkForm :drink="selectedDrink"></DrinkForm>
    <div class="col-14">
      <b-table striped hover dark  responsive primary-key="id" ref="drinkTable"  @row-selected="selectedDrink=$event[0]"
                   :fields="fields" :api-url="DRINK_API" :items="provider"
                   selectable select-mode="single" selected-variant="primary"
                   no-provider-sorting no-provider-filtering no-provider-paging>   </b-table>
                   </div>
    </div>
     </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { BTable, BvTableCtxObject } from 'bootstrap-vue/src/components/table';
import DrinkForm from '@/components/DrinkForm.vue';
import GlobalMixin from '@/mixins/global-mixin';
import Drink from '@/models/Drink';

@Component({
  components: { DrinkForm },
})
/**
 * default create drink view
 */
export default class CreateDrink extends Mixins(GlobalMixin) {
  provider(ctx:BvTableCtxObject):Promise<any> {
    return this.callAPI(`${ctx.apiUrl}`);
  }

  // fields for class
  fields=[
    { key: 'itemName', sortable: true },
    { key: 'itemDescription', sortable: true },
    { key: 'price', sortable: true },
  ]

  // references to the table where they will be held/form data
  $refs!: {
    drinkTable: BTable
    drinkForm: DrinkForm
  }

  // grab out a item to manipulate
  selectedDrink: Drink = new Drink()

  // refresh the form so its empty
  refreshForm() { this.$refs.drinkForm.$forceUpdate(); }

  // grab all items from the table
  get drinks() { return this.$refs.drinkTable.localItems; }

  selectRow(item: any) {
    if (!item.drinkID) return;

    this.$refs.drinkTable.selectRow(this.drinks.findIndex((i:any) => i.drinkID === item.drinkID));
    this.refreshForm();
  }
}
</script>
