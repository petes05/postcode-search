<script setup lang="ts">
import Postcode from '@/models/Postcode'
import type PostcodeLocationData from '@/types/PostcodeLocationData';
import type PostcodeLookupService from '@/types/PostcodeLookupService';
import { ref, inject } from 'vue'

const postcodeLookupService = inject<PostcodeLookupService>('postcodeLookupService');
const postcodeEntry = ref("");
const lookupResult = ref<PostcodeLocationData>();

/**
 * Search for a postcode using a user entered string.
 */
async function searchForPostcode(): Promise<void> {
  if (postcodeEntry.value) {
    const postcode = Postcode.createPostcodeObject(postcodeEntry.value);

    if (postcode) {
      const postcodeLocationData = await lookupPostcodeLocationData(postcode);
      handlePostcodeLocationData(postcodeLocationData);
    }
    else {
      alert("Invalid postcode");
    }
  }
}

/**
 * Look up location data for a validated postcode.
 * @param postcode Validated postcode object.
 */
async function lookupPostcodeLocationData(postcode: Postcode): Promise<PostcodeLocationData|null> {
  if (!postcodeLookupService) {
    // Service has not been injected!
    throw new Error();
  }

  return await postcodeLookupService.getPostcodeLocationData(postcode);
}

/**
 * Handle new postcode location data.
 * @param locationData Location data for a postcode or null.
 */
function handlePostcodeLocationData(locationData: PostcodeLocationData|null): void {
  lookupResult.value = locationData ?? undefined;

  if (!locationData) {
    alert("Postcode not found");
  }
}
</script>

<template>
  <div class="search-form">
    <h1 class="green">Postcode Search</h1>
    <input v-model="postcodeEntry" placeholder="Postcode"  autocomplete="off"/>
    <button v-on:click="searchForPostcode">Search</button>
  </div>
  <div v-if="lookupResult">
    <table>
      <tr>
        <th>Postcode</th>
        <td>{{ lookupResult.postcode }}</td>
      </tr>
      <tr>
        <th>Parliamentary Constituency</th>
        <td>{{ lookupResult.parliamentaryConstituency }}</td>
      </tr>
      <tr>
        <th>District</th>
        <td>{{ lookupResult.district }}</td>
      </tr>
      <tr>
        <th>Ward</th>
        <td>{{ lookupResult.ward }}</td>
      </tr>
    </table>
    Source: <a target="_blank" :href="lookupResult.source.href">{{ lookupResult.source.toString() }}</a>
  </div>
</template>

<style scoped>
  .search-form {
    width: 100%;
    
    text-align: center;
  }

  table {
    margin-top: 50px;
    width: 100%;
    border-collapse: collapse;
  }

  table, th, td {
    border:1px solid black;
  }

  th, td {
    padding: 10px;
  }

  th {
    text-align: left;
    font-weight: bold;
  }
</style>
