(function () {
    const userId = "OBQk6izltDGnxdaYF"; // Remplacez YOUR_USER_ID par votre ID EmailJS

    emailjs.init(userId);

    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Récupérez les valeurs des champs à l'intérieur de l'événement submit
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const subject = document.getElementById("subject").value;

      // Préparez les paramètres pour l'envoi d'e-mail
      const contactParams = {
        subject: subject,
        name: name,
        email: email,
        message: message,
      };

      // Désactivez le formulaire après soumission
      form.classList.add("disabled");

      // Envoyez l'e-mail avec EmailJS
      emailjs.send("service_czu0bxn", "template_ghiqs59", contactParams)
        .then(
          function () {
            alert("E-mail envoyé avec succès !");
          },
          function (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
          }
        )
        .finally(() => {
          form.classList.remove("disabled");
        });
    });
  })();