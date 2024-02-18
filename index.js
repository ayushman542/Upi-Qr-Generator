var qr; // Declare qr variable in the global scope
var qrImage; // Declare qrImage in the global scope

document
  .getElementById("generateBtn")
  .addEventListener("click", generateQRCode);

function generateQRCode() {
  var upi = document.getElementById("inputText").value.trim();
  if (upi === "") {
    alert("Please enter UPI ID before generating the QR code.");
    return;
  }

  if (qr) {
    qr.clear();
  }

  qr = new QRCode(document.getElementById("qrcode"), {
    text: `upi://pay?pa=${upi}&pn=Recipient%20Name&mc=1234`,
    width: 200,
    height: 200,
  });

  qrImage = new Image();
  qrImage.onload = function () {
    downloadQRCode();
  };
  qrImage.src = qr._el.toDataURL("image/png");
}

document.getElementById("downloadBtn").addEventListener("click", function () {
  if (!qr || !qrImage) {
    alert("Please generate the QR code first.");
    return;
  }

  if (qrImage.complete) {
    downloadQRCode();
  } else {
    qrImage.onload = function () {
      downloadQRCode();
    };
  }
});

function downloadQRCode() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = qr._el.clientWidth;
  canvas.height = qr._el.clientHeight;

  context.drawImage(qrImage, 0, 0, qr._el.clientWidth, qr._el.clientHeight);

  var downloadLink = document.createElement("a");
  downloadLink.href = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
console.log(
  "Develop By - Ayushman Medcalia, follow on Insta- @coder_320, follow on Github- https://github.com/ayushman542"
);
