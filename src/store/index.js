import { createStore } from 'vuex';

const store = createStore({
  state: {
    invoices: [], // This will store all invoices
    providers: [],
    invoiceLines: []
  },
  mutations: {
    // Add a new invoice
    ADD_INVOICE(state, invoice) {
      state.invoices.push(invoice);
    },
    UPDATE_INVOICE(state, updatedInvoice) {
      const index = state.invoices.findIndex(invoice => invoice.ID === updatedInvoice.ID);
      if (index !== -1) {
        state.invoices.splice(index, 1, updatedInvoice);
      }
    },
    DELETE_INVOICE(state, invoiceID) {
      state.invoices = state.invoices.filter(invoice => invoice.ID !== invoiceID);
    },
    
    ADD_PROVIDER(state, provider) {
      state.providers.push(provider);
    },
  UPDATE_PROVIDER(state, updatedProvider) {
      const index = state.providers.findIndex(p => p.id === updatedProvider.id);
      if (index !== -1) {
        state.providers[index] = updatedProvider;
      }
    },
    DELETE_PROVIDER(state, providerID) {
      state.providers = state.providers.filter(provider => provider.ID !== providerID);
    },
    ADD_INVOICE_LINE(state, invoiceLine) {
      invoiceLine.id = Date.now(); // or any unique ID generation method
      state.invoiceLines.push(invoiceLine);
    },
    UPDATE_INVOICE_LINE(state, updatedLine) {
      const index = state.invoiceLines.findIndex(line => line.id === updatedLine.id);
      if (index !== -1) {
        state.invoiceLines.splice(index, 1, updatedLine);
      }
    },
    DELETE_INVOICE_LINE(state, id) {
      state.invoiceLines = state.invoiceLines.filter(line => line.id !== id);
    }

    
  },
  actions: {
    // Here you would define actions if you need to perform asynchronous operations
    // e.g., fetching data from an API, etc.
  }
});

export default store;
