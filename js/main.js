window.onload = function() {
	handleMarquee();
	callCellNav()
	cellNavDrop();
	menuCollapse();
	controlVideo();
	rollingAds();
}

// https://www.w3docs.com/snippets/css/how-to-have-the-marquee-effect-without-using
// -the-marquee-tag-with-css-javascript-and-jquery.html#example-of-creating-a-marquee-
// effect-with-javascript-20
function handleMarquee() {
	const marquee = document.querySelectorAll('.marquee');
	let speed = 1;
	let lastScrollPos = 0;
	let timer;
	marquee.forEach(function(el) {
		const container = el.querySelector('.inner');
		const content = el.querySelector('.inner > *');
		//Get total width
		const elWidth = content.offsetWidth;
		//Duplicate content
		let clone = content.cloneNode(true);
		container.appendChild(clone);
		let progress = 1;

		function loop() {
			progress = progress - speed;
			if (progress <= elWidth * -1) {
				progress = 0;
			}
			container.style.transform = 'translateX(' + progress + 'px)';
			container.style.transform += 'skewX(' + speed * 0.4 + 'deg)';
			window.requestAnimationFrame(loop);
		}
		loop();
	});
	window.addEventListener('scroll', function() {
		const maxScrollValue = 12;
		const newScrollPos = window.scrollY;
		let scrollValue = newScrollPos - lastScrollPos;
		if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
		else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;
		speed = scrollValue;
		clearTimeout(timer);
		timer = setTimeout(handleSpeedClear, 10);
	});

	function handleSpeedClear() {
		speed = 1;
	}
};

function controlVideo() {
	var video = document.getElementById("backVideo");
	var btn = document.getElementById("videoBtn");
	if (video.paused) {
		video.play();
		btn.innerHTML = "⏸";
	} else {
		video.pause();
		btn.innerHTML = "▸";
	}
}

// Ref - https://www.sliderrevolution.com/resources/css-slideshow/
function rollingAds() {
	const items = document.querySelectorAll('.item'),
		controls = document.querySelectorAll('.control'),
		activeDelay = .76,
		interval = 5000;

	let current = 0;

	const slider = {
		init: () => {
			controls.forEach(control => control.addEventListener('click', (e) => {
				slider.clickedControl(e)
			}));
			controls[current].classList.add('active');
			items[current].classList.add('active');
		},
		nextSlide: () => { // Increment current slide and add active class
			slider.reset();
			if (current === items.length - 1) current = -1; // Check if current slide is last in array
			current++;
			controls[current].classList.add('active');
			items[current].classList.add('active');
		},
		clickedControl: (e) => { // Add active class to clicked control and corresponding slide
			slider.reset();
			clearInterval(intervalF);

			const control = e.target,
				dataIndex = Number(control.dataset.index);

			control.classList.add('active');
			items.forEach((item, index) => {
				if (index === dataIndex) { // Add active class to corresponding slide
					item.classList.add('active');
				}
			})
			current = dataIndex; // Update current slide
			intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
		},
		reset: () => { // Remove active classes
			items.forEach(item => item.classList.remove('active'));
			controls.forEach(control => control.classList.remove('active'));
		},
		transitionDelay: (
			items
		) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
			let seconds;

			items.forEach(item => {
				const children = item.childNodes; // .vertical-part(s)
				let count = 1,
					delay;

				item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

				children.forEach(child => { // iterate through .vertical-part(s) and style b element
					if (child.classList) {
						item.parentNode.classList.contains('active') ? delay = count *
							seconds + activeDelay : delay = count * seconds;
						child.firstElementChild.style.transitionDelay =
							`${delay}s`; // b element
						count++;
					}
				})
			})
		},
	}

	let intervalF = setInterval(slider.nextSlide, interval);
	slider.init();
}

function callCellNav() {
	var cellicon = document.getElementById("cellnavicon");
	cellicon.addEventListener("click", function() {
		navwrapper = document.getElementById("cellnavwrapper");
		navwrapper.classList.remove("nodisplay");
		navwrapper.classList.add("blockdisplay");
	}, false);
}

function cellNavDrop() {
	var items = document.querySelectorAll(".cellnav-bg");
	for (var i = 0; i < items.length; i++) {
		if (items[i].children.length > 1) {
			var uri = items[i].children[0];
			uri.addEventListener("click", function() {
				dropControl(this, this.nextElementSibling);
			}, false);
		}
	}
}

function dropControl(uri, subdiv) {
	event.preventDefault();
	var uri_expanded = uri.getAttribute("aria-expanded");
	if (uri_expanded == "true") {
		uri.setAttribute("aria-expanded", false);
		uri.classList.remove("cellnav-subicon-collapse");
		uri.classList.add("cellnav-subicon");
		subdiv.classList.remove("blockdisplay");
		subdiv.classList.add("nodisplay");

	} else {
		uri.setAttribute("aria-expanded", true);
		uri.classList.remove("cellnav-subicon");
		uri.classList.add("cellnav-subicon-collapse");
		subdiv.classList.remove("nodisplay");
		subdiv.classList.add("blockdisplay");
	}
}

function menuCollapse() {
	var gohome = document.getElementById("menu-collapse");
	gohome.addEventListener("click", function() {
		navwrapper = document.getElementById("cellnavwrapper");
		navwrapper.classList.remove("blockdisplay");
		navwrapper.classList.add("nodisplay");
	}, false);
}
