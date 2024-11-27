import { ref } from 'vue';
import axios from 'axios';
import { useImageFix } from './useImageFix';

export function useMenu() {
  // Reactive states
  const menu = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  // API endpoint and API key
  const apiUrl = "https://6ldruff9ul.execute-api.eu-north-1.amazonaws.com/menu";
  const apiKey = "sp-B2mWxADrthdHqd22"; // Replace with your actual API key
  // Fetch menu function
  const fetchMenu = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "x-zocom": apiKey, // Custom API key header
          "accept": "application/json",
        },
      });
      // Set menu data, extracting 'items' array
      menu.value = response.data.items;
      menu.value = useImageFix(menu.value);
      // Optionally log the fetched menu
      console.log("Fetched Menu:", menu.value);
    } catch (err) {
      // Handle errors
      if (err.response) {
        error.value = err.response.data?.message || 'An error occurred while fetching the menu.';
        console.error("Error response:", err.response);
      } else if (err.request) {
        error.value = "No response received from server.";
        console.error("No response received:", err.request);
      } else {
        error.value = err.message || "An unknown error occurred.";
        console.error("Request error:", err.message);
      }
    } finally {
      isLoading.value = false;
    }
  };
  // Return reactive variables and function
  return {
    menu,
    isLoading,
    error,
    fetchMenu,
  };
}

