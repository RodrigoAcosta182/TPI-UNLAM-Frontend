export function displayAyuda(display) {
  var botmaker = document.getElementsByName("Botmaker");
  if (botmaker.length > 0) {
    botmaker[0].style.visibility = display;
  }
}

export function displayAyudaMobile(display) {
  var botmaker = document.querySelectorAll(
    "a[href='https://wa.me/5491166485555?text=']"
  );
  var botmakerMobile = document.querySelectorAll("div > a > img");

  if (botmakerMobile.length > 0) {
    botmakerMobile[0].style.bottom = "80px"
    botmakerMobile[0].style.width = "70px"
    // botmakerMobile[0].style.zIndex = "-1"
  }

  if (botmaker.length > 0) {
    botmaker[0].style.visibility = display;
  }
}
