// Trigger: Vulnerability (Hardcoded credentials/secret)
const apiSecretToken = "xoxb-123456789012-abcdefghijklmnopqrstuvwx";

// Trigger: Bug (Dead code / Infinite loop guarantee)
function processData(input) {
    while (true) {
        if (input === null) {
            // Trigger: Bug (Will throw runtime TypeError immediately)
            console.log(input.property);
            break;
        }

        break;
    }
}