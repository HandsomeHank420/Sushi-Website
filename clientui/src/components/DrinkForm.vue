<!-- eslint-disable max-len -->
<template>
  <div>
    <b-form-group :invalid-feedback="violation.itemName" :state="hasErr.iN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.iN">
          <b-icon-tag-fill :title="dt.iN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.iN" :state="hasErr.iN" :disabled="isDisabled"
                      v-model="tempDrink.itemName" trim @keydown="violation.itemName=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.itemDescription" :state="hasErr.iD" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.iD">
          <b-icon-text-paragraph :title="dt.iD" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.iD" :state="hasErr.iD" :disabled="isDisabled"
                      v-model="tempDrink.itemDescription"
                      trim @keydown="violation.itemDescription=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.price" :state="hasErr.pR" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pR">
          <b-icon-currency-dollar :title="dt.pR" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.pR" :state="hasErr.pR" :disabled="isDisabled"
                      v-model="tempDrink.price" trim @keydown="violation.price=null" />
      </b-input-group>
    </b-form-group>

    <b-button-group class="w-100 mb-3">
      <IconButton variant="primary" :disabled="isDisabled" @click="saveDrink"
                  icon="cloud-arrow-up-fill" animation-style="throb"
                  :animate="animationSave"> Create Drink Item</IconButton>

      <IconButton variant="danger" :disabled="isDisabled || isNew" @click="deleteConfirm"
                  icon="trash-fill" animation-style="throb"
                  :animate="animationDelete"> Delete Drink Item</IconButton>

      <IconButton variant="primary" :disabled="isDisabled" @click="cancel"
                  icon="x-square-fill" animation-style="throb">Cancel</IconButton>
    </b-button-group>

  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { BIcon } from 'bootstrap-vue';
import GlobalMixin from '@/mixins/global-mixin';
import IconButton from '@/components/IconButton.vue';
import Drink from '@/models/Drink';
import { BTable, BvTableCtxObject } from 'bootstrap-vue/src/components/table';

@Component({
  components: { IconButton },
})
/**
 * this will be our default drinkform class
 */
export default class DrinkForm extends Mixins(GlobalMixin) {
  // set the prop
  @Prop({ type: Object, validator: (s) => s instanceof Object }) readonly Drink: any

  // for authentication
  async mounted() {
    if (localStorage.getItem('currentUser') !== 'd9d45a23-825d-4bd2-8485-cd292b158396') {
      await this.$router.push('/home');
    }
  }

  // references for save and delete button
  $refs!: {
    iconDelete: BIcon
    iconSave : BIcon
  }

  animationSave = false

  animationDelete = false;

  // temp drink that we can manipulate
  tempDrink: Drink = new Drink()

  // will store all violations we get
  violation: any = {}

  // what will display in the boxes
  dt = {
    iN: 'Drink Name',
    iD: 'Drink Description',
    pR: 'Price',
  }

  showConfirmDelete = false

  // boostrap will display the violation messages
  get hasErr(): any {
    return {
      iN: this.violation.itemName ? false : null,
      iD: this.violation.itemDescription ? false : null,
      pR: this.violation.price ? false : null,
    };
  }

  // check if the drink is new, if no drink with that ID found then its new
  get isNew(): boolean {
    return !this.Drink || !this.Drink.drinkID;
  }

  // save the drink
  async saveDrink() {
    // reset errors so we can check for new ones
    this.violation = await this.getErrorMessages(this.tempDrink);
    if (Object.keys(this.violation).length === 0) {
      // tell parent that this component is busy
      this.setBusy(true);
      this.animationSave = true;
      // check if drink is new or not, if new then put, if not post
      const url = this.DRINK_API + (this.isNew ? '' : `/${this.tempDrink.drinkID}`);
      const method = this.isNew ? 'post' : 'put';
      try {
        const data = await this.callAPI(url, method, this.tempDrink);
        // emit to tell parent the new data + action that happened
        this.$emit(
          this.tempDrink.drinkID === data.drinkID ? 'updated' : 'added',
          Object.assign(new Drink(), data),
        );
      } catch (err:any) {
        // get the violation messages from api
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false); // tell dat parent its not busy
        this.animationSave = false;
      }
    }
  }

  // deletes a drink (come back to finish)
  async deleteDrink() {
    const icon = this.$refs.iconDelete;
    this.setBusy(true);
    this.violation = {};
    // try so it calls api and deletes it while telling parent its reset/not busy anymore
    try {
      await this.callAPI(`${this.DRINK_API}/${this.Drink.drinkID}`, 'delete');
      this.tempDrink = new Drink();
      this.$emit('deleted', this.Drink);
    } catch (err: any) {
      this.$emit('reset', this.Drink);
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
    this.tempDrink = Object.assign(new Drink(), this.Drink);
    this.$emit('cancelled', this.Drink);
  }
}
</script>
