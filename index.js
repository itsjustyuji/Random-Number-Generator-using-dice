const dropdown = document.getElementById('dice');
const result = document.getElementById('here');
const tracker = document.getElementById('tracker'); // tracker div
let rolledNumbers = []; // store rolled numbers as an array instead of string

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

      // store number + reference
      rolledNumbers.push({ value: rolled, cube: scene });

      updateTracker();

      // remove cube on click
      scene.addEventListener("click", () => {
        rolledNumbers = rolledNumbers.filter(entry => entry.cube !== scene);
        scene.remove();
        updateTracker();
      });

      // highlight tracker on hover
      scene.addEventListener("mouseenter", () => {
        const span = tracker.querySelector(`[data-cube-id="${scene.dataset.id}"]`);
        if (span) span.classList.add("highlight");
      });

      scene.addEventListener("mouseleave", () => {
        const span = tracker.querySelector(`[data-cube-id="${scene.dataset.id}"]`);
        if (span) span.classList.remove("highlight");
      });

    }, 1000); // match animation time
  }, 50);

  // assign unique id for linking cube ↔ tracker
  scene.dataset.id = Date.now() + Math.random();

  this.value = "";
});

// function to update tracker display
function updateTracker() {
  tracker.innerHTML = "";
  rolledNumbers.forEach(entry => {
    const span = document.createElement("span");
    span.textContent = entry.value;
    span.dataset.cubeId = entry.cube.dataset.id;
    tracker.appendChild(span);
  });
}
