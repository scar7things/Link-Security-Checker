
'use strict';

function checkLinkSecurity(link) {
  // Check HTTP protocol
  const isHTTP = link.startsWith('http://') || link.startsWith('https://');

  // Check for SSL (HTTPS)
  const isSSL = link.startsWith('https://');

  // Placeholder for content safety checking
  const isContentSafe = true; // Replace with your actual content safety checking logic

  return {
    isHTTP,
    isSSL,
    isContentSafe
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const url = link.href;
      const securityInfo = checkLinkSecurity(url);
      handleLinkClick(securityInfo);
    });
  });
});

function handleLinkClick(securityInfo) {
  if (!securityInfo.isHTTP) {
    alert('This link is not using a valid HTTP protocol.');
  } else if (!securityInfo.isSSL) {
    alert('This link is not using SSL (HTTPS). It may not be secure.');
  } else if (!securityInfo.isContentSafe) {
    alert('This link leads to potentially unsafe content.');
  } else {
    alert('This link is secure and safe to click.');
  }
}
