var button = document.getElementById("convert");
var zollInput = document.getElementById("zoll");
var output = document.getElementById("output");
function convertZollToCm(zoll) {
    return zoll * 2.54;
}
button.addEventListener("click", function () {
    var zollValue = +zollInput.value;
    var centimeterValue = convertZollToCm(zollValue);
    output.value = centimeterValue.toString();
});
