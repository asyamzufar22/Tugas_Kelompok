let pulsaBalance = 225;

showMainMenu();

document
  .getElementById("sendButton")
  .addEventListener("click", handleMenuSelection);

function handleMenuSelection() {
  const option = document.getElementById("ussd-option").value;

  switch (option) {
    case "1":
      showPulsaDarurat();
      break;
    case "2":
      showPromoInternetBulanan();
      break;
    case "3":
      showHotPromo();
      break;
    case "4":
      showPromoInternetTahunan();
      break;
    case "5":
      showPhoneNumberInput();
      break;
    case "6":
      showInfoPulsa();
      break;
    default:
      document.getElementById("message").textContent =
        "Opsi tidak valid atau belum tersedia.";
  }
}

function showPulsaDarurat() {
  const container = document.querySelector(".container");
  container.innerHTML = `
        <h2>Pilih Nominal Pulsa Darurat</h2>
        <ul>
            <li>1. Rp 10.000</li>
            <li>2. Rp 20.000</li>
            <li>3. Rp 50.000</li>
        </ul>
        <input type="text" id="darurat-option" placeholder="Pilih Nominal">
        <div class="buttons">
            <button id="cancelDaruratButton">Cancel</button>
            <button id="confirmDaruratButton">Beli</button>
        </div>
        <div id="message" class="message"></div>
    `;

  document
    .getElementById("cancelDaruratButton")
    .addEventListener("click", showMainMenu);
  document
    .getElementById("confirmDaruratButton")
    .addEventListener("click", processPulsaDarurat);
}

function processPulsaDarurat() {
  const daruratOption = document.getElementById("darurat-option").value;
  let nominal, harga;

  switch (daruratOption) {
    case "1":
      nominal = "Rp 10.000";
      harga = 10000;
      break;
    case "2":
      nominal = "Rp 20.000";
      harga = 20000;
      break;
    case "3":
      nominal = "Rp 50.000";
      harga = 50000;
      break;
    default:
      document.getElementById("message").textContent = "Nominal tidak valid.";
      return;
  }

  pulsaBalance += harga;
  showInfoPulsa();
}

function showPromoInternetBulanan() {
  const container = document.querySelector(".container");
  container.innerHTML = `
        <h2>Pilih Promo Internet Bulanan</h2>
        <ul>
            <li>1. 10GB - Rp 100.000</li>
            <li>2. 20GB - Rp 150.000</li>
            <li>3. 30GB - Rp 200.000</li>
            <li>4. 50GB - Rp 250.000</li>
            <li>5. 100GB - Rp 400.000</li>
        </ul>
        <input type="text" id="bulanan-option" placeholder="Pilih Promo">
        <div class="buttons">
            <button id="cancelButton">Cancel</button>
            <button id="confirmBulananButton">Beli</button>
        </div>
        <div id="message" class="message"></div>
    `;

  document
    .getElementById("cancelButton")
    .addEventListener("click", showMainMenu);
  document
    .getElementById("confirmBulananButton")
    .addEventListener("click", processPembelianBulanan);
}

function processPembelianBulanan() {
  const bulananOption = document.getElementById("bulanan-option").value;
  let paket, harga;

  switch (bulananOption) {
    case "1":
      paket = "10GB - Rp 100.000";
      harga = 100000;
      break;
    case "2":
      paket = "20GB - Rp 150.000";
      harga = 150000;
      break;
    case "3":
      paket = "30GB - Rp 200.000";
      harga = 200000;
      break;
    case "4":
      paket = "50GB - Rp 250.000";
      harga = 250000;
      break;
    case "5":
      paket = "100GB - Rp 400.000";
      harga = 400000;
      break;
    default:
      document.getElementById("message").textContent = "Promo tidak valid.";
      return;
  }

  if (pulsaBalance >= harga) {
    pulsaBalance -= harga;
    processPembelianBulananSuccess(paket);
  } else {
    document.getElementById("message").textContent = "Saldo tidak cukup.";
  }
}
 
