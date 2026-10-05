// CTA helpers: "didn't open?" notice after a CTA click, and copy-email buttons.
// The page works without this file; the mailto links and visible address are the baseline.
(function () {
  var EMAIL = 'oogunse2612@gmail.com';
  var notice = document.getElementById('cta-notice');

  // Copy buttons are hidden without JavaScript, since they can't work without it.
  document.querySelectorAll('.copy-btn').forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', function () {
      copyEmail(button);
    });
  });

  function copyEmail(button) {
    var status = button.parentNode.querySelector('.copy-status');
    var address = button.parentNode.querySelector('.email') ||
      button.closest('.cta-notice').querySelector('.email');

    function show(message) {
      status.textContent = message;
      clearTimeout(status._timer);
      status._timer = setTimeout(function () { status.textContent = ''; }, 4000);
    }

    function fallback() {
      // Clipboard blocked: select the address so the visitor can copy it manually.
      var range = document.createRange();
      range.selectNodeContents(address);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      show('Press Ctrl/Cmd + C to copy');
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(EMAIL).then(function () { show('Copied ✓'); }, fallback);
    } else {
      fallback();
    }
  }

  // After any CTA click, confirm what should happen and offer a fallback.
  document.querySelectorAll('.js-cta').forEach(function (link) {
    link.addEventListener('click', function () {
      notice.hidden = false;
    });
  });

  notice.querySelector('.cta-notice__close').addEventListener('click', function () {
    notice.hidden = true;
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') notice.hidden = true;
  });
})();
