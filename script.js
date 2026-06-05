const year = new Date().getFullYear();
const footerText = document.querySelector('footer p');
if (footerText) {
  footerText.textContent = `© ${year} Invocryp. Inteligência comercial baseada em sinais públicos.`;
}
