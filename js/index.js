const baseApi = "https://api.genderize.io";
const genderDecode = {
    male: "Cowok",
    female: "Cewek",
};

async function predict(event) {
    if (event.key !== "Enter") return;
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block";
    const firstName = event.target.value;
    const queryUrl = `${baseApi}/?name=${firstName}&country_id=ID`;
    try {
        const response = await fetch(queryUrl);
        const result = await response.json();
        showResult(result.name, result.gender, result.probability);
        Swal.fire({
            title: `Hello ${result.name}!`,
            text: `Jenis kelamin kamu kemungkinan adalah ${genderDecode[result.gender]} sebesar ${result.probability * 100
                }%`,
            icon: "info",
            confirmButtonText: "Cool",
        });
    } catch (error) {
        console.error(error);
    } finally {
        loadingElement.style.display = "none";
    }
}

function showResult(name, gender, probability) {
    const predictionElement = document.getElementById("prediction");
    const probabilityPercentage = probability * 100;
    const predictionText = `Hello ${name}, jenis kelamin kamu kemungkinan adalah ${genderDecode[gender]
        } sebesar ${probabilityPercentage}%`;
    predictionElement.textContent = predictionText;
}