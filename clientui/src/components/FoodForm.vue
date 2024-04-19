<!-- eslint-disable max-len -->
<template>
  <div>
    <b-form-group   :invalid-feedback="violation.itemName" :state="hasErr.iN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.iN">
          <b-icon-tag-fill :title="dt.iN" />
        </b-input-group-prepend>
        <b-form-input  :placeholder="dt.iN" :state="hasErr.iN" :disabled="isDisabled"
                      v-model="tempFood.itemName" trim @keydown="violation.itemName=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.itemDescription" :state="hasErr.iD" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.iD">
          <b-icon-text-paragraph :title="dt.iD" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.iD" :state="hasErr.iD" :disabled="isDisabled"
                      v-model="tempFood.itemDescription"
                      trim @keydown="violation.itemDescription=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.itemType" :state="hasErr.iT" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.iT">
          <b-icon-type :title="dt.iT" />
        </b-input-group-prepend>

        <b-form-input :placeholder="dt.iT" :state="hasErr.iT" :disabled="isDisabled"
                      v-model="tempFood.itemType" trim @keydown="violation.itemType=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.price" :state="hasErr.pR" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pR">
          <b-icon-currency-dollar :title="dt.pR" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.pR" :state="hasErr.pR" :disabled="isDisabled"
                      v-model="tempFood.price" trim @keydown="violation.price=null" />
      </b-input-group>
    </b-form-group>

    <b-button-group class="w-100 mb-3">
      <IconButton variant="primary" :disabled="isDisabled" @click="saveFood"
                  icon="cloud-arrow-up-fill" animation-style="throb"
                  :animate="animationSave"> Create Food Item</IconButton>

      <IconButton variant="danger" :disabled="isDisabled || isNew" @click="deleteConfirm"
                        icon="trash-fill" animation-style="throb"
                  :animate="animationDelete"> Delete Food Item</IconButton>

      <IconButton variant="primary" :disabled="isDisabled" @click="cancel"
                  icon="x-square-fill" animation-style="throb">Cancel</IconButton>
    </b-button-group>

     <div class="col-14">
    <b-table striped hover dark  responsive primary-key="foodID" ref="foodTable"
                 :fields="fields" :api-url="FOOD_API" :items="provider"
                 selectable select-mode="single" selected-variant="primary"
                 no-provider-sorting no-provider-filtering no-provider-paging>   </b-table>
                 </div>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { BTable, BvTableCtxObject } from 'bootstrap-vue/src/components/table';
import { BIcon } from 'bootstrap-vue';
import Food from '@/models/Food';
import GlobalMixin from '@/mixins/global-mixin';
import IconButton from '@/components/IconButton.vue';

@Component({
  components: { IconButton },
})
/**
 * this will be our default foodform class
 */
export default class FoodForm extends Mixins(GlobalMixin) {
  // set the prop
  @Prop({ type: Object, validator: (s) => s instanceof Object }) readonly Food: any

  // for authentication
  async mounted() {
    if (localStorage.getItem('currentUser') !== 'd9d45a23-825d-4bd2-8485-cd292b158396') {
      await this.$router.push('/home');
    }
  }

  provider(ctx:BvTableCtxObject):Promise<any> {
    return this.callAPI(`${ctx.apiUrl}`);
  }

  fields=[
    { key: 'itemName', sortable: true },
    { key: 'itemDescription', sortable: true },
    { key: 'itemType', sortable: true },
    { key: 'price', sortable: true },
  ]

  // references for save and delete button + table
  $refs!: {
    foodTable: BTable
    iconDelete: BIcon
    iconSave : BIcon
  }

  animationSave = false

  animationDelete = false;

  // temp food that we can manipulate
  tempFood: Food = new Food()

  // will store all violations we get
  violation: any = {}

  // what will display in the boxes
  dt = {
    iN: 'Food Name',
    iD: 'Food Description',
    iT: 'Food Type',
    pR: 'Price',
  }

  showConfirmDelete = false

  // boostrap will display the violation messages
  get hasErr(): any {
    return {
      iN: this.violation.itemName ? false : null,
      iD: this.violation.itemDescription ? false : null,
      iT: this.violation.itemType ? false : null,
      pR: this.violation.price ? false : null,
    };
  }

  // check if the food is new, if no food with that ID found then its new
  get isNew(): boolean {
    return !this.Food || !this.Food.foodID;
  }

  // save the food
  async saveFood() {
    // reset errors so we can check for new ones
    this.violation = await this.getErrorMessages(this.tempFood);
    if (Object.keys(this.violation).length === 0) {
      // tell parent that this component is busy
      this.setBusy(true);
      this.animationSave = true;
      // check if food is new or not, if new then put, if not post
      const url = this.FOOD_API + (this.isNew ? '' : `/${this.tempFood.foodID}`);
      const method = this.isNew ? 'post' : 'put';
      try {
        const data = await this.callAPI(url, method, this.tempFood);
        // emit to tell parent the new data + action that happened
        this.$emit(
          this.tempFood.foodID === data.foodID ? 'updated' : 'added',
          Object.assign(new Food(), data),
        );
      } catch (err:any) {
        // get the violation messages from api
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);
        this.animationSave = false;
      }
    }
  }

  // deletes a food
  async deleteFood() {
    const icon = this.$refs.iconDelete;
    this.setBusy(true);
    // this.animate(icon, true);
    this.violation = {};

    try {
      await this.callAPI(`${this.FOOD_API}/${this.Food.foodID}`, 'delete');
      this.tempFood = new Food(); // reset the text boxes since food is deleted
      this.$emit('deleted', this.Food);
    } catch (err: any) {
      this.$emit('reset', this.Food);
    } finally {
      this.setBusy(false);
    }
  }

  deleteConfirm() {
    this.cancel(); // reset any changes user may have done
    this.showConfirmDelete = true;
  }

  cancel() {
    this.violation = {}; // hide error messages if any
    this.tempFood = Object.assign(new Food(), this.Food);
    this.$emit('cancelled', this.Food);
  }
}
</script>
