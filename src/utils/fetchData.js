import { BASE_URL } from "./constants";

/**
 * Fetches tab data from the specified API endpoint and formats it into an object structure.
 * 
 * @param {number} tabId - The ID of the tab to fetch data for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the tab data,
 *                              formatted with `id`, `tabTitle`, `title`, and `content` properties.
 * @throws {Error} - Throws a descriptive error if the fetch operation fails.
 * 
 * @example
 * fetchTabData(1)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error.message));
 * 
 * Return data structure:
 * {
 *   id: 1,
 *   tabTitle: 'Tab 1',
 *   title: 'Title 1',
 *   content: 'Fetched content...'
 * }
 */
export const fetchTabData = async (tabId) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${BASE_URL}/?type=all-meat&paras=${tabId}&format=text`, {
            signal: controller.signal,
            cache: "force-cache"
        });
        clearTimeout(timeoutId);

        if (!response?.ok) {
            const errorMessage = `Server error: ${response?.status} ${response?.statusText}`;
            throw new Error(errorMessage);
        }

        const content = await response.text();

        return {
            id: tabId,
            tabTitle: `Tab ${tabId}`,
            title: `Title ${tabId}`,
            content: content,
        };
    } catch (err) {
        if (err?.name === 'AbortError') {
            throw new Error("The request took too long and was aborted. Please try again.");
        }  else if (!navigator.onLine) {
            throw new Error("Network error: Please check your internet connection and try again.");
        } else if (err?.message?.includes('Failed to fetch')) {
            throw new Error("CORS error: The server’s policy does not allow this request.");
        } else {
            throw new Error(`An error occurred: ${err?.message}`);
        }
    }
};
