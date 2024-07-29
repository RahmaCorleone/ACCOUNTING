<template>
  <div class="container">
    <h1>Invoice Management</h1>

    <!-- Search Input -->
    <div class="mb-3">
      <label for="search" class="form-label">Search Invoices:</label>
      <input id="search" v-model="searchQuery" type="text" class="form-control" placeholder="Search by Provider Name or Address" />
    </div>

    <!-- Invoice Table View -->
    <h2>Invoice List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>DateTime</th>
          <th>Provider Name</th>
          <th>Address</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Remaining</th>
          <th>Delivered By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in filteredInvoices" :key="invoice.ID">
          <td>{{ invoice.ID }}</td>
          <td>{{ invoice.DateTime }}</td>
          <td>{{ invoice.ProviderName }}</td>
          <td>{{ invoice.Address }}</td>
          <td>{{ invoice.Total }}</td>
          <td>{{ invoice.Paid }}</td>
          <td>{{ invoice.Remaining }}</td>
          <td>{{ invoice.DeliveredBy }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editInvoice(invoice.ID)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteInvoice(invoice.ID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Invoice Form -->
    <form @submit.prevent="handleSubmitInvoice">
      <h2>Add/Edit Invoice</h2>
      <div class="mb-3">
        <label for="invoiceID" class="form-label">ID:</label>
        <input id="invoiceID" v-model="invoice.ID" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="invoiceDateTime" class="form-label">DateTime:</label>
        <input id="invoiceDateTime" v-model="invoice.DateTime" type="datetime-local" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="invoiceProviderName" class="form-label">Provider Name:</label>
        <input id="invoiceProviderName" v-model="invoice.ProviderName" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="invoiceAddress" class="form-label">Address:</label>
        <input id="invoiceAddress" v-model="invoice.Address" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="invoiceDeliveredBy" class="form-label">Delivered By:</label>
        <input id="invoiceDeliveredBy" v-model="invoice.DeliveredBy" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="invoiceTotal" class="form-label">Total:</label>
        <input id="invoiceTotal" v-model="invoice.Total" type="number" class="form-control" readonly />
      </div>
      <div class="mb-3">
        <label for="invoicePaid" class="form-label">Paid:</label>
        <input id="invoicePaid" v-model="invoice.Paid" type="number" class="form-control" @input="updateRemaining" />
      </div>
      <div class="mb-3">
        <label for="invoiceRemaining" class="form-label">Remaining:</label>
        <input id="invoiceRemaining" v-model="invoice.Remaining" type="number" class="form-control" readonly />
      </div>
      <button type="submit" class="btn btn-primary">Save Invoice</button>
      <button type="button" class="btn btn-secondary" @click="resetInvoiceForm">Cancel</button>
    </form>

    <!-- Include InvoiceLineComponent -->
    <InvoiceLine/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import InvoiceLine from './InvoiceLine.vue';

export default {
  components: {
    InvoiceLine,
  },
  data() {
    return {
      invoice: {
        ID: '',
        DateTime: '',
        ProviderName: '',
        Address: '',
        Total: 0,
        Paid: 0,
        Remaining: 0,
        DeliveredBy: '',
      },
      selectedInvoiceID: null,
      searchQuery: '',
    };
  },
  computed: {
    ...mapState(['invoices']),
    filteredInvoices() {
      if (!this.searchQuery) {
        return this.invoices;
      }
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      return this.invoices.filter(invoice => 
        invoice.ProviderName.toLowerCase().includes(lowerCaseQuery) || 
        invoice.Address.toLowerCase().includes(lowerCaseQuery)
      );
    },
  },
  methods: {
    ...mapMutations([
      'ADD_INVOICE',
      'UPDATE_INVOICE',
      'DELETE_INVOICE',
    ]),
    handleSubmitInvoice() {
      if (this.selectedInvoiceID) {
        // Update existing invoice
        this.UPDATE_INVOICE(this.invoice);
      } else {
        // Add new invoice
        this.ADD_INVOICE(this.invoice);
      }
      this.resetInvoiceForm();
    },
    editInvoice(id) {
      const invoice = this.invoices.find(inv => inv.ID === id);
      if (invoice) {
        this.invoice = { ...invoice };
        this.selectedInvoiceID = id;
      }
    },
    deleteInvoice(id) {
      this.DELETE_INVOICE(id);
    },
    updateRemaining() {
      this.invoice.Remaining = this.invoice.Total - this.invoice.Paid;
    },
    resetInvoiceForm() {
      this.invoice = {
        ID: '',
        DateTime: '',
        ProviderName: '',
        Address: '',
        Total: 0,
        Paid: 0,
        Remaining: 0,
        DeliveredBy: '',
      };
      this.selectedInvoiceID = null;
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
