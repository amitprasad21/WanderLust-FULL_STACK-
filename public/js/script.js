// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// Auto-dismiss flash alerts after 4 seconds
(() => {
  const alerts = document.querySelectorAll('.alert.alert-dismissible');
  if (!alerts.length) return;
  setTimeout(() => {
    alerts.forEach((alertEl) => {
      if (window.bootstrap && bootstrap.Alert) {
        bootstrap.Alert.getOrCreateInstance(alertEl).close();
      } else {
        alertEl.remove();
      }
    });
  }, 4000);
})();
