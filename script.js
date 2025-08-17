const allPrompts  = [
  {
    text: "You wake up as the Prime Minister. First decision?",
    fight: "Decided to take charge. What bold order will you announce?",
    flight: "Decided to resign immediately. How will you step down?"
  },
  {
    text: "₹10 crore to never speak again. Accept or reject?",
    fight: "Decided to accept. How will you live without speaking?",
    flight: "Decided to reject. What will you say to justify it?"
  },
  {
    text: "Fire your best friend from a job. What do you do?",
    fight: "Decided to fire them. Innocent - How will you do it with empathy?",
    flight: "Decided to quit your job. Bad person - How will you explain your decision?"
  },
  {
    text: "Trapped on an Island with one person. Who?",
    fight: "Decided to choose Family member. Who and why?",
    flight: "Decided to choose randomly. How will you survive together?"
  },
  {
    text: "You must give a speech in front of 10,000 people.",
    fight: "Decided to speak. What topic will you choose?",
    flight: "Decided to escape. How will you avoid the public?"
  },
  {
    text: "An elderly stranger is being mocked in public.",
    fight: "You step in to defend them. What do you do?",
    flight: "You walk away. What thoughts haunt you afterward?"
  },
    {
    text: "You see a beggar asking for money on the street",
    fight: "You choose to help. He appears healthy and capable. What do you do?",
    flight: "You don't help. What assumptions or doubts shape your choice?"
  },
    {
    text: "You see a beggar asking for money on the street",
    fight: "You choose to help. He appears healthy and capable. What do you do?",
    flight: "You don't help. What assumptions or doubts shape your choice?"
  }
];

let currentPrompt = null;
let timerInterval;
let timeLeft = 10;

const speakers = ["TM Esakki", "DTM Marutesh", "TM Jana", "TM Vishaal", "TM Bala", "TM Rohini", "TM Dharma", "TM Pattu", "TM Pratheesha", "TM Sundar"];
let remainingSpeakers = [...speakers];
let remainingPrompts = [...allPrompts];

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;

function drawWheel(names, rotation = 0) {
  const sliceAngle = (2 * Math.PI) / names.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  names.forEach((name, i) => {
    const angle = i * sliceAngle + rotation;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, angle, angle + sliceAngle);
    ctx.fillStyle = i % 2 === 0 ? "#ff007f" : "#00cc66";
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "16px Segoe UI";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + sliceAngle / 2);
    ctx.fillText(name, radius / 1.5, 0);
    ctx.restore();
  });
}

drawWheel(remainingSpeakers);

function spin() {
  if (remainingSpeakers.length === 0) {
    document.getElementById("speaker").innerText = "✅ All speakers selected!";
    return;
  }

  let rotation = 0;
  let speed = Math.random() * 0.3 + 0.3; // Initial speed
  const deceleration = 0.005;
  const targetIndex = Math.floor(Math.random() * remainingSpeakers.length);
  const selectedName = remainingSpeakers[targetIndex];

  const spinInterval = setInterval(() => {
    rotation += speed;
    speed -= deceleration;

    drawWheel(remainingSpeakers, rotation);

    if (speed <= 0) {
      clearInterval(spinInterval);
      document.getElementById("speaker").innerText = `🎯 Speaker: ${selectedName}`;
      remainingSpeakers.splice(targetIndex, 1); // Remove selected name
    }
  }, 30);

  resetAll();
}

function generatePrompt() {
    if (remainingPrompts.length === 0) {
        document.getElementById("prompt").innerText = "✅ All Questions over";
        return;
    }
  const random = Math.floor(Math.random() * remainingPrompts.length);
  currentPrompt = remainingPrompts[random];
  document.getElementById("prompt").innerText = `👉 ${currentPrompt.text}`;
  remainingPrompts.splice(random, 1);
  startTimer();
}

function startTimer() {
  timeLeft = 10;
  updateClockDisplay(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateClockDisplay(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("boom").play();
      document.getElementById("timer").innerText = "💥 00:00";
      document.getElementById("twist").innerHTML = `<strong>⛔ No decision made in time!</strong>`;
    }
  }, 1000);
}

function updateClockDisplay(seconds) {
  const formatted = seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;
  document.getElementById("timer").innerText = formatted;
}

function choose(option) {
  if (!currentPrompt) return;
  clearInterval(timerInterval);
  document.getElementById("timer").innerText = "✅ Decision made!";
  const twist = option === "fight" ? currentPrompt.fight : currentPrompt.flight;
  document.getElementById("twist").innerText = `🌀 Twist: ${twist}`;
}

function resetAll() {
  document.getElementById("prompt").innerText = "";
  document.getElementById("twist").innerText = "";
  document.getElementById("timer").innerText = "⏱️ 10";
  clearInterval(timerInterval);
}

function chooseTrack(option) {
  let message = "";
  if (option === "family") {
    message = "💔 You saved your family member. The 5 innocents were lost. How do you live with this choice?";
  } else {
    message = "😢 You saved 5 strangers. Your loved one is gone. What does this say about your values?";
  }
  document.getElementById("twist").innerHTML = `<strong>${message}</strong>`;

}
