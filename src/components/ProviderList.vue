<template>
  <div class="container">
    <h1>Provider Management</h1>

    <!-- Search Input -->
    <div class="mb-3">
      <label for="search" class="form-label">Search Providers:</label>
      <input id="search" v-model="searchQuery" type="text" class="form-control" placeholder="Search by Name, Address, or Service" />
    </div>

    <!-- Provider Table View -->
    <h2>Provider List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Service</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="provider in filteredProviders" :key="provider.ID">
          <td>{{ provider.ID }}</td>
          <td>{{ provider.Name }}</td>
          <td>{{ provider.Address }}</td>
          <td>{{ provider.Phone }}</td>
          <td>{{ provider.Service }}</td>
          <td>{{ provider.Note }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editProvider(provider.ID)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteProvider(provider.ID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Provider Form -->
    <form @submit.prevent="handleSubmitProvider">
      <h2>Add/Edit Provider</h2>
      <div class="mb-3">
        <label for="providerID" class="form-label">ID:</label>
        <input id="providerID" v-model="provider.ID" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="providerName" class="form-label">Name:</label>
        <input id="providerName" v-model="provider.Name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="providerAddress" class="form-label">Address:</label>
        <input id="providerAddress" v-model="provider.Address" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="providerPhone" class="form-label">Phone:</label>
        <input id="providerPhone" v-model="provider.Phone" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="providerService" class="form-label">Service:</label>
        <input id="providerService" v-model="provider.Service" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="providerNote" class="form-label">Note:</label>
        <input id="providerNote" v-model="provider.Note" type="text" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Save Provider</button>
      <button type="button" class="btn btn-secondary" @click="resetProviderForm">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      provider: {
        ID: '',
        Name: '',
        Address: '',
        Phone: '',
        Service: '',
        Note: '',
      },
      selectedProviderID: null,
      searchQuery: '',
    };
  },
  computed: {
    ...mapState(['providers']),
    filteredProviders() {
      if (!this.searchQuery) {
        return this.providers;
      }
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      return this.providers.filter(provider => 
        provider.Name.toLowerCase().includes(lowerCaseQuery) || 
        provider.Address.toLowerCase().includes(lowerCaseQuery) ||
        provider.Service.toLowerCase().includes(lowerCaseQuery)
      );
    },
  },
  methods: {
    ...mapMutations([
      'ADD_PROVIDER',
      'UPDATE_PROVIDER',
      'DELETE_PROVIDER',
    ]),
    handleSubmitProvider() {
      if (this.selectedProviderID) {
        // Update existing provider
        this.UPDATE_PROVIDER(this.provider);
      } else {
        // Add new provider
        this.ADD_PROVIDER(this.provider);
      }
      this.resetProviderForm();
    },
    editProvider(id) {
      const provider = this.providers.find(pro => pro.ID === id);
      if (provider) {
        this.provider = { ...provider };
        this.selectedProviderID = id;
      }
    },
    deleteProvider(id) {
      this.DELETE_PROVIDER(id);
    },
    resetProviderForm() {
      this.provider = {
        ID: '',
        Name: '',
        Address: '',
        Phone: '',
        Service: '',
        Note: '',
      };
      this.selectedProviderID = null;
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
