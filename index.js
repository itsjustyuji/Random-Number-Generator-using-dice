const dropdown = document.getElementById('dice');
const result = document.getElementById('here');

dropdown.addEventListener('change', function () {
  const selectedValue = this.value;

  // extract number from "d6", "d20", etc.
  const max = parseInt(selectedValue.substring(1));

  // generate random number between 1 and max
  const randomNum = Math.floor(Math.random() * max) + 1;

  // clear previous result
  result.innerHTML += `
      <h1>${randomNum}</h1>
  `;
});
