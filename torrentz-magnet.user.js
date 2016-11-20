// ==UserScript==
// @name		Torrentz magnet
// @namespace		memmie.lenglet.name
// @author		mems <memmie@lenglet.name>
// @homepageURL 	https://github.com/mems/torrentz-magnet
// @description		Add magnet link to torrentz download page.
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
// @match		*://*.torrentzeu.to/*
// @updateURL   	https://openuserjs.org/install/mems/Torrentz_magnet.user.js
// @version		1.1.3
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
	let magnetIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAZUlEQVQokc2RQQrAMAgE9+g/99/5yvaSWDUV0lMrDATMiIsAoIZVbV9jjEQVu/4HohZmAiCSLs63ZOa0Ivb6nThv9D5jkCNRcpHkJqqsXyGpe5VDMUVZ8uOAnCvl9yKpOCR+rsIFGyA1+Hqs6JoAAAAASUVORK5CYII=";// from https://commons.wikimedia.org/wiki/File:Magnet-icon.gif
	list.querySelector("dl:first-of-type").insertAdjacentHTML("beforebegin", `
		<dl>
			<dt><a href="${uri}"><span class="${/(^|\.)torrentz2.eu$/.test(location.hostname) ? `j z" style="background: url('${magnetIcon}') bottom center no-repeat"></span><span class="u"` : `u" style="background: transparent url('${magnetIcon}') no-repeat 5px center; color: red;"`}>Magnet</span> <span class="n">${name}</span></a></dt>
			<dd>Magnet</dd>
		</dl>
	`);
}
