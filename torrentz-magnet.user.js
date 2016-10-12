// ==UserScript==
// @name		Torrentz magnet
// @namespace	memmie.lenglet.name
// @author		mems <memmie@lenglet.name>
// @homepageURL https://github.com/mems/torrentz-magnet
// @description	Add magnet link to torrentz download page.
// @match		*://*.torrentz2.eu/*
// @match		*://*.torrentz.com/*
// @match		*://*.torrentz.eu/*
// @match		*://*.torrentz.ch/*
// @match		*://*.torrentz.ph/*
// @match		*://*.torrentz.me/*
// @match		*://*.torrentz.in/*
// @match		*://*.torrentz.hk/*
// @match		*://*.torrentz.de/*
// @match		*://*.tz.ai/*
// @match		*://*.torrentz-proxy.com/*
// @match		*://*.torrentsmirror.com/*
// @updateURL   https://openuserjs.org/install/mems/Torrentz_magnet.user.js
// @version		1.1.1
// @grant		none
// ==/UserScript==

var list = document.querySelector(".download");
var defaultTrackers = [
	"http://pow7.com:80/announce",
	"udp://tracker.openbittorrent.com/announce",
	"udp://tracker.internetwarriors.net:1337/announce",
	"udp://tracker.sktorrent.net:6969/announce",
	"udp://tracker.opentrackr.org:1337/announce",
	"udp://tracker.coppersurfer.tk:6969/announce",
	"udp://tracker.leechers-paradise.org:6969/announce",
	"udp://zer0day.ch:1337/announce",
	"udp://explodie.org:6969/announce"
];
if(list){
	let name = list.querySelector("h2 span").textContent.trim();
	let hash = document.querySelector(".trackers > div, .trackers h2").textContent.trim().split(/:\s+|hash\s+/, 2)[1];
	let trackers = Array.from(document.querySelectorAll(".trackers dl a")).map(node => node.textContent.trim()).concat(defaultTrackers);
	let trackersCmps = trackers.reduce((result, uri) => result + "&tr=" + encodeURIComponent(uri), "");
	let uri = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(name)}${trackersCmps}`;
	list.querySelector("dl:first-of-type").insertAdjacentHTML("beforebegin", `
		<dl>
			<dt><a href="${uri}"><span class="u" style="background: transparent url('/img/magnet.gif') no-repeat 5px center; color: red;">Magnet</span> <span class="n">${name}</span></a></dt>
			<dd>Magnet</dd>
		</dl>
	`);
}
