const dropdown = document.getElementById('dice');
const result = document.getElementById('here');
const tracker = document.getElementById('tracker'); // tracker div
let rolledNumbers = ""; // string to store concatenated numbers

dropdown.addEventListener('change', function () {
  const selectedValue = this.value;
  const max = parseInt(selectedValue.substring(1)); // e.g. "d20" → 20

  // roll number
  const rolled = Math.floor(Math.random() * max) + 1;

  // wrapper
  const scene = document.createElement("div");
  scene.classList.add("scene");

  // cube
  const cube = document.createElement("div");
  cube.classList.add("cube");

  // initially faces are empty
  cube.innerHTML = `
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face right"></div>
    <div class="face left"></div>
    <div class="face top"></div>
    <div class="face bottom"></div>
  `;

  scene.appendChild(cube);
  result.appendChild(scene);

  // remove cube on click
  scene.addEventListener("click", () => {
    scene.remove();
  });

  // reset first
  cube.style.transform = `rotateX(0deg) rotateY(0deg)`;

  // start spin
  setTimeout(() => {
    const spinX = 720 + (Math.floor(Math.random() * 4) * 90);
    const spinY = 720 + (Math.floor(Math.random() * 4) * 90);

    cube.style.transition = "transform 1s ease-out";
    cube.style.transform = `rotateX(${spinX}deg) rotateY(${spinY}deg)`;

    // after animation ends → snap to front view & show result
    setTimeout(() => {
      cube.style.transition = "none"; // reset transition
      cube.style.transform = `rotateX(0deg) rotateY(0deg)`; // ensure front face

      // place rolled number only on front
      cube.querySelector(".front").textContent = rolled;
      cube.querySelector(".back").textContent = "";
      cube.querySelector(".left").textContent = "";
      cube.querySelector(".right").textContent = "";
      cube.querySelector(".top").textContent = "";
      cube.querySelector(".bottom").textContent = "";

      // update tracker
      rolledNumbers += rolled; // append the number as string
      tracker.textContent = rolledNumbers;
    }, 1000); // match animation time
  }, 50);

  this.value = "";
});
