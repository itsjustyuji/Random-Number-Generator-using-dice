const dropdown = document.getElementById("dice");
const result = document.getElementById("here");
const tracker = document.getElementById("tracker");

let rolledNumbers = []; // store rolled numbers + cube references

dropdown.addEventListener("change", function () {
  const selectedValue = this.value;
  if (!selectedValue) return;

  const max = parseInt(selectedValue.substring(1)); // e.g. "d20" → 20
  const rolled = Math.floor(Math.random() * max) + 1;

  // create wrapper
  const scene = document.createElement("div");
  scene.classList.add("scene");

  // cube
  const cube = document.createElement("div");
  cube.classList.add("cube");
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

  // spin
  setTimeout(() => {
    const spinX = 720 + Math.floor(Math.random() * 4) * 90;
    const spinY = 720 + Math.floor(Math.random() * 4) * 90;

    cube.style.transition = "transform 1s ease-out";
    cube.style.transform = `rotateX(${spinX}deg) rotateY(${spinY}deg)`;

    // after animation ends
    setTimeout(() => {
      cube.style.transition = "none";
      cube.style.transform = `rotateX(0deg) rotateY(0deg)`;

      // show rolled number on front face
      cube.querySelector(".front").textContent = rolled;

      // assign unique id for linking cube ↔ tracker
      scene.dataset.id = Date.now() + Math.random();

      // save entry
      rolledNumbers.push({ value: rolled, cube: scene, id: scene.dataset.id });

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
    }, 1000); // match animation
  }, 50);

  // reset dropdown to placeholder
  this.value = "";
});

function updateTracker() {
  if (rolledNumbers.length === 0) {
    tracker.innerHTML = ""; // clear when no rolls
    return;
  }

  tracker.innerHTML = rolledNumbers
    .map(entry => {
      return `<span data-cube-id="${entry.id}">${entry.value}</span>`;
    })
    .join("");
}
