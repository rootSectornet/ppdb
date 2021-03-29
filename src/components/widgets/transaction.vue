<script>
/**
 * Transactions component
 */
export default {
  props: {
    transactions: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<template>
  <div class="table-responsive mb-0">
    <table class="table table-centered table-nowrap">
      <thead class="thead-light">
        <tr>
          <th>Rangking</th>
          <th>Nama</th>
          <th>Nilai</th>
          <th>Asal Sekolah</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in transactions" :key="data.id">
          <td>
            {{data.id}}
          </td>
          <td>{{data.name}}</td>
          <td>{{data.date}}</td>
          <td>{{data.total}}</td>
        </tr>
      </tbody>
    </table>
    <b-modal v-model="showModal" title="Order Details" centered>
      <p class="mb-2">
        Product id:
        <span class="text-primary">#SK2540</span>
      </p>
      <p class="mb-4">
        Billing Name:
        <span class="text-primary">Neal Matthews</span>
      </p>
      <div class="table-responsive">
        <table class="table table-centered table-nowrap">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <div>
                  <img src="@/assets/images/product/img-7.png" alt class="avatar-sm" />
                </div>
              </th>
              <td>
                <div>
                  <h5 class="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                  <p class="text-muted mb-0">$ 225 x 1</p>
                </div>
              </td>
              <td>$ 255</td>
            </tr>
            <tr>
              <th scope="row">
                <div>
                  <img src="@/assets/images/product/img-4.png" alt class="avatar-sm" />
                </div>
              </th>
              <td>
                <div>
                  <h5 class="text-truncate font-size-14">Phone patterned cases</h5>
                  <p class="text-muted mb-0">$ 145 x 1</p>
                </div>
              </td>
              <td>$ 145</td>
            </tr>
            <tr>
              <td colspan="2">
                <h6 class="m-0 text-right">Sub Total:</h6>
              </td>
              <td>$ 400</td>
            </tr>
            <tr>
              <td colspan="2">
                <h6 class="m-0 text-right">Shipping:</h6>
              </td>
              <td>Free</td>
            </tr>
            <tr>
              <td colspan="2">
                <h6 class="m-0 text-right">Total:</h6>
              </td>
              <td>$ 400</td>
            </tr>
          </tbody>
        </table>
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModal = false">Close</b-button>
      </template>
    </b-modal>
  </div>
  <!-- end table -->
</template>