import * as dom from 'client/dom/DOM';
import selector from 'client/dom/selector';
import fetcher from 'client/net/fetcher';
import {
    addClass
} from 'client/dom/CSS';
import * as events from 'client/dom/events';
import * as ajax from 'client/net/ajax';
import * as xml from 'client/browser/xml';
import * as perf from 'client/browser/performance';

import {
    exists
} from 'utils/typeCheck';

let fishInfoWorker;

const message = `&nbsp;&nbsp;&nbsp;I have kept tropical fish as pets for years.
Here are some of my experiences keeping various types of fish. If you are looking for pictures go here.
I am only documenting the fish that have mated in my tanks.
This page does not go in depth on any species and just touches the surface.`;

const fishTabs = `<select class="tab_data" id="fish_tabs"></select><div id="fishdataContentArea" class="fishdata"></div>`;

let jsonData = {};

function onFishTabsChanged() {
    const spanTags = selector("#fishdataContentArea span.selection-tied"),
        selectOption = selector("#fish_tabs").get(0);

    let optionsindex, sloc, optn, selectedSpan;

    for (let i = 0, end = spanTags.length; i < end; i++) {
        spanTags.get(i).style.display = 'none';
    }

    optionsindex = selectOption.selectedIndex;
    optn = selectOption[optionsindex];
    sloc = optn.value;

    selectedSpan = selector('#' + sloc).get(0);
    selectedSpan.style.display = 'block';
}

function processJSON() {
    const parent = selector("#fish_tabs").get(0),
        container = selector('#fishdataContentArea').get(0);

    parent.innerHTML = '';
    let fish = jsonData['tropical_fish']['fish_data'];
    for (let i = 0, len = fish.length; i < len; i += 1) {
        const name = fish[i]['name']['#text'];
        const data = fish[i]['comment']['#text'];
        const option = dom.createElement('option', parent);
        option.value = name.toLowerCase().replace(/\ /g, '-');
        option.text = name;
        const span = dom.createElement('span', container, {
            "id": name.toLowerCase().replace(/\ /g, '-'),
            'innerHTML': data
        });
        addClass(span, 'selection-tied');
        if (i > 0) {
            span.style.display = 'none';
        }
    }
    events.addEvent(parent, 'change', onFishTabsChanged);
}

function getXMLDocument() {
    if (this.xmlhttp.readyState === 4) {
        const xmlDOC = xml.getAsXMLDocument(this.xmlhttp.responseText);
        jsonData = xml.xml2json(xmlDOC);
        processJSON();
        if (perf.hasPerformanceMetrics) {
            performance.measure('fish content render');
        }
    }
}

function setupFishInfo() {
    fishInfoWorker = exists(Worker) ? new Worker('/js/animatedFish.js') : undefined;
}

function startFishInfo() {

    if (!fishInfoWorker) {
        setupFishInfo();
    }

    if (fishInfoWorker) {
        const homeContent = selector('#welcome-content').get(0);
        const displayWindow = selector('.WebWindowArea', homeContent).get(0);

        Array.from(displayWindow.childNodes).forEach(item => {
            if (item.nodeName.toLowerCase() === 'div') {
                item.style.display = 'none';
            }
        });

        const animFishContainer = dom.createElement('div', displayWindow, {
            id: 'animated-fish'
        });
        animFishContainer.style.display = 'block';

        fetcher('frags/fish-svg.frag')
            .then(data => {

                animFishContainer.innerHTML = `${message}<br>${data}`;
                const parts = selector('ellipse', animFishContainer);

                const mouth = parts[0].attributes.ry,
                    omouth = parts[1].attributes.ry;

                fishInfoWorker.onmessage = (msg) => {
                    if (msg && msg.data) {
                        requestAnimationFrame(() => {
                            mouth.value = msg.data.mouth;
                            omouth.value = msg.data.omouth;
                        });
                    }
                };
                fishInfoWorker.postMessage({
                    'start': 'start'
                });

                if (perf.hasPerformanceMetrics) {
                    performance.measure('animated fish render');
                }
            });

        const mainWindow = document.getElementById('main-window');
        const title = selector('.WebWindowTitle span', mainWindow).get(0);

        const winArea = selector('.WebWindowArea', mainWindow).get(0);
        const fishInfoSection = dom.createElement('div', winArea, {
            id: 'fins-info-section'
        });
        fishInfoSection.style.display = 'block';
        addClass(fishInfoSection, 'left-align');
        fishInfoSection.innerHTML = fishTabs;

        ajax.get(getXMLDocument, '/data/tropical_fish.xml');
    }
}

function stopFishInfo() {
    if (fishInfoWorker) {
        fishInfoWorker.postMessage({
            'stop': 'stop'
        });
    }
}

export {
    startFishInfo,
    stopFishInfo
};