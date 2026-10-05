let cities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Shubra El-Kheima",
  "Port Said",
  "Suez",
  "Luxor",
  "Mansoura",
  "Tanta",
  "Asyut",
];

for (let city of cities) {
  const content = `          <option value="${city}">${city}</option>
`;
  document.getElementById("select").innerHTML += content;
}

document.getElementById("select").addEventListener("change", function () {
  getprayerstimingsofcity(this.value);
  document.getElementById("cityname").innerHTML = this.value;
});

function getprayerstimingsofcity(cityname) {
  let param = { country: "Egypt", city: cityname };

  axios
    .get("https://api.aladhan.com/v1/timingsByCity", { params: param })

    .then((response) => {
      const content = response.data.data.timings;
      filldata("dhuhrtime", content.Dhuhr);
      filldata("fajrtime", content.Fajr);
      filldata("sunraisingtime", content.Sunrise);
      filldata("asr", content.Asr);
      filldata("maghribtime", content.Maghrib);
      filldata("ishrtime", content.Isha);

      let weeakday = response.data.data.date.hijri.weekday.ar;
      let readabledate = response.data.data.date.readable;
      document.getElementById("datename").innerHTML =
        weeakday + " " + readabledate;
    });
}

function filldata(id, content) {
  document.getElementById(id).innerHTML = content;
}
