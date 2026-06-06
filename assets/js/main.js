const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });
}

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav) {
      mainNav.classList.remove("active");
    }
  });
});

const contactForm = document.querySelector("#contactForm");
const formResponse = document.querySelector("#formResponse");

if (contactForm && formResponse) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".form-submit");
    const originalButtonText = submitButton.textContent.trim();

    submitButton.disabled = true;
    submitButton.textContent = "A enviar...";
    formResponse.textContent = "";
    formResponse.className = "form-response";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        formResponse.textContent =
          "Pedido enviado com sucesso. A Invocryp Radar irá responder em 24–48h úteis.";
        formResponse.classList.add("success");
        contactForm.reset();
      } else {
        formResponse.textContent =
          "Não foi possível enviar o pedido. Confirme os dados e tente novamente.";
        formResponse.classList.add("error");
      }
    } catch (error) {
      formResponse.textContent =
        "Erro de ligação. Tente novamente ou envie email para contacto@invocryp.com.";
      formResponse.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}