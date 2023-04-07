// https://linuxhint.com/decode-html-entities-javascript/
/**
 * Decodes a string containing HTML symbols
 * @param {string} str the string containing HTML symbols that is to be decoded
 * @returns the decoded {str}
 */
function decode(str) {
	let encodedText = new DOMParser().parseFromString(str, 'text/html');
	return encodedText.documentElement.textContent;
}

// decodes all elements with api data that might contain HTML symbols
document.querySelectorAll('.api-data').forEach((element) => {
	element.innerHTML = decode(element.innerHTML);
});
