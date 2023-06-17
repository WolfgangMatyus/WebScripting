const button = document.getElementById("convert");
const zollInput = document.getElementById("zoll") as HTMLInputElement;
const output = document.getElementById("output") as HTMLInputElement;

function convertZollToCm(zoll: number): number {
    return zoll * 2.54;
}

button.addEventListener("click", function () {
    const zollValue = + zollInput.value;
    const centimeterValue = convertZollToCm(zollValue);
    output.value = centimeterValue.toString();
});