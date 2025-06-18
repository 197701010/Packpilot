// test-replicate.js
import Replicate from "replicate";
import "dotenv/config"; // Laadt de variabelen uit .env.local

async function runTest() {
    console.log("--- Starten van de geïsoleerde Replicate API test ---");

    const token = process.env.REPLICATE_API_TOKEN;
    if (!token || token.length < 10) {
        console.error("FOUT: REPLICATE_API_TOKEN niet gevonden of ongeldig in .env.local. Controleer het bestand.");
        return;
    }
    
    console.log("API Token succesvol geladen.");

    const replicate = new Replicate({ auth: token });

    const version = "39250ab99624916a90243285d8521013554ac85a697781b0800d3c5097241270";
    const input = {
        prompt: "A white cat sitting on a purple sofa",
        width: 1024,
        height: 1024,
    };

    try {
        console.log(`API aanroep naar Replicate met modelversie ${version.substring(0, 10)}...`);
        const prediction = await replicate.predictions.create({
            version: version,
            input: input,
        });

        if (prediction?.error) {
            console.error("\n--- TEST GEFAALD (Fout van API) ---");
            console.error("Replicate gaf een foutmelding terug:");
            console.error(prediction.error);
            console.error("--------------------------------------");
        } else {
            console.log("\n--- TEST GESLAAGD! ---");
            console.log("Taak succesvol gestart. Dit betekent dat je account en API-sleutel werken.");
            console.log("Prediction ID:", prediction.id);
            console.log("----------------------");
        }
    } catch (error) {
        console.error("\n--- TEST GEFAALD (Script Crash) ---");
        console.error("Het script is gecrasht tijdens de API aanroep. Details:");
        // We loggen alleen de boodschap om te voorkomen dat de sleutel opnieuw lekt
        console.error("Foutmelding:", error.message);
        console.error("-----------------------------------");
    }
}

runTest();