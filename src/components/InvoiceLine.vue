<template>
  <div class="container">
    <h1>Invoice Line Management</h1>

    <!-- Search Input -->
    <div class="mb-3">
      <label for="search" class="form-label">Search Invoice Lines:</label>
      <input id="search" v-model="searchQuery" type="text" class="form-control" placeholder="Search by Product Name, Invoice ID, etc." />
    </div>

    <!-- Invoice Line Table View -->
    <h2>Invoice Line List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Value</th>
          <th>Invoice ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in filteredInvoiceLines" :key="line.id">
          <td>{{ line.productName }}</td>
          <td>{{ line.quantity }}</td>
          <td>{{ line.price }}</td>
          <td>{{ line.value }}</td>
          <td>{{ line.invoiceID }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editInvoiceLine(line.id)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteInvoiceLine(line.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Invoice Line Form -->
    <form @submit.prevent="handleSubmitInvoiceLine">
      <h2>Add/Edit Invoice Line</h2>
      <div class="mb-3">
        <label for="productName" class="form-label">Product Name:</label>
        <input id="productName" v-model="invoiceLine.productName" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="quantity" class="form-label">Quantity:</label>
        <input id="quantity" v-model="invoiceLine.quantity" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input id="price" v-model="invoiceLine.price" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="invoiceID" class="form-label">Invoice ID:</label>
        <input id="invoiceID" v-model="invoiceLine.invoiceID" type="text" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Save Invoice Line</button>
      <button type="button" class="btn btn-secondary" @click="resetInvoiceLineForm">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      invoiceLine: {
        productName: '',
        quantity: 0,
        price: 0,
        value: 0,
        invoiceID: '',
      },
      selectedInvoiceLineID: null,
      searchQuery: '',
    };
  },
  computed: {
    ...mapState(['invoiceLines']),
    filteredInvoiceLines() {
      if (!this.searchQuery) {
        return this.invoiceLines;
      }
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      return this.invoiceLines.filter(line => 
        line.productName.toLowerCase().includes(lowerCaseQuery) || 
        line.invoiceID.toLowerCase().includes(lowerCaseQuery)
      );
    },
  },
  methods: {
    ...mapMutations([
      'ADD_INVOICE_LINE',
      'UPDATE_INVOICE_LINE',
      'DELETE_INVOICE_LINE',
    ]),
    handleSubmitInvoiceLine() {
      this.invoiceLine.value = this.invoiceLine.quantity * this.invoiceLine.price;
      if (this.selectedInvoiceLineID !== null) {
        this.UPDATE_INVOICE_LINE({
          id: this.selectedInvoiceLineID,
          ...this.invoiceLine
        });
      } else {
        this.ADD_INVOICE_LINE(this.invoiceLine);
      }
      this.resetInvoiceLineForm();
    },
    editInvoiceLine(id) {
      const line = this.invoiceLines.find(l => l.id === id);
      if (line) {
        this.invoiceLine = { ...line };
        this.selectedInvoiceLineID = id;
      }
    },
    deleteInvoiceLine(id) {
      this.DELETE_INVOICE_LINE(id);
    },
    resetInvoiceLineForm() {
      this.invoiceLine = {
        productName: '',
        quantity: 0,
        price: 0,
        value: 0,
        invoiceID: '',
      };
      this.selectedInvoiceLineID = null;
    },
  },
};
</script>

<style scoped>
/* Add some basic styling */
table {
  width: 100%;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 8px;
  text-align: left;
}
form {
  margin-bottom: 20px;
}
</style>
