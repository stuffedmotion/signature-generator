const formEl = document.getElementById("form");
const signatureEl = document.getElementById("signature");
const directoryPath = window.location.href.substring(
	0,
	window.location.href.lastIndexOf("/") + 1
);

// Debounce helper
const debounce = (func, wait) => {
	let timeout;

	return function executedFunction(...args) {
		const later = () => {
			timeout = null;
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

// Generate absolute image URL
const imageURL = (imageName) => {
	return `${directoryPath}images/team/${imageName}.png`;
};

// Render signature using Mustache and form data
const render = debounce((html) => {
	// Get form data as objecy
	const formData = Object.fromEntries(new FormData(formEl));

	// Parse phone number and set proper `tel` url for mobile
	const number = libphonenumber.parsePhoneNumberFromString(
		formData["Phone"],
		"US"
	);
	if (number) formData["PhoneURL"] = number.number;

	// Compute image filename and path from person name
	const imageName = formData["Name"].toLowerCase().replace(" ", "-");

	// Use logo if user image doesn't exist
	fetch(imageURL(imageName)).then((response) => {
		formData["Image"] = response.ok
			? imageURL(imageName)
			: imageURL("logo");
		// Render template with Mustache
		signatureEl.innerHTML = Mustache.render(html, formData);
	});
}, 250);

// Fetch template and setup listener
fetch("compiled.html")
	.then((response) => response.text())
	.then((html) => {
		$("#form").on("input", function () {
			render(html);
		});

		// Initial render
		render(html);
	});

// Copy signature HTML data to clipboard
function copyToClip() {
	const str = signatureEl.innerHTML;

	function listener(e) {
		e.clipboardData.setData("text/html", str);
		e.clipboardData.setData("text/plain", str);
		e.preventDefault();
	}

	document.addEventListener("copy", listener);
	document.execCommand("copy");
	document.removeEventListener("copy", listener);
}
