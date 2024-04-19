<!-- eslint-disable max-len -->
<template>
  <div>

    <b-form-group :invalid-feedback="violation.username" :state="hasErr.uN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.uN">
          <b-icon-person-badge-fill :title="dt.uN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.uN" :state="hasErr.uN" :disabled="isDisabled"
                      v-model="tempPerson.username" trim @keydown="violation.username=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.password" :state="hasErr.pw" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pw">
          <b-icon-safe-fill :title="dt.pw" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.pw" :state="hasErr.pw" :disabled="isDisabled"
                      v-model="tempPerson.password" trim @keydown="violation.password=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.firstName" :state="hasErr.fN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.fN">
          <b-icon-person-fill :title="dt.fN" />
        </b-input-group-prepend>

        <b-form-input :placeholder="dt.fN" :state="hasErr.fN" :disabled="isDisabled"
                      v-model="tempPerson.firstName" trim @keydown="violation.firstName=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.lastName" :state="hasErr.lN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.lN">
          <b-icon-people-fill :title="dt.lN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.lN" :state="hasErr.lN" :disabled="isDisabled"
                      v-model="tempPerson.lastName" trim @keydown="violation.lastName=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.email" :state="hasErr.em" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.em">
          <b-icon-envelope-fill :title="dt.em" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.em" :state="hasErr.em" :disabled="isDisabled"
                      v-model="tempPerson.email" trim @keydown="violation.email=null" />
      </b-input-group>
    </b-form-group>

    <!-- ADDRESS -->
    <b-form-group :invalid-feedback="violation.address" :state="hasErr.ad" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.ad">
          <b-icon-house-fill :title="dt.ad" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.ad" :state="hasErr.ad" :disabled="isDisabled"
                      v-model="tempPerson.address" trim @keydown="violation.address=null" />
      </b-input-group>
    </b-form-group>

    <!-- PHONE-->
    <b-form-group :invalid-feedback="violation.phone" :state="hasErr.pn" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pn">
          <b-icon-telephone-fill :title="dt.pn" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.pn" :state="hasErr.pn" :disabled="isDisabled"
                      v-model="tempPerson.phone" trim @keydown="violation.phone=null" />
      </b-input-group>
    </b-form-group>

    <b-form-group :invalid-feedback="violation.comments" :state="hasErr.co" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.co">
          <b-icon-text-paragraph :title="dt.co" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.co" :state="hasErr.co" :disabled="isDisabled"
                      v-model="tempPerson.comments" trim @keydown="violation.comments=null" />
      </b-input-group>
    </b-form-group>

    <b-button-group class="w-100 mb-3">
      <IconButton variant="primary" :disabled="isDisabled" @click="savePerson"
                  icon="cloud-arrow-up-fill" animation-style="throb"
                  :animate="animationSave"> Save</IconButton>

      <IconButton variant="danger" :disabled="isDisabled || isNew" @click="deleteConfirm"
                  icon="trash-fill" animation-style="throb"
      > Delete Person</IconButton>

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
import Person from '@/models/Person';

@Component({
  components: { IconButton },
})
/**
 * this will be our default personform class
 */
export default class PersonForm extends Mixins(GlobalMixin) {
  // set the prop
  @Prop({ type: Object, validator: (s) => s instanceof Object }) readonly Person: any

  // references for save and delete button + table
  $refs!: {
    iconDelete: BIcon
    iconSave : BIcon
  }

  animationSave = false

  animationDelete = false;

  // temp person that we can manipulate
  tempPerson: Person = new Person()

  // will story all violations we get
  violation: any = {}

  // what will display in the boxes
  dt = {
    uN: 'Username',
    fN: 'First Name',
    lN: 'Last Name',
    ad: 'Address',
    co: 'Comments',
    pn: 'Phone Number',
    em: 'Email',
    pw: 'Password',
  }

  showConfirmDelete = false

  // boostrap will display the violation messages
  get hasErr(): any {
    return {
      uN: this.violation.username ? false : null,
      fN: this.violation.firstName ? false : null,
      lN: this.violation.lastName ? false : null,
      ad: this.violation.address ? false : null,
      co: this.violation.comments ? false : null,
      pn: this.violation.phone ? false : null,
      em: this.violation.email ? false : null,
      pw: this.violation.password ? false : null,
    };
  }

  // check if the person is new, if no person with that ID found then its new
  get isNew(): boolean {
    return !this.Person || !this.Person.personID;
  }

  // save the person
  async savePerson() {
    // reset errors so we can check for new ones
    this.violation = await this.getErrorMessages(this.tempPerson);
    if (Object.keys(this.violation).length === 0) {
      // tell parent that this component is busy
      this.setBusy(true);
      this.animationSave = true;
      // check if person is new or not, if new then put, if not post
      const url = this.PERSON_API + (this.isNew ? '' : `/${this.tempPerson.personID}`);
      const method = this.isNew ? 'post' : 'put';
      try {
        const data = await this.callAPI(url, method, this.tempPerson);
        // emit to tell parent the new data + action that happened
        this.$emit(
          this.tempPerson.personID === data.personID ? 'updated' : 'added',
          Object.assign(new Person(), data),
        );
      } catch (err:any) {
        // get the violation messages from api
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);

        this.animationSave = false;
        await this.$router.push('/home');
      }
    }
  }

  // deletes a person
  async deletePerson() {
    const icon = this.$refs.iconDelete;
    this.setBusy(true);
    this.animationDelete = true;
    this.violation = {};

    try {
      await this.callAPI(`${this.PERSON_API}/${this.Person.personID}`, 'delete');
      this.tempPerson = new Person();// reset the text boxes since food is deleted
      this.$emit('deleted', this.Person);
    } catch (err: any) {
      this.$emit('reset', this.Person);
    } finally {
      this.setBusy(false);
      this.animationDelete = false;
    }
  }

  deleteConfirm() {
    this.cancel(); // reset any changes user may have done
    this.showConfirmDelete = true;
  }

  cancel() {
    this.violation = {}; // hide error messages if any
    this.tempPerson = Object.assign(new Person(), this.Person);
    this.$emit('cancelled', this.Person);
  }
}
</script>
