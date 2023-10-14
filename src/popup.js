'use strict';

import './popup.css';

const counterStorage = {
  get: cb => {
    chrome.storage.sync.get(['count'], result => {
      cb(result.count);
    });
  },
  set: (value, cb) => {
    chrome.storage.sync.set({ count: value }, () => {
      cb();
    });
  },
};

function setupCounter(initialValue = 0) {
  document.getElementById('counter').innerHTML = initialValue;

  document.getElementById('incrementBtn').addEventListener('click', () => {
    updateCounter({ type: 'INCREMENT' });
  });

  document.getElementById('decrementBtn').addEventListener('click', () => {
    updateCounter({ type: 'DECREMENT' });
  });
}

function updateCounter({ type }) {
  counterStorage.get(count => {
    let newCount;

    if (type === 'INCREMENT') {
      newCount = count + 1;
    } else if (type === 'DECREMENT') {
      newCount = count - 1;
    } else {
      newCount = count;
    }

    counterStorage.set(newCount, () => {
      document.getElementById('counter').innerHTML = newCount;

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];

        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'COUNT',
            payload: {
              count: newCount,
            },
          },
          response => {
            console.log('Current count value passed to contentScript file');
          }
        );
      });
    });
  });
}

function restoreCounter() {
  counterStorage.get(count => {
    if (typeof count === 'undefined') {
      counterStorage.set(0, () => {
        setupCounter(0);
      });
    } else {
      setupCounter(count);
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreCounter);

chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Now We Are Safe.',
    },
  },
  response => {
    console.log(response.message);
  }
);
