async function handleFormspreeSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const data = new FormData(event.target);

  const submitBtn = form.querySelector('button[type="submit"]');
  let originalBtnText = "";
  if (submitBtn) {
    originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
  }

  const formInputs = form.querySelectorAll('input, textarea');
  if (formInputs) {
    formInputs.forEach(input => input.disabled = true);
  }

  const restoreFormState = () => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
    if (formInputs) {
      formInputs.forEach(input => input.disabled = false);
    }
  };

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        contactAlert("success", "Thanks for your submission!");
        form.reset();
      } else {
        response.json().then((data) => {
          const errMessage = data.errors;
          for (let i = 0; i < errMessage.length; i++) {
            contactAlert("danger", errMessage[i].message);
          }
        });
      }
    })
    .catch((error) => {
      contactAlert("danger", "Oops! There was a problem submitting your form");
    })
    .finally(() => {
      restoreFormState();
    });
}

function contactAlert(type, message) {
  var contactFormStatus = document.getElementById("contact-form-status");
  var icon = type === "success" ? "check-circle-fill" : "exclamation-triangle-fill";
  var ariaLabel = type === "success" ? "Success:" : "Error:";
  var alert = `<div class="alert alert-${type} d-flex align-items-center" role="alert">
                     <svg class="bi flex-shrink-0 me-2" role="img" aria-label="${ariaLabel}">
                        <use xlink:href="#${icon}" />
                    </svg>
                    <div>${message}</div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close alert"></button>
                </div>`;
  contactFormStatus.innerHTML = alert;

  // Remove alert after 3 seconds
  setTimeout(function () {
    contactFormStatus.innerHTML = "";
  }, 3000);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleFormspreeSubmit, contactAlert };
}
