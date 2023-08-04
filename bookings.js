const allRate = [
  { name: "club", rates: [{ sTime: 10, eTime: 16, rate: 100 }, { sTime: 16, eTime: 22, rate: 500 }] },
  { name: "tennis", rates: [{ sTime: 0, eTime: 24, rate: 50 }] }
];

function createCollection() {
  if (localStorage.getItem("bSlots") == null) {
    localStorage.setItem("bSlots", "[]")
  }
}
createCollection();


function book() {
  let name = document.getElementById("name").value.replace(/\b\w/g, function (l) { return l.toUpperCase() });
  let door = document.getElementById("door").value;
  let date = document.getElementById("date").value;
  let facility = document.getElementById("facility").value;
  let sTime = document.getElementById("sTime").value;
  let eTime = document.getElementById("eTime").value;

  let bSlots = JSON.parse(localStorage.getItem("bSlots"));
  console.log(bSlots);

  const preBoo = bSlots.find(slot =>
    slot.facility === facility &&
    date === slot.booking_date && ((sTime >= slot.start && sTime < slot.end) || (eTime > slot.start && eTime <= slot.end))
  );
  if (preBoo) {
    displayOutput("Booking Failed, Already Booked");
    return;
  }
  const selectedFacility = allRate.find(f => f.name === facility);

  if (!selectedFacility) {
    displayOutput("Facility not found");
    return;
  }
  if (door<=0) {
    displayOutput("Enter correct Residents no ");
    return;
  }
  if (door === '' || date == "" || sTime == "" || eTime == "") {
    displayOutput("Enter All values");
    return;
  }

  const bSTime = new Date(`${date} ${sTime}`);
  const bETime = new Date(`${date} ${eTime}`);
  let totalCost = 0;
  // let ticket={}
  for (const rate of selectedFacility.rates) {
    if (bSTime.getHours() >= rate.sTime && bETime.getHours() <= rate.eTime) {
      const bookingHours = (bETime - bSTime) / (60 * 60 * 1000);
      totalCost += rate.rate * bookingHours;
    }  
    displayOutput(`Booked, Rs. ${totalCost}`);
  }
  ticket = {
    person_name: name,
    door_no: door,
    facility: facility,
    booking_date: date,
    start: sTime,
    end: eTime,
    price: totalCost
  }
  let booking = JSON.parse(localStorage.getItem("bSlots"));
  booking.push(ticket);
  
  localStorage.setItem("bSlots", JSON.stringify(booking));
}
function displayOutput(message) {
  const outputElement = document.getElementById("message");
  outputElement.textContent = message;
}