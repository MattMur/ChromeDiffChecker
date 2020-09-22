
const reloadTime = 7000;
const nvidia = "https://www.nvidia.com/en-us/shop/geforce/gpu/?page=1&limit=9&locale=en-us&category=GPU&gpu=RTX%203080";
const xbox = "https://www.bestbuy.com/site/microsoft-xbox-series-s-512-gb-all-digital-console-disc-free-gaming-white/6430277.p?skuId=6430277";

chrome.extension.sendMessage({}, function(response) {
	$(() => {
		console.log('doc ready');
		setTimeout(() => {
			if (document.location.href == nvidia) {
				findNvidiaElement();
			} else if (document.location.href == xbox) {
				findXboxElement();
			}
		}, 1000);
	});
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('Hello world!')
    }
);

function findNvidiaElement() {
	let x = $('.featured-buy-link');
	if (x.length > 0) { 
		let text = x[0].innerText;
		console.log(text);
		if (text === "OUT OF STOCK") {
			//console.log("nothing to see here");
			window.stop();
			setInterval(() => {
				document.location.reload();
			}, reloadTime);
		} else {
			//console.log("text changed");
			notify('nvidia');
		}
	} else {
		//console.log("couldn't find element");
		notify('nvidia');
	}
	
}

function findXboxElement() {
	let x = $('button.add-to-cart-button');
	if (x.length > 0) { 
		let text = x[0].innerText;
		console.log(text);
		if (text === "Coming Soon") {
			//console.log("nothing to see here");
			window.stop();
			setInterval(() => {
				document.location.reload();
			}, reloadTime);
		} else {
			console.log("text changed");
			notify('xbox');
		}
	} else {
		console.log("couldn't find element");
		notify('xbox');
	}
	
}

function notify(product) {
	const Http = new XMLHttpRequest();
	const url='https://localhost:3001/'+product;
	Http.open("GET", url);
	Http.send();
}