function processPembelianTahunan() {
  const tahunanOption = document.getElementById("tahunan-option").value;
  let paket, harga;

  switch (tahunanOption) {
    case "1":
      paket = "Paket 50GB - Rp 150.000";
      harga = 150000;
      break;
    case "2":
      paket = "Paket 100GB - Rp 250.000";
      harga = 250000;
      break;
    case "3":
      paket = "Paket 200GB - Rp 400.000";
      harga = 400000;
      break;
    case "4":
      paket = "Paket 500GB - Rp 700.000";
      harga = 700000;
      break;
    default:
      document.getElementById("message").textContent = "Promo tidak valid.";
      return;
  }

  if (pulsaBalance >= harga) {
    pulsaBalance -= harga;
    processPembelianTahunanSuccess(paket);
  } else {
    document.getElementById("message").textContent = "Saldo tidak cukup.";
  }
}

function processPembelianTahunanSuccess(paket) {
  const container = document.querySelector(".container");
  container.innerHTML = `
        <h2>Proses Pembelian</h2>
        <p>Sedang memproses pembelian ${paket}...</p>
    `;

  setTimeout(function () {
    container.innerHTML = `
            <h2>Pembelian Berhasil</h2>
            <p>Paket ${paket} telah berhasil dibeli dan berlaku selama 365 hari.</p>
        `;
    showInfoPulsa();
  }, 2000);
}

function showPhoneNumberInput() {
  const container = document.querySelector(".container");
  container.innerHTML = `
        <h2>Transfer Pulsa</h2>
        <input type="text" id="phone-number" placeholder="Nomor Tujuan">
        <input type="text" id="transfer-amount" placeholder="Jumlah Pulsa (Rp)">
        <div class="buttons">
            <button id="cancelTransferButton">Cancel</button>
            <button id="confirmTransferButton">Transfer</button>
        </div>
        <div id="message" class="message"></div>
    `;

  document
    .getElementById("cancelTransferButton")
    .addEventListener("click", showMainMenu);
  document
    .getElementById("confirmTransferButton")
    .addEventListener("click", processTransferPulsa);
}

function processTransferPulsa() {
  const phoneNumber = document.getElementById("phone-number").value;
  const transferAmount = parseInt(
    document.getElementById("transfer-amount").value
  );

  if (isNaN(transferAmount) || transferAmount <= 0) {
    document.getElementById("message").textContent =
      "Jumlah pulsa tidak valid.";
    return;
  }

  if (pulsaBalance >= transferAmount) {
    pulsaBalance -= transferAmount;
    document.getElementById(
      "message"
    ).textContent = `Transfer Rp ${transferAmount} ke ${phoneNumber} berhasil.`;
    showInfoPulsa();
  } else {
    document.getElementById("message").textContent =
      "Saldo tidak cukup untuk transfer.";
  }
}

function showInfoPulsa() {
  const container = document.querySelector(".container");
  container.innerHTML = `
        <h2>Info Pulsa Anda</h2>
        <p>Jumlah Pulsa: Rp ${pulsaBalance}</p>
        <p>Berlaku hingga: 12-12-2024</p>
        <button id="backToMenuButton">Kembali ke Menu</button>
    `;

  document
    .getElementById("backToMenuButton")
    .addEventListener("click", showMainMenu);
}

function showMainMenu() {
  const container = document.querySelector(".container");
  container.innerHTML = `
        <p>Pulsa Rp ${pulsaBalance} s.d 12-12-2024, Mau Pulsa Darurat?</p>
        <ul>
            <li>1. Iya</li>
            <li>2. Promo Internet Bulanan</li>
            <li>3. Hot Promo</li>
            <li>4. Super Hemat</li>
            <li>5. Transfer Pulsa</li>
            <li>6. Info Pulsa</li>
        </ul>
        <input type="text" id="ussd-option" placeholder="Pilih Opsi">
        <div class="buttons">
            <button id="cancelButton">Cancel</button>
            <button id="sendButton">Send</button>
        </div>
        <div id="message" class="message"></div>
    `;

  document
    .getElementById("sendButton")
    .addEventListener("click", handleMenuSelection);
}